export const data: Assignment[] = [
  {
    course: "User Research and Personas",
    finishedDate: "Jul 25, 2024",
    grade: "100/100",
  },
  {
    course: "Competitive Analysis in Design",
    finishedDate: "Jul 25, 2024",
    grade: "70/100",
  },
  {
    course: "Wireframing and Prototyping",
    finishedDate: "Jul 25, 2024",
    grade: "0/100",
  },
];

export type Assignment = {
  course: string;
  finishedDate: string;
  grade: string;
};
