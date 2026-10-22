import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { tokens, components } from "@/lib/data";

type Msg = { role: "user" | "assistant"; content: string };

export const askDesignHelper = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { messages: Msg[] }) => {
    const messages = (input?.messages ?? []).slice(-10).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, 2000),
    })) as Msg[];
    if (!messages.length) throw new Error("Ask a question first");
    return { messages };
  })
  .handler(async ({ data, context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI is not configured");
    const { data: mine } = await context.supabase.from("custom_styles").select("name, kind, value").limit(100);
    const system = `You are the Nexus design helper for Indian product teams. Answer in simple everyday English, short and practical. Use rupees (₹) for money examples.
Library styles: ${tokens.map((t) => `${t.path}=${t.value} (${t.plain})`).join("; ")}
User's own saved styles: ${(mine ?? []).map((s) => `${s.name}=${s.value} (${s.kind})`).join("; ") || "none yet"}
Building blocks: ${components.map((c) => `${c.name} (${c.status})`).join(", ")}`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages: [{ role: "system", content: system }, ...data.messages] }),
    });
    if (res.status === 429) throw new Error("Too many questions right now. Please wait a minute.");
    if (res.status === 402) throw new Error("AI credits have run out for this workspace.");
    if (!res.ok) { console.error("AI error", res.status, await res.text()); throw new Error("The AI helper could not answer. Try again."); }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "No answer." };
  });
