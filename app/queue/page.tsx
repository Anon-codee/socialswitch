"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  MoreHorizontal,
  SkipForward,
  Users,
} from "lucide-react";

import { usePeopleStore } from "../../src/store/usePeopleStore";

export default function QueuePage() {
  const people = usePeopleStore((state) => state.people);

  const markCompleted = usePeopleStore(
    (state) => state.markCompleted
  );

  const skipQueuedPerson = usePeopleStore(
    (state) => state.skipQueuedPerson
  );

  const [activeId, setActiveId] = useState<number | null>(
    null
  );

  const queuedPeople = useMemo(() => {
    return people.filter(
      (person) => person.status === "Queued"
    );
  }, [people]);

  const completedCount = people.filter(
    (person) => person.status === "Completed"
  ).length;

  function processPerson(id: number) {
    setActiveId(id);
  }

  function completePerson(id: number) {
    markCompleted(id);
    setActiveId(null);
  }

  function skipPerson(id: number) {
    skipQueuedPerson(id);
    setActiveId(null);
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              SOCIALSWITCH
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Action queue
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Review people one at a time before taking
              any action. Nothing happens automatically.
            </p>
          </div>

          <div className="flex gap-3">

            {/* WAITING */}

            <div className="rounded-xl border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Waiting
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {queuedPeople.length}
              </p>
            </div>

            {/* COMPLETED */}

            <div className="rounded-xl border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Completed
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {completedCount}
              </p>
            </div>

          </div>

        </header>


        {/* SAFETY NOTICE */}

        <section className="mb-8 rounded-2xl border bg-card p-5">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>

              <p className="font-medium">
                You are always in control
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                SocialSwitch only organizes your workflow.
                It does not automatically perform
                irreversible account actions.
              </p>

            </div>

          </div>

        </section>


        {/* QUEUE */}

        {queuedPeople.length > 0 ? (

          <section className="space-y-3">

            {queuedPeople.map((person, index) => {

              const isActive =
                activeId === person.id;

              return (
                <article
                  key={person.id}
                  className={`rounded-2xl border bg-card transition ${
                    isActive
                      ? "ring-2 ring-foreground/10"
                      : ""
                  }`}
                >

                  {/* PERSON ROW */}

                  <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">

                    {/* NUMBER */}

                    <div className="hidden w-8 shrink-0 text-center text-sm text-muted-foreground md:block">
                      {index + 1}
                    </div>


                    {/* AVATAR */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted font-medium">
                      {person.name.charAt(0)}
                    </div>


                    {/* PERSON INFORMATION */}

                    <div className="min-w-0 flex-1">

                      <p className="font-medium">
                        @{person.username}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {person.name}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-full border px-3 py-1 text-xs">
                          {person.category}
                        </span>

                        <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                          Queued
                        </span>

                      </div>

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          skipPerson(person.id)
                        }
                        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
                      >
                        <SkipForward className="h-4 w-4" />

                        Skip
                      </button>


                      <button
                        onClick={() =>
                          processPerson(person.id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-90"
                      >
                        Process

                        <ArrowRight className="h-4 w-4" />
                      </button>

                    </div>

                  </div>


                  {/* REVIEW PANEL */}

                  {isActive && (

                    <div className="border-t px-5 py-5">

                      <div className="rounded-xl border bg-background p-5">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                          <div>

                            <p className="text-sm font-medium">
                              Review @{person.username}
                            </p>

                            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                              Open the person's profile on
                              the relevant platform, review
                              the account, and decide what
                              you want to do.
                            </p>

                          </div>


                          <div className="flex flex-wrap gap-2">

                            {/* OPEN PROFILE */}

                            <button
                              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
                              onClick={() => {
                                window.alert(
                                  "Real profile links will be connected when actual account data is imported."
                                );
                              }}
                            >
                              <ExternalLink className="h-4 w-4" />

                              Open profile
                            </button>


                            {/* COMPLETE */}

                            <button
                              onClick={() =>
                                completePerson(
                                  person.id
                                )
                              }
                              className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-90"
                            >
                              <Check className="h-4 w-4" />

                              Mark complete
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  )}

                </article>
              );
            })}

          </section>

        ) : (

          /* EMPTY STATE */

          <section className="rounded-2xl border bg-card px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Check className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Your queue is clear
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Nothing is waiting for review. Select
              people from the People page or apply a
              rule to populate the queue.
            </p>

            <a
              href="/people"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm text-background"
            >
              View people

              <Users className="h-4 w-4" />
            </a>

          </section>

        )}


        {/* FOOTER */}

        {queuedPeople.length > 0 && (

          <div className="mt-6 flex items-center justify-between border-t pt-5 text-sm text-muted-foreground">

            <span>
              {queuedPeople.length}{" "}
              {queuedPeople.length === 1
                ? "person"
                : "people"}{" "}
              waiting
            </span>

            <span className="flex items-center gap-2">

              <MoreHorizontal className="h-4 w-4" />

              Review at your own pace

            </span>

          </div>

        )}

      </div>
    </main>
  );
}