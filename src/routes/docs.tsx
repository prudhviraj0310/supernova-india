import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Clock } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { docSections } from "@/lib/data";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Nexus Design OS" },
      { name: "description", content: "Step-by-step guides for Nexus: setup, styles, Figma sync, code export and API — written in plain language for Indian teams." },
      { property: "og:title", content: "Documentation — Nexus Design OS" },
      { property: "og:description", content: "Plain-language guides: setup, Figma sync, code export, API." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const sections = docSections
    .map((s) => ({
      ...s,
      items: s.items.filter((i) => !query || i.title.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query)),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div>
      <PageIntro title="Documentation" hint="Every guide is written in plain language. No jargon — if you can use UPI, you can follow these." />
      <Card className="mb-4">
        <label className="flex items-center gap-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides… try 'Figma' or 'export'"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </Card>
      {sections.length === 0 && (
        <Card><p className="text-sm text-muted-foreground">Nothing found for “{q}”. Try a simpler word.</p></Card>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.group} title={s.group}>
            <ul className="space-y-3">
              {s.items.map((i) => (
                <li key={i.title} className="tile cursor-pointer p-3 transition hover:shadow-md">
                  <p className="text-sm font-semibold">{i.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.desc}</p>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {i.mins} min read
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
