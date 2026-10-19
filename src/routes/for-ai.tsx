import { createFileRoute } from "@tanstack/react-router";
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
  { title: "One config, every tool", desc: "Nexus runs an MCP server. Add one small config block to Cursor, Claude Desktop, VS Code or Copilot and they're all connected." },
  { title: "8 ready-made tools", desc: "AI can list tokens, read component rules, check colour contrast, and even suggest which token to use — all read-only and safe." },
  { title: "You stay in control", desc: "AI tools can read your design system, never change it. Only your team publishes changes, and every change is reviewed first." },
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
      <PageIntro title="Nexus for AI" hint="AI coding tools are fast, but they guess your design. Connect them to Nexus and they stop guessing." />
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
      <Card className="mt-4" title="Connect in 1 minute">
        <p className="mb-3 text-sm text-muted-foreground">Paste this into your AI tool's settings file (works for Cursor, Claude Desktop, VS Code):</p>
        <pre className="overflow-x-auto rounded-xl bg-foreground p-4 text-xs leading-relaxed text-background">{config}</pre>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-emerald-600" /> Full walkthrough with screenshots is on the AI helper page.
        </p>
      </Card>
    </div>
  );
}
