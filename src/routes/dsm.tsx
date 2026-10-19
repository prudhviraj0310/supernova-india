import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Palette, Boxes, Figma, Code2, Bot, HeartPulse } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";

export const Route = createFileRoute("/dsm")({
  head: () => ({
    meta: [
      { title: "Design system management — Nexus Design OS" },
      { name: "description", content: "One home for your brand's colours, components and code — kept in sync between designers, developers and AI tools." },
      { property: "og:title", content: "Design system management — Nexus Design OS" },
      { property: "og:description", content: "One home for your brand, in sync across design, code and AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DsmPage,
});

const pillars = [
  { icon: Palette, title: "One source of truth", desc: "Colours, fonts, spacing and components live in one place. Everyone — design, dev, marketing — sees the same thing.", to: "/styles", cta: "See the styles" },
  { icon: Figma, title: "Design stays in sync", desc: "Changes in Figma flow in as a reviewable list. You approve, Nexus applies. Nothing breaks silently.", to: "/figma", cta: "How sync works" },
  { icon: Code2, title: "Code comes out ready", desc: "Export to Tailwind, CSS, TypeScript, Swift or Kotlin. Developers paste and move on.", to: "/export", cta: "Try an export" },
  { icon: Bot, title: "AI follows the rules", desc: "Cursor, Claude and Copilot read your system, so AI-generated screens match your brand.", to: "/for-ai", cta: "Nexus for AI" },
  { icon: Boxes, title: "Components everyone reuses", desc: "Buttons, inputs, cards — built once, used everywhere, documented in plain language.", to: "/components", cta: "Browse blocks" },
  { icon: HeartPulse, title: "Health you can check", desc: "A simple status page shows what's working and what needs attention — no digging through logs.", to: "/health", cta: "View system health" },
];

function DsmPage() {
  return (
    <div>
      <PageIntro title="Design system management, minus the headache" hint="A design system is just your brand's decisions, written down once and reused forever. Nexus keeps those decisions organised, synced and useful." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <Card key={p.title}>
            <p.icon className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <Link to={p.to} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {p.cta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
