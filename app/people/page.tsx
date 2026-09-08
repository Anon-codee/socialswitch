"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";

type Category =
  | "Family"
  | "Friends"
  | "College"
  | "Acquaintance"
  | "Unknown";

type Person = {
  id: number;
  username: string;
  name: string;
  category: Category;
  selected: boolean;
};

const categories: Category[] = [
  "Family",
  "Friends",
  "College",
  "Acquaintance",
  "Unknown",
];

const firstNames = [
  "Aarav",
  "Riya",
  "Arjun",
  "Ananya",
  "Rahul",
  "Karan",
  "Meera",
  "Aditya",
  "Ishita",
  "Dev",
  "Aisha",
  "Kabir",
];

const categoryPattern: Category[] = [
  "Family",
  "Friends",
  "College",
  "College",
  "Acquaintance",
  "Unknown",
];

function generatePeople(): Person[] {
  return Array.from({ length: 900 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];

    return {
      id: index + 1,
      username: `${firstName.toLowerCase()}_${index + 1}`,
      name: `${firstName} ${String.fromCharCode(65 + (index % 26))}.`,
      category: categoryPattern[index % categoryPattern.length],
      selected: false,
    };
  });
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>(generatePeople());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const matchesSearch =
        person.username.toLowerCase().includes(search.toLowerCase()) ||
        person.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || person.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [people, search, category]);

  const selectedCount = people.filter((person) => person.selected).length;

  function togglePerson(id: number) {
    setPeople((current) =>
      current.map((person) =>
        person.id === id
          ? { ...person, selected: !person.selected }
          : person
      )
    );
  }

  function selectAllVisible() {
    const visibleIds = new Set(filteredPeople.map((person) => person.id));

    setPeople((current) =>
      current.map((person) =>
        visibleIds.has(person.id)
          ? { ...person, selected: true }
          : person
      )
    );
  }

  function clearSelection() {
    setPeople((current) =>
      current.map((person) => ({
        ...person,
        selected: false,
      }))
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              SOCIALSWITCH
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              People
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Organize your social graph before making privacy changes.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Users className="h-4 w-4" />
            {people.length} people
          </div>
        </header>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Total people
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {people.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Selected
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {selectedCount}
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Showing
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {filteredPeople.length}
            </p>
          </div>

        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
              className="w-full rounded-xl border bg-background py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-foreground/10"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Category | "All")
              }
              className="appearance-none rounded-xl border bg-background py-3 pl-4 pr-10 text-sm outline-none"
            >
              <option value="All">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>

        </div>

        {/* Selection actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-sm text-muted-foreground">
            {selectedCount > 0
              ? `${selectedCount} people selected`
              : "No people selected"}
          </p>

          <div className="flex gap-2">

            <button
              onClick={selectAllVisible}
              className="rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Select visible
            </button>

            <button
              onClick={clearSelection}
              className="rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
            >
              Clear
            </button>

            <button
              disabled={selectedCount === 0}
              className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Add to queue
            </button>

          </div>

        </div>

        {/* People table */}
        <div className="overflow-hidden rounded-2xl border bg-card">

          <div className="grid grid-cols-[40px_1fr_160px_100px] border-b px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <div />
            <div>Person</div>
            <div>Category</div>
            <div>Status</div>
          </div>

          <div className="divide-y">

            {filteredPeople.slice(0, 50).map((person) => (

              <button
                key={person.id}
                onClick={() => togglePerson(person.id)}
                className="grid w-full grid-cols-[40px_1fr_160px_100px] items-center px-5 py-4 text-left transition hover:bg-muted/50"
              >

                {/* Checkbox */}
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    person.selected
                      ? "bg-foreground text-background"
                      : ""
                  }`}
                >
                  {person.selected && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Person */}
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {person.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      @{person.username}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {person.name}
                    </p>
                  </div>

                </div>

                {/* Category */}
                <div>
                  <span className="rounded-full border px-3 py-1 text-xs">
                    {person.category}
                  </span>
                </div>

                {/* Status */}
                <div className="text-xs text-muted-foreground">
                  {person.selected ? "Selected" : "Idle"}
                </div>

              </button>

            ))}

          </div>

          {filteredPeople.length > 50 && (
            <div className="border-t px-5 py-4 text-center text-xs text-muted-foreground">
              Showing the first 50 results of {filteredPeople.length}.
            </div>
          )}

          {filteredPeople.length === 0 && (
            <div className="px-5 py-16 text-center">
              <p className="font-medium">
                No people found.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or category.
              </p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}