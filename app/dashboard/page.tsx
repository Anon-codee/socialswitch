"use client";

import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ArrowRight,
  UserRound,
  Settings,
} from "lucide-react";

import { usePeopleStore } from "../../src/store/usePeopleStore";

export default function Dashboard() {
  const people = usePeopleStore((state) => state.people);

  // Live statistics
  const totalPeople = people.length;

  const selectedPeople = people.filter(
    (person) => person.status === "Selected"
  );

  const queuedPeople = people.filter(
    (person) => person.status === "Queued"
  );

  const completedPeople = people.filter(
    (person) => person.status === "Completed"
  );

  // Cleanup progress
  const progress =
    totalPeople === 0
      ? 0
      : Math.round((completedPeople.length / totalPeople) * 100);

  // Show queued people first.
  // If the queue is empty, show recently completed people.
  const recentPeople =
    queuedPeople.length > 0
      ? queuedPeople.slice(0, 4)
      : completedPeople.slice(-4).reverse();

  // First person waiting in queue
  const nextPerson = queuedPeople[0];

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <nav className="mb-14 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              SocialSwitch
            </h1>

            <p className="text-sm text-muted-foreground">
              Privacy, on your terms.
            </p>
          </div>

          <Link
            href="/settings"
            className="rounded-full border p-2.5 transition hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
          </Link>
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
            Organize your existing social connections, build
            privacy rules, and transition to your new public
            identity without losing control of who gets access.
          </p>
        </section>


        {/* Stats */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total People
              </p>

              <Users className="h-4 w-4 text-muted-foreground" />
            </div>

            <p className="text-3xl font-semibold tracking-tight">
              {totalPeople}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Imported from your account
            </p>
          </div>


          {/* Selected */}

          <div className="rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Selected
              </p>

              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </div>

            <p className="text-3xl font-semibold tracking-tight">
              {selectedPeople.length}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Marked for review
            </p>
          </div>


          {/* Processed */}

          <div className="rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Processed
              </p>

              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </div>

            <p className="text-3xl font-semibold tracking-tight">
              {completedPeople.length}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Completed actions
            </p>
          </div>


          {/* Queue */}

          <div className="rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Remaining
              </p>

              <Clock3 className="h-4 w-4 text-muted-foreground" />
            </div>

            <p className="text-3xl font-semibold tracking-tight">
              {queuedPeople.length}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Still in your queue
            </p>
          </div>

        </section>


        {/* Progress */}

        <section className="mt-8 rounded-2xl border bg-card p-6">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <p className="text-sm font-medium">
                Cleanup progress
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {completedPeople.length === 0
                  ? "Nothing has been processed yet."
                  : `${completedPeople.length} people processed so far.`}
              </p>
            </div>

            <p className="text-2xl font-semibold">
              {progress}%
            </p>

          </div>


          {/* Progress bar */}

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>


          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>
              {completedPeople.length} processed
            </span>

            <span>
              {totalPeople} total
            </span>
          </div>

        </section>


        {/* Queue */}

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">


          {/* People */}

          <div className="rounded-2xl border bg-card">

            <div className="flex items-center justify-between border-b p-6">

              <div>
                <h3 className="font-medium">
                  Action queue
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  People you've selected for review.
                </p>
              </div>

              <Link
                href="/queue"
                className="text-sm font-medium underline underline-offset-4"
              >
                View all
              </Link>

            </div>


            {/* Queue people */}

            {recentPeople.length > 0 ? (

              <div className="divide-y">

                {recentPeople.map((person) => (

                  <div
                    key={person.id}
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

            ) : (

              <div className="px-6 py-14 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-medium">
                  Queue is empty
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Select people from the People page to
                  start building your queue.
                </p>

                <Link
                  href="/people"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                >
                  View people
                  <ArrowRight className="h-4 w-4" />
                </Link>

              </div>

            )}

          </div>


          {/* Continue card */}

          <div className="flex flex-col justify-between rounded-2xl border bg-foreground p-6 text-background">

            <div>

              <p className="text-sm opacity-60">
                NEXT ACTION
              </p>


              {nextPerson ? (

                <div className="mt-10">

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <p className="text-2xl font-semibold">
                    @{nextPerson.username}
                  </p>

                  <p className="mt-2 text-sm opacity-60">
                    {nextPerson.category} · Queued
                  </p>

                </div>

              ) : (

                <div className="mt-10">

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/10">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <p className="text-2xl font-semibold">
                    You're all caught up.
                  </p>

                  <p className="mt-2 text-sm opacity-60">
                    No people are currently waiting in your
                    action queue.
                  </p>

                </div>

              )}

            </div>


            {/* Continue button */}

            {nextPerson ? (

              <Link
                href="/queue"
                className="mt-10 flex items-center justify-between rounded-xl bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
              >
                Continue

                <ArrowRight className="h-4 w-4" />
              </Link>

            ) : (

              <Link
                href="/people"
                className="mt-10 flex items-center justify-between rounded-xl bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
              >
                Find people

                <ArrowRight className="h-4 w-4" />
              </Link>

            )}

          </div>

        </section>

      </div>
    </main>
  );
}