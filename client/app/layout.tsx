import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeProvider";
import { CourseContextProvider } from "@/contexts/courses-data";
import { StudentContextProvider } from "@/contexts/students-data";
import { LessonContextProvider } from "@/contexts/lessons-data";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { AssignmentContextProvider } from "@/contexts/assignment-data";
import { StudentCourseContextProvider } from "@/contexts/student-courses-data";
import { ScoresContextProvider } from "@/contexts/scores-data";
import { ClassContextProvider } from "@/contexts/classes-data";

const font = Inter({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "TutorBuddy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CourseContextProvider>
            <StudentContextProvider>
              <LessonContextProvider>
                <ClassContextProvider>
                  <AssignmentContextProvider>
                    <StudentCourseContextProvider>
                      <ScoresContextProvider>
                        <NextSSRPlugin
                          /**
                           * The `extractRouterConfig` will extract **only** the route configs
                           * from the router to prevent additional information from being
                           * leaked to the client. The data passed to the client is the same
                           * as if you were to fetch `/api/uploadthing` directly.
                           */
                          routerConfig={extractRouterConfig(ourFileRouter)}
                        />
                        {children}
                      </ScoresContextProvider>
                    </StudentCourseContextProvider>
                  </AssignmentContextProvider>
                </ClassContextProvider>
              </LessonContextProvider>
            </StudentContextProvider>
          </CourseContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
