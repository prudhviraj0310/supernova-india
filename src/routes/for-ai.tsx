import { createFileRoute, Link } from "@tanstack/react-router";
import { BrainCircuit, Check } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";

export const Route = createFileRoute("/for-ai")({
  head: () => ({
    meta: [
      { title: "For AI — Nexus Design OS" },
      { name: "description", content: "Let Cursor, Claude, Copilot and other AI tools read your design system, so generated code matches your brand automatically." },
      { property: "og:title", content: "For AI — Nexus Design OS" },
      { property: "og:description", content: "AI coding tools that follow your design system via MCP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForAiPage,
});

const points = [
  { title: "AI writes on-brand code", desc: "When Cursor or Copilot generates a screen, it uses your real tokens — your exact brand blue, your spacing, your radius. No more generic-looking AI output." },
  { title: "A shared connection", desc: "A future MCP connection could share your design system with coding assistants. No hosted MCP server is running in this preview." },
  { title: "Planned tools", desc: "The intended tools cover token lookup, component rules, code export and proposed changes. Availability and permissions need to be implemented and verified." },
  { title: "Review before publishing", desc: "A connected system should require team approval before publishing proposed changes. This preview has no publishing or access-control service." },
];

const config = `{
  "mcpServers": {
    "nexus": {
      "command": "npx",
      "args": ["-y", "@nexus/mcp-server"],
      "env": { "NEXUS_TOKEN": "your-token" }
    }
  }
}`;

function ForAiPage() {
  return (
    <div>
      <PageIntro title="Nexus for AI" hint="Give coding assistants clear brand rules rather than asking them to guess. Live AI connections are planned, not available yet." />
      <div className="grid gap-4 sm:grid-cols-2">
        {points.map((p) => (
          <Card key={p.title}>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold">{p.title}</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-4" title="Start with an exported library">
        <p className="mb-3 text-sm text-muted-foreground">Download JSON or TypeScript from Get code and give it to your coding assistant as context. No package installation or access token is needed for this preview.</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-success" /> <Link to="/export" className="text-primary underline">Get the sample token file</Link>
        </p>
      </Card>
    </div>
  );
}
