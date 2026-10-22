import { createFileRoute } from "@tanstack/react-router";
import { AuthPreview } from "@/components/AuthPreview";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Log in — Nexus Design OS" },
    { name: "description", content: "Log in to Nexus with email, Google or Lovable to save your own styles and use the AI helper." },
    { property: "og:title", content: "Log in — Nexus Design OS" },
    { property: "og:description", content: "Log in to your Nexus design workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: LoginPage,
});

function LoginPage() { return <AuthPreview />; }