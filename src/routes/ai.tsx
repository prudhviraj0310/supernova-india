import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { askDesignHelper } from "@/lib/ai.functions";
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
      <PageIntro title="AI helper" hint="Ask anything about your colours, styles and building blocks. Answers use your real library." />
      <HelperChat />
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

function HelperChat() {
  const { user, ready } = useAuth();
  const ask = useServerFn(askDesignHelper);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function send(e: FormEvent) {
    e.preventDefault();
    if (!q.trim() || busy) return;
    const next = [...msgs, { role: "user" as const, content: q.trim() }];
    setMsgs(next); setQ(""); setBusy(true); setErr(null);
    try { const r = await ask({ data: { messages: next } }); setMsgs([...next, { role: "assistant", content: r.reply }]); }
    catch (x) { setErr(x instanceof Error ? x.message : "Something went wrong."); }
    setBusy(false);
  }
  return (
    <Card title="Ask the design helper" className="mb-4">
      {!ready ? null : !user ? (
        <p className="text-sm text-muted-foreground"><Link to="/login" className="font-semibold text-primary underline">Log in</Link> to chat with the AI helper.</p>
      ) : (
        <>
          <div className="mb-3 max-h-80 space-y-3 overflow-y-auto">
            {msgs.length === 0 && <p className="text-sm text-muted-foreground">Try: “Which blue should I use for a Pay ₹250 button?”</p>}
            {msgs.map((m, i) => <div key={i} className={`whitespace-pre-wrap rounded-2xl p-3 text-sm ${m.role === "user" ? "ml-auto max-w-[85%] bg-primary text-primary-foreground" : "max-w-[90%] bg-muted"}`}>{m.content}</div>)}
            {busy && <p className="text-sm text-muted-foreground">Thinking…</p>}
          </div>
          {err && <p role="alert" className="mb-2 text-sm text-destructive">{err}</p>}
          <form onSubmit={send} className="flex gap-2">
            <Input aria-label="Your question" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about your design system…" maxLength={2000} />
            <Button type="submit" disabled={busy || !q.trim()}>Ask</Button>
          </form>
        </>
      )}
    </Card>
  );
}
