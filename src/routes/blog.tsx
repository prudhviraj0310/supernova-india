import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReadingDialog } from "@/components/ReadingDialog";
import { postBodies } from "@/lib/reading";
import workspaceImage from "@/assets/design-workspace.jpg";
import { Card, PageIntro } from "@/components/AppShell";
import { blogPosts } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Nexus Design OS" },
      { name: "description", content: "Practical design-system writing for Indian product teams — fintech, localisation, theming and workflows." },
      { property: "og:title", content: "Blog — Nexus Design OS" },
      { property: "og:description", content: "Design-system lessons for Indian product teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [featured, ...rest] = blogPosts;
  const [selected, setSelected] = useState<(typeof blogPosts)[number] | null>(null);
  if (!featured) return <PageIntro title="Blog" hint="New articles are on their way." />;
  return (
    <div>
      <PageIntro title="Blog" hint="Short, practical reads for Indian product teams. No fluff — every post teaches something you can use the same day." />
      <img src={workspaceImage} alt="A design workspace with a laptop, colour swatches and chai" width={1280} height={720} className="mb-5 aspect-[16/6] w-full rounded-lg object-cover" />
      <div className="mb-6 border-b pb-6">
        <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">Featured · {featured.tag}</span>
        <h2 className="mt-3 max-w-2xl text-xl font-semibold sm:text-2xl">{featured.title}</h2>
        <p className="mt-2 max-w-2xl text-sm opacity-90">{featured.excerpt}</p>
        <p className="mt-4 flex items-center gap-2 text-xs opacity-80">
          {featured.author} · {featured.date} · <Clock className="h-3 w-3" /> {featured.mins} min
        </p>
        <Button variant="link" className="mt-3 px-0" onClick={() => setSelected(featured)}>Read article</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((p) => (
          <Card key={p.title}>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">{p.tag}</span>
            <h2 className="mt-3 text-base font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              {p.author} · {p.date} · <Clock className="h-3 w-3" /> {p.mins} min
            </p>
            <Button variant="link" className="mt-3 px-0" onClick={() => setSelected(p)}>Read article</Button>
          </Card>
        ))}
      </div>
      <ReadingDialog title={selected?.title ?? null} paragraphs={selected ? postBodies[selected.tag] ?? [] : []} onClose={() => setSelected(null)} />
    </div>
  );
}
