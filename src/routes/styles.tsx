import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, PageIntro } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/data";
import { Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/styles")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Colours & styles — Nexus" },
      { name: "description", content: "Every brand colour, spacing and text size your team uses, explained in plain words." },
      { property: "og:title", content: "Colours & styles — Nexus" },
      { property: "og:description", content: "Your brand colours, spacing and text sizes in one place." },
    ],
  }),
  component: Styles,
});

const tabs = [
  { id: "all", l: "All" }, { id: "color", l: "Colours" }, { id: "spacing", l: "Spacing" },
  { id: "radius", l: "Corners" }, { id: "type", l: "Text" },
];

function Styles() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const list = useMemo(
    () => tokens.filter((t) => (tab === "all" || t.type === tab) && (t.path + t.plain).toLowerCase().includes(q.toLowerCase())),
    [tab, q],
  );
  return (
    <>
      <PageIntro title="Colours & styles" hint="These are the shared rules for how your product looks. Save your own styles below and copy any name for your code." />
      <MyStyles />
      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tabs.map((t) => (
              <Button variant="ghost" key={t.id} onClick={() => setTab(t.id)} className={`rounded-full px-4 py-1.5 text-sm ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t.l}</Button>
            ))}
          </div>
          <input aria-label="Search styles" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. blue" className="h-10 rounded-full border bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64" />
        </div>
        <p role="status" className="mb-2 text-xs text-muted-foreground">{copied === "Copy unavailable" ? "Copy unavailable. Select the displayed name instead." : ""}</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => (
            <div key={t.path} className="tile flex items-center gap-3 p-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-card text-xs font-semibold"
                style={t.type === "color" ? { background: t.value } : undefined}>
                {t.type === "spacing" && <span className="block h-2 rounded bg-primary" style={{ width: t.value }} />}
                {t.type === "radius" && <span className="block h-6 w-6 border-2 border-primary" style={{ borderRadius: t.value }} />}
                {t.type === "type" && "Aa"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.plain} {"deprecated" in t && <span className="ml-1 rounded-full bg-warning-soft px-2 text-[10px] text-warning">retiring</span>}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">{t.path} · {t.value}</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Copy name" onClick={async () => { try { await navigator.clipboard.writeText(t.path); setCopied(t.path); setTimeout(() => setCopied(null), 1200); } catch { setCopied("Copy unavailable"); } }} className="shrink-0 text-muted-foreground hover:text-foreground">
                {copied === t.path ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ))}
          {list.length === 0 && <p className="text-sm text-muted-foreground">Nothing matches “{q}”.</p>}
        </div>
      </Card>
    </>
  );
}

const kinds = [{ id: "color", l: "Colour" }, { id: "spacing", l: "Spacing" }, { id: "radius", l: "Corner" }, { id: "type", l: "Text size" }];

function MyStyles() {
  const { user, ready } = useAuth();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [kind, setKind] = useState("color");
  const [value, setValue] = useState("#1e3a8a");
  const [err, setErr] = useState<string | null>(null);
  const list = useQuery({
    queryKey: ["my-styles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("custom_styles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("custom_styles").insert({ name: name.trim(), kind, value: value.trim() });
      if (error) throw error;
    },
    onSuccess: () => { setName(""); setErr(null); qc.invalidateQueries({ queryKey: ["my-styles"] }); },
    onError: () => setErr("Could not save. Check the name and value."),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("custom_styles").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-styles"] }),
  });
  if (!ready) return null;
  return (
    <Card title="My saved styles" className="mb-4">
      {!user ? (
        <p className="text-sm text-muted-foreground"><Link to="/login" className="font-semibold text-primary underline">Log in</Link> to save your own colours and styles.</p>
      ) : (
        <>
          <form className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto_10rem_auto]" onSubmit={(e) => { e.preventDefault(); if (name.trim() && value.trim()) add.mutate(); }}>
            <Input aria-label="Style name" placeholder="Name, e.g. Saffron accent" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
            <select aria-label="Style type" value={kind} onChange={(e) => { setKind(e.target.value); setValue(e.target.value === "color" ? "#1e3a8a" : e.target.value === "type" ? "16px" : "8px"); }} className="h-9 rounded-md border bg-surface px-3 text-sm">
              {kinds.map((k) => <option key={k.id} value={k.id}>{k.l}</option>)}
            </select>
            <div className="flex gap-2">
              {kind === "color" && <input type="color" aria-label="Pick colour" value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#1e3a8a"} onChange={(e) => setValue(e.target.value)} className="h-9 w-10 shrink-0 rounded border" />}
              <Input aria-label="Style value" value={value} onChange={(e) => setValue(e.target.value)} maxLength={60} required />
            </div>
            <Button type="submit" disabled={add.isPending}>{add.isPending ? "Saving…" : "Save style"}</Button>
          </form>
          {err && <p role="alert" className="mb-2 text-sm text-destructive">{err}</p>}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {list.data?.map((s) => (
              <div key={s.id} className="tile flex items-center gap-3 p-3">
                <div className="h-10 w-10 shrink-0 rounded-xl border" style={s.kind === "color" ? { background: s.value } : undefined} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{s.name}</p><p className="truncate font-mono text-xs text-muted-foreground">{s.kind} · {s.value}</p></div>
                <Button variant="ghost" size="icon" aria-label={`Delete ${s.name}`} onClick={() => del.mutate(s.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No saved styles yet. Add your first one above.</p>}
          </div>
        </>
      )}
    </Card>
  );
}
