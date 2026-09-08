"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  ShieldCheck,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

type Category =
  | "Family"
  | "Friends"
  | "College"
  | "Acquaintance"
  | "Unknown";

type Action = "Select for action" | "Review" | "Keep";

type Rule = {
  id: number;
  category: Category;
  action: Action;
};

const initialRules: Rule[] = [
  {
    id: 1,
    category: "Family",
    action: "Select for action",
  },
  {
    id: 2,
    category: "Friends",
    action: "Keep",
  },
  {
    id: 3,
    category: "College",
    action: "Review",
  },
];

const categories: Category[] = [
  "Family",
  "Friends",
  "College",
  "Acquaintance",
  "Unknown",
];

const actions: Action[] = [
  "Select for action",
  "Review",
  "Keep",
];

// Fake counts for now.
// Later these will come directly from our database.
const categoryCounts: Record<Category, number> = {
  Family: 73,
  Friends: 128,
  College: 214,
  Acquaintance: 305,
  Unknown: 180,
};

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>(initialRules);

  const [newCategory, setNewCategory] =
    useState<Category>("Family");

  const [newAction, setNewAction] =
    useState<Action>("Select for action");

  const [message, setMessage] = useState("");

  const availableCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        !rules.some((rule) => rule.category === category)
    );
  }, [rules]);

  function addRule() {
    if (availableCategories.length === 0) {
      setMessage("All categories already have rules.");
      return;
    }

    const rule: Rule = {
      id: Date.now(),
      category: newCategory,
      action: newAction,
    };

    setRules((current) => [...current, rule]);

    setMessage(
      `${newCategory} rule added successfully.`
    );
  }

  function deleteRule(id: number) {
    setRules((current) =>
      current.filter((rule) => rule.id !== id)
    );

    setMessage("Rule removed.");
  }

  function updateRule(
    id: number,
    field: "category" | "action",
    value: string
  ) {
    setRules((current) =>
      current.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              [field]: value,
            }
          : rule
      )
    );
  }

  function applyRules() {
    setMessage(
      "Rules applied. Matching people have been added to your workflow."
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-12">

          <p className="text-sm font-medium text-muted-foreground">
            SOCIALSWITCH
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Privacy rules
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Tell SocialSwitch how you want different groups of
            people handled. You can review everything before any
            action is taken.
          </p>

        </header>

        {/* Explanation */}
        <section className="mb-8 rounded-2xl border bg-card p-6">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>

              <h2 className="font-medium">
                How rules work
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Rules organize people into your preferred workflow.
                SocialSwitch never performs an irreversible action
                automatically. You stay in control of the final step.
              </p>

            </div>

          </div>

        </section>

        {/* Existing rules */}
        <section className="rounded-2xl border bg-card">

          <div className="flex items-center justify-between border-b p-6">

            <div>
              <h2 className="font-medium">
                Your rules
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {rules.length} active rule
                {rules.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {Object.values(categoryCounts).reduce(
                (a, b) => a + b,
                0
              )}{" "}
              people
            </div>

          </div>

          <div className="divide-y">

            {rules.map((rule) => (

              <div
                key={rule.id}
                className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {rule.category.charAt(0)}
                  </div>

                  <div>

                    <p className="font-medium">
                      {rule.category}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {categoryCounts[rule.category]} people
                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <ArrowRight className="hidden h-4 w-4 text-muted-foreground md:block" />

                  <select
                    value={rule.action}
                    onChange={(e) =>
                      updateRule(
                        rule.id,
                        "action",
                        e.target.value
                      )
                    }
                    className="rounded-lg border bg-background px-3 py-2 text-sm"
                  >

                    {actions.map((action) => (
                      <option
                        key={action}
                        value={action}
                      >
                        {action}
                      </option>
                    ))}

                  </select>

                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="rounded-lg border p-2 transition hover:bg-muted"
                    title="Delete rule"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

              </div>

            ))}

            {rules.length === 0 && (
              <div className="px-6 py-14 text-center">

                <p className="font-medium">
                  No rules yet.
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Create your first rule below.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* Add rule */}
        <section className="mt-8 rounded-2xl border bg-card p-6">

          <div className="mb-5">

            <h2 className="font-medium">
              Create a rule
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Define what should happen to a category.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">

            <select
              value={newCategory}
              onChange={(e) =>
                setNewCategory(
                  e.target.value as Category
                )
              }
              className="rounded-xl border bg-background px-4 py-3 text-sm"
            >

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  disabled={rules.some(
                    (rule) =>
                      rule.category === category
                  )}
                >
                  {category}
                </option>
              ))}

            </select>

            <select
              value={newAction}
              onChange={(e) =>
                setNewAction(
                  e.target.value as Action
                )
              }
              className="rounded-xl border bg-background px-4 py-3 text-sm"
            >

              {actions.map((action) => (
                <option
                  key={action}
                  value={action}
                >
                  {action}
                </option>
              ))}

            </select>

            <button
              onClick={addRule}
              className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add rule
            </button>

          </div>

        </section>

        {/* Apply */}
        <section className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-foreground p-6 text-background md:flex-row md:items-center">

          <div>

            <p className="font-medium">
              Ready to apply your rules?
            </p>

            <p className="mt-1 text-sm opacity-60">
              Matching people will be added to your workflow
              for review.
            </p>

          </div>

          <button
            onClick={applyRules}
            className="flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
          >
            Apply rules
            <Check className="h-4 w-4" />
          </button>

        </section>

        {/* Feedback */}
        {message && (
          <div className="mt-4 rounded-xl border px-4 py-3 text-sm text-muted-foreground">
            {message}
          </div>
        )}

      </div>
    </main>
  );
}