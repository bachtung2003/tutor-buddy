import { BookOpen, Layers, Palette, Circle } from "lucide-react"; // Import icons
export const data: Courses[] = [
  {
    id: "1",
    imageUrl: <Palette size={96} />, // Use the Palette icon as a JSX element
    title: "Color Styles - 02",
    description: "Let’s learn about colors, color contrast and color styles.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />, // Logo as a JSX element
  },
  {
    id: "2",
    imageUrl: <Layers size={96} />, // Use the Layers icon as a JSX element
    title: "Design Thinking",
    description: "A project to unlearn and learn the fundamentals of design.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "3",
    imageUrl: <BookOpen size={96} />, // Use the BookOpen icon as a JSX element
    title: "Visual Designs Briefs",
    description:
      "Making visually looking good UI screens from problem statement briefs.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "4",
    imageUrl: <Palette size={96} />, // Use the Palette icon as a JSX element
    title: "Curiosity for terminology",
    description: "Understanding various visual design terms.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "5",
    imageUrl: <Layers size={96} />, // Use the Layers icon as a JSX element
    title: "Color Styles - 01",
    description: "Let’s learn about colors, color contrast and color styles.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "6",
    imageUrl: <BookOpen size={96} />, // Use the BookOpen icon as a JSX element
    title: "Visual Designs Briefs",
    description:
      "Making visually looking good UI screens from problem statement briefs.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "7",
    imageUrl: <Palette size={96} />, // Use the Palette icon as a JSX element
    title: "Curiosity for terminology",
    description: "Understanding various visual design terms.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
  {
    id: "8",
    imageUrl: <Layers size={96} />, // Use the Layers icon as a JSX element
    title: "Color Styles - 01",
    description: "Let’s learn about colors, color contrast and color styles.",
    academy: "ACCESSTRADE Academy",
    logoUrl: <Circle />,
  },
];

export type Courses = {
  id: string;
  imageUrl: React.ReactNode; // Now expects a JSX element (ReactNode)
  title: string;
  description: string;
  academy: string;
  logoUrl: React.ReactNode; // Now expects a JSX element (ReactNode)
};
