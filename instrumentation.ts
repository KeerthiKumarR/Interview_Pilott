/**
 * Next.js Server Lifecycle Instrumentation
 * Keep-alive self-pinger disabled to allow idle sleep on Render free tier (preserves monthly free instance hours).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Self-pinger disabled so Render can sleep when idle and not exhaust the 750 free instance hours.
  }
}
