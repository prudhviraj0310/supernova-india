import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, PageIntro } from "@/components/AppShell";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "AI helper — Nexus" },
      { name: "description", content: "Let AI coding tools like Cursor and Claude use your brand rules automatically." },
      { property: "og:title", content: "AI helper — Nexus" },
      { property: "og:description", content: "Connect Cursor, Claude and Copilot to your design system." },
    ],
  }),
  component: AI,
});

const tools = [
  ["get_tokens", "Read all your styles"],
  ["get_token", "Look up one style"],
  ["check_compliance", "Spot off-brand colours in code"],
  ["generate_code", "Write code for any platform"],
  ["list_components", "List building blocks"],
  ["import_figma_variables", "Bring in Figma styles"],
  ["propose_token_changes", "Suggest style changes"],
  ["get_design_system", "Share the whole system"],
];

const apps = ["Cursor", "Claude", "VS Code", "Copilot"];

function AI() {
  const [app, setApp] = useState(apps[0]);
  const config = `{\n  "mcpServers": {\n    "nexus": {\n      "command": "npx",\n      "args": ["tsx", "src/mcp/server.ts"]\n    }\n  }\n}`;
  return (
    <>
      <PageIntro title="AI helper" hint="Explore how coding tools could use your brand rules. No AI or hosted MCP service is connected yet." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="Planned AI capabilities" className="lg:col-span-6">
          <ul className="grid gap-2 sm:grid-cols-2">
            {tools.map(([id, l]) => (
              <li key={id} className="tile p-3"><p className="text-sm font-medium">{l}</p><p className="font-mono text-[11px] text-muted-foreground">{id}</p></li>
            ))}
          </ul>
        </Card>
        <Card title="Tool setup overview" className="lg:col-span-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {apps.map((a) => <Button key={a} onClick={() => setApp(a)} className={`rounded-full px-4 py-1.5 text-sm ${app === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{a}</Button>)}
          </div>
          <p className="mb-2 text-sm text-muted-foreground">{app} needs a verified MCP server before it can connect. The example below applies only to a separate source project containing that server, not this preview:</p>
          <pre className="overflow-auto rounded-2xl bg-foreground p-4 font-mono text-xs text-background">{config}</pre>
        </Card>
      </div>
    </>
  );
}
