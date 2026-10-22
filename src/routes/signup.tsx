import { createFileRoute } from "@tanstack/react-router";
import { AuthPreview } from "@/components/AuthPreview";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Join Nexus — Design systems for Indian teams" },
    { name: "description", content: "Create a free Nexus account to save your brand styles and ask the AI design helper." },
    { property: "og:title", content: "Join Nexus — Design systems for Indian teams" },
    { property: "og:description", content: "Explore your colours, components and code in a sample Nexus workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: SignupPage,
});

function SignupPage() { return <AuthPreview signup />; }