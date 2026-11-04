import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth-user";
import { prisma } from "@/lib/prisma";
import { buildBooleanSearchQuery } from "@/lib/jobs/boolean-search";
import { calculateJobMatch } from "@/lib/jobs/matcher";

export const dynamic = "force-dynamic";

/**
 * GET /api/jobs
 * Retrieves jobs ranked by match with student's profile,
 * pinning internal campus placement drives at the top.
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch student profile and readiness score
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
      include: {
        readinessScore: true,
        projects: { orderBy: { order: "asc" } },
        achievements: true,
      },
    });

    const studentSkills = Array.isArray(profile?.skills)
      ? (profile.skills as string[])
      : [];
    const targetRole = profile?.targetRole || "Software Engineer";
    let readinessScore = profile?.readinessScore?.overallScore || 0;

    // Dynamically calculate readiness if not yet evaluated or zero
    if ((!profile?.readinessScore || readinessScore === 0) && profile) {
      const latestInterview = await prisma.interview.findFirst({
        where: { userId: user.id, report: { isNot: null } },
        orderBy: { createdAt: "desc" },
        include: { report: { select: { overallScore: true } } },
      });
      const interviewScore = latestInterview?.report?.overallScore || 0;
      const resumeScore = profile.resumeText ? (profile.resumePageCount === 1 ? 75 : 55) : 0;
      const projectList = profile.projects || [];
      const withLiveUrl = projectList.filter((p) => p.liveUrl && p.liveUrl.startsWith("http"));
      const withRepoUrl = projectList.filter((p) => p.repoUrl && p.repoUrl.startsWith("http"));
      const projectsScore = projectList.length > 0
        ? Math.min(100, projectList.length * 25 + withLiveUrl.length * 25 + withRepoUrl.length * 15)
        : 0;
      const githubScore = profile.githubUsername ? 65 : 0;
      const leetcodeScore = profile.leetcodeUsername ? 70 : 0;
      const linkedinScore = profile.linkedinUrl ? 75 : 0;
      const achievementsScore = Math.min(100, (profile.achievements?.length || 0) * 35);

      const computed = Math.round(
        resumeScore * 0.25 +
        projectsScore * 0.25 +
        interviewScore * 0.20 +
        githubScore * 0.10 +
        leetcodeScore * 0.10 +
        linkedinScore * 0.05 +
        achievementsScore * 0.05
      );

      if (computed > 0) {
        readinessScore = computed;
        const tier = readinessScore >= 75 ? "Placement ready" : readinessScore >= 50 ? "Almost ready" : "Not ready";
        prisma.readinessScore.upsert({
          where: { profileId: profile.id },
          update: { overallScore: readinessScore, tier, resumeScore, projectsScore, interviewScore, githubScore, leetcodeScore, linkedinScore, achievementsScore },
          create: { profileId: profile.id, overallScore: readinessScore, tier, resumeScore, projectsScore, interviewScore, githubScore, leetcodeScore, linkedinScore, achievementsScore },
        }).catch(() => {});
      }
    }

    // 2. Generate Boolean search queries and external platform links
    const booleanOutput = buildBooleanSearchQuery(studentSkills, targetRole);

    // 3. Fetch active job postings from database
    const rawJobs = await prisma.jobPosting.findMany({
      orderBy: [
        { isMSOTInternal: "desc" },
        { createdAt: "desc" },
      ],
    });

    // 4. Fetch student's existing applications
    const userApplications = await prisma.jobApplication.findMany({
      where: { userId: user.id },
    });
    const appMap = new Map(userApplications.map((a) => [a.jobId, a]));

    // 5. Score and rank jobs
    const rankedJobs = rawJobs.map((job) => {
      const required = Array.isArray(job.requiredSkills)
        ? (job.requiredSkills as string[])
        : [];
      const match = calculateJobMatch(
        studentSkills,
        required,
        readinessScore,
        job.minReadinessScore,
        job.isMSOTInternal
      );
      const userApp = appMap.get(job.id);

      return {
        id: job.id,
        title: job.title,
        company: job.company,
        description: job.description,
        location: job.location,
        isRemote: job.isRemote,
        jobType: job.jobType,
        applyUrl: job.applyUrl,
        requiredSkills: required,
        minReadinessScore: job.minReadinessScore,
        isMSOTInternal: job.isMSOTInternal,
        stipendOrSalary: job.stipendOrSalary,
        createdAt: job.createdAt,
        // Match metrics
        fitPercentage: match.fitPercentage,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
        isEligible: match.isEligible,
        matchReason: match.matchReason,
        // Current application status
        applicationStatus: userApp?.status || "None",
        appliedAt: userApp?.appliedAt || null,
        reminderDate: userApp?.reminderDate || null,
        notes: userApp?.notes || null,
      };
    });

    // Sort: Exclusive campus drives first, then by fit percentage descending
    rankedJobs.sort((a, b) => {
      if (a.isMSOTInternal && !b.isMSOTInternal) return -1;
      if (!a.isMSOTInternal && b.isMSOTInternal) return 1;
      return b.fitPercentage - a.fitPercentage;
    });

    return NextResponse.json(
      {
        booleanQuery: booleanOutput.query,
        platformUrls: booleanOutput.externalPlatformUrls,
        studentTargetRole: targetRole,
        candidateReadinessScore: readinessScore,
        totalJobs: rankedJobs.length,
        jobs: rankedJobs,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=15, stale-while-revalidate=60",
        },
      }
    );
  } catch (error: any) {
    console.error("Error in GET /api/jobs:", error);
    return NextResponse.json(
      { error: "Failed to load matched jobs." },
      { status: 500 }
    );
  }
}
