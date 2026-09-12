"use client";

import { create } from "zustand";
import { generatePeople } from "../data/person";
import type { Person, Category } from "../data/person";

type PeopleStore = {
  people: Person[];

  togglePerson: (id: number) => void;

  selectPeopleByCategory: (category: Category) => void;

  clearSelection: () => void;

  addSelectedToQueue: () => void;

  markCompleted: (id: number) => void;

  skipQueuedPerson: (id: number) => void;

  getSelectedCount: () => number;

  getQueuedCount: () => number;

  getCompletedCount: () => number;
};

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  people: generatePeople(),

  togglePerson: (id) => {
    set((state) => ({
      people: state.people.map((person) =>
        person.id === id
          ? {
              ...person,
              status:
                person.status === "Selected"
                  ? "Idle"
                  : "Selected",
            }
          : person
      ),
    }));
  },

  selectPeopleByCategory: (category) => {
    set((state) => ({
      people: state.people.map((person) =>
        person.category === category &&
        person.status === "Idle"
          ? {
              ...person,
              status: "Selected",
            }
          : person
      ),
    }));
  },

  clearSelection: () => {
    set((state) => ({
      people: state.people.map((person) =>
        person.status === "Selected"
          ? {
              ...person,
              status: "Idle",
            }
          : person
      ),
    }));
  },

  addSelectedToQueue: () => {
    set((state) => ({
      people: state.people.map((person) =>
        person.status === "Selected"
          ? {
              ...person,
              status: "Queued",
            }
          : person
      ),
    }));
  },

  markCompleted: (id) => {
    set((state) => ({
      people: state.people.map((person) =>
        person.id === id
          ? {
              ...person,
              status: "Completed",
            }
          : person
      ),
    }));
  },

  skipQueuedPerson: (id) => {
    set((state) => ({
      people: state.people.map((person) =>
        person.id === id
          ? {
              ...person,
              status: "Idle",
            }
          : person
      ),
    }));
  },

  getSelectedCount: () =>
    get().people.filter(
      (person) => person.status === "Selected"
    ).length,

  getQueuedCount: () =>
    get().people.filter(
      (person) => person.status === "Queued"
    ).length,

  getCompletedCount: () =>
    get().people.filter(
      (person) => person.status === "Completed"
    ).length,
}));