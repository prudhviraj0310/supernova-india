import { createFileRoute } from "@tanstack/react-router";
import { AuthPreview } from "@/components/AuthPreview";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Log in — Nexus Design OS" },
    { name: "description", content: "Explore the Nexus design system preview workspace for Indian teams. Real sign-in is not yet available." },
    { property: "og:title", content: "Log in — Nexus Design OS" },
    { property: "og:description", content: "Open the Nexus preview workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: LoginPage,
});

function LoginPage() { return <AuthPreview />; }