import { createFileRoute } from "@tanstack/react-router";
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
  if (status === "Ready") return "bg-emerald-500/15 text-emerald-700";
  return "bg-amber-500/15 text-amber-700";
}

function IntegrationsPage() {
  return (
    <div>
      <PageIntro title="Integrations" hint="Nexus talks to the tools your team already uses. Connect once — everything stays in sync after that." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.name}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl" aria-hidden>{i.icon}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(i.status)}`}>{i.status}</span>
            </div>
            <h2 className="mt-3 text-base font-semibold">{i.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
            <button className="mt-4 h-9 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {i.status === "Ready" ? "Connect" : "Set up"}
            </button>
          </Card>
        ))}
      </div>
      <Card className="mt-4" title="Don't see your tool?">
        <p className="text-sm text-muted-foreground">
          Nexus has an open API and webhooks, so your developers can connect anything — Jira, Linear, your CI pipeline, even a WhatsApp bot.
          Check the <span className="font-medium text-foreground">API reference</span> in Documentation.
        </p>
      </Card>
    </div>
  );
}
