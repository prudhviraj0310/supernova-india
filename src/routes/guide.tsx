import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageIntro } from "@/components/AppShell";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guide — Nexus" },
      { name: "description", content: "New here? A plain-language guide to what Nexus does and how to start." },
      { property: "og:title", content: "Guide — Nexus" },
      { property: "og:description", content: "Learn Nexus in five minutes." },
    ],
  }),
  component: Guide,
});

const faqs = [
  ["What is a design system?", "It's your product's rulebook — which colours, fonts, spacing and buttons to use — so every screen feels like the same brand."],
  ["Who is Nexus for?", "Founders, designers and developers in Indian startups and agencies who want one source of truth instead of scattered files."],
  ["Do I need to code?", "No. Designers manage styles here; developers just click “Get code”."],
  ["Does it work for mobile apps?", "Yes — web, iPhone (Swift) and Android (Kotlin) code is created from the same styles."],
];

const steps = [
  { to: "/figma", t: "Connect Figma", d: "Bring your designer's styles in." },
  { to: "/styles", t: "Check your styles", d: "See every colour and size in plain words." },
  { to: "/export", t: "Get code", d: "Hand developers ready-to-use files." },
  { to: "/ai", t: "Turn on the AI helper", d: "AI tools follow your brand." },
] as const;

function Guide() {
  return (
    <>
      <PageIntro title="Guide" hint="Everything explained simply. Start with the 4 steps below." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="Get started" className="lg:col-span-5">
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.to}><Link to={s.to} className="tile flex items-center gap-3 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{i + 1}</span>
                <div><p className="text-sm font-medium">{s.t}</p><p className="text-xs text-muted-foreground">{s.d}</p></div>
              </Link></li>
            ))}
          </ol>
        </Card>
        <Card title="Common questions" className="lg:col-span-7">
          <div className="space-y-2">
            {faqs.map(([q, a]) => (
              <details key={q} className="tile p-4"><summary className="cursor-pointer text-sm font-medium">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
