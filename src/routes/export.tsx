import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, PageIntro } from "@/components/AppShell";
import { exportFormats, generateCode, type FormatId } from "@/lib/data";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Get code — Nexus" },
      { name: "description", content: "Download your styles as ready-to-use code for websites, iPhone and Android apps." },
      { property: "og:title", content: "Get code — Nexus" },
      { property: "og:description", content: "One click code for Tailwind, CSS, TypeScript, Swift and Kotlin." },
    ],
  }),
  component: ExportPage,
});

function ExportPage() {
  const [fmt, setFmt] = useState<FormatId>("tailwind");
  const f = exportFormats.find((x) => x.id === fmt);
  const [copyStatus, setCopyStatus] = useState("");
  if (!f) return null;
  const code = generateCode(fmt);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopyStatus("Copied"); }
    catch { setCopyStatus("Copy unavailable. Download the file instead."); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([code], { type: "text/plain" }));
    const a = document.createElement("a"); a.href = url; a.download = f.file; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <>
      <PageIntro title="Get code" hint="Pick where your app runs. We turn your styles into code your developers can paste in directly." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card title="Where will you use it?" className="lg:col-span-4">
          <div className="space-y-2">
            {exportFormats.map((x) => (
              <Button variant="ghost" key={x.id} onClick={() => setFmt(x.id)} className={`tile h-auto w-full justify-start whitespace-normal p-3 text-left ${fmt === x.id ? "ring-2 ring-ring" : ""}`}>
                <span><span className="block text-sm font-medium">{x.label}</span><span className="block text-xs text-muted-foreground">{x.for}</span></span>
              </Button>
            ))}
          </div>
        </Card>
        <Card title={f.file} className="lg:col-span-8" action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={copy} className="flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs"><Copy className="h-3.5 w-3.5" />Copy</Button>
            <Button onClick={download} className="flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 text-xs text-primary-foreground"><Download className="h-3.5 w-3.5" />Download</Button>
          </div>
        }>
          <p role="status" className="mb-2 text-xs text-muted-foreground">{copyStatus}</p>
          <pre className="max-h-[460px] overflow-auto rounded-2xl bg-foreground p-4 font-mono text-xs leading-relaxed text-background">{code}</pre>
          <div className="tile mt-4 flex flex-wrap items-center gap-3 p-3">
            <Github className="h-5 w-5 shrink-0" />
            <p className="min-w-0 flex-1 text-sm">Send this straight to your GitHub project as a pull request.</p>
            <span className="shrink-0 rounded-full bg-warning-soft px-2.5 py-1 text-[10px] font-semibold text-warning">Connect GitHub first</span>
          </div>
        </Card>
      </div>
    </>
  );
}
