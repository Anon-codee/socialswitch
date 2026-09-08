"use client";

import {
  Users,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ArrowRight,
  UserRound,
  Settings,
} from "lucide-react";

const stats = [
  {
    title: "Total People",
    value: "900",
    description: "Imported from your account",
    icon: Users,
  },
  {
    title: "Selected",
    value: "327",
    description: "Marked for review",
    icon: ShieldCheck,
  },
  {
    title: "Processed",
    value: "184",
    description: "Completed actions",
    icon: CheckCircle2,
  },
  {
    title: "Remaining",
    value: "143",
    description: "Still in your queue",
    icon: Clock3,
  },
];

const recentPeople = [
  {
    username: "person_001",
    category: "Family",
    status: "Pending",
  },
  {
    username: "person_024",
    category: "College",
    status: "Pending",
  },
  {
    username: "person_087",
    category: "Acquaintance",
    status: "Completed",
  },
  {
    username: "person_142",
    category: "Family",
    status: "Pending",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10 lg:px-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <nav className="mb-14 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              SocialSwitch
            </h1>
            <p className="text-sm text-muted-foreground">
              Privacy, on your terms.
            </p>
          </div>

          <button className="rounded-full border p-2.5 transition hover:bg-muted">
            <Settings className="h-4 w-4" />
          </button>
        </nav>

        {/* Hero */}
        <section className="mb-12">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            YOUR DASHBOARD
          </p>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Take control of your
            <span className="block text-muted-foreground">
              digital social graph.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Organize your existing social connections, build privacy rules,
            and transition to your new public identity without losing control
            of who gets access.
          </p>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Progress */}
        <section className="mt-8 rounded-2xl border bg-card p-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium">Cleanup progress</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You're more than halfway there.
              </p>
            </div>

            <p className="text-2xl font-semibold">56%</p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground"
              style={{ width: "56%" }}
            />
          </div>

          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>184 processed</span>
            <span>327 selected</span>
          </div>
        </section>

        {/* Queue */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* People */}
          <div className="rounded-2xl border bg-card">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h3 className="font-medium">Action queue</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  People you've selected for review.
                </p>
              </div>

              <button className="text-sm font-medium underline underline-offset-4">
                View all
              </button>
            </div>

            <div className="divide-y">
              {recentPeople.map((person) => (
                <div
                  key={person.username}
                  className="flex items-center justify-between p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <UserRound className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        @{person.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {person.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      person.status === "Completed"
                        ? "bg-muted text-muted-foreground"
                        : "border"
                    }`}
                  >
                    {person.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Continue card */}
          <div className="flex flex-col justify-between rounded-2xl border bg-foreground p-6 text-background">
            <div>
              <p className="text-sm opacity-60">NEXT ACTION</p>

              <div className="mt-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                  <UserRound className="h-5 w-5" />
                </div>

                <p className="text-2xl font-semibold">
                  @person_247
                </p>

                <p className="mt-2 text-sm opacity-60">
                  Family · Pending
                </p>
              </div>
            </div>

            <button className="mt-10 flex items-center justify-between rounded-xl bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:opacity-90">
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}