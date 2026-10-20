import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, PlayCircle } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { learnCourses } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReadingDialog } from "@/components/ReadingDialog";
import { lessonBodies } from "@/lib/reading";

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
  if (level === "Beginner") return "bg-success-soft text-success";
  if (level === "Intermediate") return "bg-warning-soft text-warning";
  return "bg-accent text-accent-foreground";
}

function LearnPage() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      <PageIntro title="Learn design systems" hint="Short written lessons for Indian teams, from shared styles to AI-assisted workflows." />
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
              <p className="text-xs text-muted-foreground">Introductory lesson · 3 min read</p>
              <Button size="sm" onClick={() => setSelected(c.title)}><PlayCircle /> Start</Button>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-4" title="Live workshops">
        <p className="text-sm text-muted-foreground">
          No live workshops are scheduled yet. Start with the written lessons above.
        </p>
      </Card>
      <ReadingDialog title={selected} paragraphs={selected ? lessonBodies[selected] ?? [] : []} onClose={() => setSelected(null)} />
    </div>
  );
}
