export type Category =
  | "Family"
  | "Friends"
  | "College"
  | "Acquaintance"
  | "Unknown";

export type PersonStatus =
  | "Idle"
  | "Selected"
  | "Queued"
  | "Completed";

export type Person = {
  id: number;
  username: string;
  name: string;
  category: Category;
  status: PersonStatus;
};

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

export function generatePeople(): Person[] {
  return Array.from({ length: 900 }, (_, index) => {
    const firstName = firstNames[index % firstNames.length];

    return {
      id: index + 1,
      username: `${firstName.toLowerCase()}_${index + 1}`,
      name: `${firstName} ${String.fromCharCode(
        65 + (index % 26)
      )}.`,
      category: categoryPattern[index % categoryPattern.length],
      status: "Idle",
    };
  });
}