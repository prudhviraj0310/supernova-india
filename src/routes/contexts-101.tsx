import { createFileRoute } from "@tanstack/react-router";
import { Card, PageIntro } from "@/components/AppShell";
import { contextExplainers } from "@/lib/data";

export const Route = createFileRoute("/contexts-101")({
  head: () => ({
    meta: [
      { title: "Contexts 101 — Nexus Design OS" },
      { name: "description", content: "Design tokens, themes and contexts explained with a simple thali analogy — no jargon, five minutes." },
      { property: "og:title", content: "Contexts 101 — Nexus Design OS" },
      { property: "og:description", content: "Tokens and themes explained in plain language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContextsPage,
});

function ContextsPage() {
  return (
    <div>
      <PageIntro title="Contexts 101" hint="The four ideas behind every design system, explained with a thali. Read this once and the whole app makes sense." />
      <div className="grid gap-4 sm:grid-cols-2">
        {contextExplainers.map((c, i) => (
          <Card key={c.term}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <h2 className="text-base font-semibold">{c.term}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.plain}</p>
            <code className="mt-3 block break-words rounded-lg bg-secondary px-3 py-2 text-xs text-secondary-foreground">{c.example}</code>
          </Card>
        ))}
      </div>
      <Card className="gradient-card mt-4 border-0 text-primary-foreground">
        <h2 className="text-lg font-semibold">Why it matters</h2>
        <p className="mt-1 max-w-2xl text-sm opacity-90">
          Because of this chain — ingredient → dish → thali → menu — you can re-skin your entire app for Diwali, dark mode, or a partner brand
          by changing <em>one</em> value. That's the whole point of Nexus.
        </p>
      </Card>
    </div>
  );
}
