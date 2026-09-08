import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-3xl text-center">
        <p className="mb-5 text-sm font-medium text-muted-foreground">
          SOCIALSWITCH
        </p>

        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Your social graph.
          <br />
          Your rules.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          A privacy-first assistant for organizing your digital social
          connections and transitioning to a public-facing identity.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Open dashboard
          </Link>

          <button className="rounded-full border px-6 py-3 text-sm font-medium transition hover:bg-muted">
            Learn more
          </button>
        </div>
      </div>
    </main>
  );
}