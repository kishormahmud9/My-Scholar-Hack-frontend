import Link from "next/link";

export default function PaymentCompletePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] px-4 py-16">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center justify-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur sm:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <svg
                className="h-10 w-10 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Payment Complete
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-200/90 sm:text-lg">
              Your subscription is active. You can now access your dashboard and
              start working on your goals right away.
            </p>
            <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard/student"
                className="inline-flex items-center justify-center rounded-full bg-[#FFCA42] px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-lg transition hover:scale-[1.02] hover:bg-[#ffd96b]"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:text-white"
              >
                View Plans
              </Link>
            </div>
          </div>


        </div>
      </div>
    </main>
  );
}
