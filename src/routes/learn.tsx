import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, PlayCircle } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { learnCourses } from "@/lib/data";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Nexus Design OS" },
      { name: "description", content: "Free, short courses on design systems — from 'what is a token?' to AI-assisted design workflows." },
      { property: "og:title", content: "Learn — Nexus Design OS" },
      { property: "og:description", content: "Free design-system courses, beginner to advanced." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LearnPage,
});

function levelStyle(level: string) {
  if (level === "Beginner") return "bg-emerald-500/15 text-emerald-700";
  if (level === "Intermediate") return "bg-amber-500/15 text-amber-700";
  return "bg-rose-500/15 text-rose-700";
}

function LearnPage() {
  return (
    <div>
      <PageIntro title="Learn design systems" hint="Free courses, made for busy Indian teams. Each lesson is under 10 minutes — finish a course over two chai breaks." />
      <div className="grid gap-4 sm:grid-cols-2">
        {learnCourses.map((c) => (
          <Card key={c.title}>
            <div className="flex items-center justify-between gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${levelStyle(c.level)}`}>{c.level}</span>
            </div>
            <h2 className="mt-3 text-base font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{c.lessons} lessons · {c.mins} min total</p>
              <button className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                <PlayCircle className="h-4 w-4" /> Start
              </button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-4" title="Live workshops">
        <p className="text-sm text-muted-foreground">
          We run a free online workshop on the first Saturday of every month, 11 AM IST, in English with Hindi Q&A.
          Next one: <span className="font-medium text-foreground">Design tokens for beginners</span>.
        </p>
      </Card>
    </div>
  );
}
