import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReadingDialog } from "@/components/ReadingDialog";
import { Card, PageIntro } from "@/components/AppShell";
import { integrations } from "@/lib/data";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Nexus Design OS" },
      { name: "description", content: "Connect Nexus with Figma, GitHub, VS Code, Cursor, Storybook and Slack. One click, no setup headache." },
      { property: "og:title", content: "Integrations — Nexus Design OS" },
      { property: "og:description", content: "Figma, GitHub, VS Code, Cursor, Storybook, Slack — all connected." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IntegrationsPage,
});

function statusStyle(status: string) {
  if (status === "Ready") return "bg-success-soft text-success";
  return "bg-warning-soft text-warning";
}

function IntegrationsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      <PageIntro title="Integrations" hint="Explore connections for the tools your team uses. No external tools are connected in this preview." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.name}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl" aria-hidden>{i.icon}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle("Planned")}`}>Not connected</span>
            </div>
            <h2 className="mt-3 text-base font-semibold">{i.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
            {i.name === "Figma" ? <Button asChild className="mt-4 w-full"><Link to="/figma">Preview sync</Link></Button> : <Button variant="outline" className="mt-4 w-full" onClick={() => setSelected(i.name)}>Connection details</Button>}
          </Card>
        ))}
      </div>
      <Card className="mt-4" title="Don't see your tool?">
        <p className="text-sm text-muted-foreground">
          A public API and webhooks are not available yet. Read the <Link to="/docs" className="font-medium text-primary underline">Documentation</Link> for the current preview limits.
        </p>
      </Card>
      <ReadingDialog title={selected ? `${selected} connection` : null} paragraphs={[`${selected ?? "This tool"} is not connected to this workspace. No permissions have been requested and no data is being shared.`, selected === "GitHub" ? "You can download a file from Get code and add it to your repository manually. Automatic pull requests require a verified GitHub connection." : "Use the JSON or TypeScript export as a reference in your existing workflow. A live connection requires a connected service and the appropriate permissions."]} onClose={() => setSelected(null)} />
    </div>
  );
}
