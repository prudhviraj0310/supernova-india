// Sample data mirroring the design system engine (tokens.ts export of the original project).
export const tokens = [
  { path: "color.brand.primary", value: "#3b82f6", type: "color", plain: "Main brand colour" },
  { path: "color.brand.primaryHover", value: "#2563eb", type: "color", plain: "Brand colour on hover" },
  { path: "color.primitive.blue.500", value: "#3b82f6", type: "color", plain: "Blue (base)" },
  { path: "color.primitive.slate.100", value: "#f1f5f9", type: "color", plain: "Light background grey" },
  { path: "color.primitive.slate.900", value: "#0f172a", type: "color", plain: "Near-black for text" },
  { path: "color.text.primary", value: "#0f172a", type: "color", plain: "Body text colour" },
  { path: "color.feedback.warning", value: "#f59e0b", type: "color", plain: "Warning / attention" },
  { path: "color.legacy.accent", value: "#ff007f", type: "color", plain: "Old accent — being retired", deprecated: true },
  { path: "spacing.xs", value: "4px", type: "spacing", plain: "Tiny gap" },
  { path: "spacing.sm", value: "8px", type: "spacing", plain: "Small gap" },
  { path: "spacing.md", value: "16px", type: "spacing", plain: "Normal gap" },
  { path: "spacing.lg", value: "24px", type: "spacing", plain: "Large gap" },
  { path: "spacing.xl", value: "32px", type: "spacing", plain: "Extra large gap" },
  { path: "borderRadius.sm", value: "4px", type: "radius", plain: "Slightly rounded" },
  { path: "borderRadius.md", value: "8px", type: "radius", plain: "Rounded" },
  { path: "borderRadius.full", value: "9999px", type: "radius", plain: "Pill / circle" },
  { path: "typography.fontFamily.sans", value: "Inter, system-ui", type: "type", plain: "Main font" },
  { path: "typography.fontSize.base", value: "16px", type: "type", plain: "Normal text size" },
  { path: "typography.fontSize.lg", value: "18px", type: "type", plain: "Large text size" },
] as const;

export const components = [
  { name: "Button", status: "Ready", usage: 1240, desc: "Clickable action — Save, Pay, Continue." },
  { name: "Input", status: "Ready", usage: 860, desc: "Box where people type — name, phone, PIN code." },
  { name: "Card", status: "Ready", usage: 712, desc: "A container that groups related info." },
  { name: "Badge", status: "Ready", usage: 534, desc: "Small label like 'New' or 'Paid'." },
  { name: "Switch", status: "In review", usage: 210, desc: "On/off toggle for settings." },
  { name: "Modal", status: "In progress", usage: 98, desc: "Pop-up window for confirmations." },
  { name: "Date picker", status: "Planned", usage: 0, desc: "Calendar to choose a date." },
];

export const activity = [
  { who: "Ananya Sharma", what: "updated Main brand colour", when: "Today, 10:32 AM", tag: "+1 change" },
  { who: "Rahul Verma", what: "synced from Figma", when: "Today, 9:05 AM", tag: "+12 changes" },
  { who: "Priya Nair", what: "exported code for iOS", when: "Yesterday, 6:51 PM", tag: "Swift" },
  { who: "Arjun Mehta", what: "retired Old accent colour", when: "Yesterday, 4:30 PM", tag: "−1" },
  { who: "Kavya Reddy", what: "published docs v2.4", when: "Mon, 11:45 AM", tag: "Docs" },
  { who: "Vikram Singh", what: "added Switch component", when: "Mon, 9:12 AM", tag: "+1" },
];

export const exportFormats = [
  { id: "tailwind", label: "Tailwind CSS", file: "tailwind.theme.css", for: "Websites using Tailwind" },
  { id: "css", label: "Plain CSS", file: "tokens.css", for: "Any website" },
  { id: "typescript", label: "TypeScript", file: "tokens.ts", for: "React / web apps" },
  { id: "json", label: "JSON", file: "tokens.json", for: "Any tool or script" },
  { id: "swift", label: "iOS (Swift)", file: "Tokens.swift", for: "iPhone apps" },
  { id: "kotlin", label: "Android (Kotlin)", file: "Tokens.kt", for: "Android apps" },
] as const;

export type FormatId = (typeof exportFormats)[number]["id"];

const camel = (p: string) => p.replace(/\.(\w)/g, (_, c) => c.toUpperCase());
const kebab = (p: string) => p.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/\./g, "-");

export function generateCode(format: FormatId): string {
  const t = tokens.filter((x) => !("deprecated" in x));
  switch (format) {
    case "css":
      return `:root {\n${t.map((x) => `  --${kebab(x.path)}: ${x.value};`).join("\n")}\n}`;
    case "tailwind":
      return `@theme {\n${t.map((x) => `  --${kebab(x.path)}: ${x.value};`).join("\n")}\n}`;
    case "typescript":
      return `export const tokens = {\n${t.map((x) => `  ${camel(x.path)}: "${x.value}",`).join("\n")}\n} as const;`;
    case "json":
      return JSON.stringify(Object.fromEntries(t.map((x) => [x.path, { $value: x.value, $type: x.type }])), null, 2);
    case "swift":
      return `import SwiftUI\n\nenum Tokens {\n${t
        .filter((x) => x.type === "color")
        .map((x) => `  static let ${camel(x.path)} = Color(hex: "${x.value}")`)
        .join("\n")}\n}`;
    case "kotlin":
      return `object Tokens {\n${t
        .filter((x) => x.type === "color")
        .map((x) => `  val ${camel(x.path)} = Color(0xFF${x.value.slice(1).toUpperCase()})`)
        .join("\n")}\n}`;
  }
}

export const healthChecks = [
  { area: "Colour & style library", status: "ok", note: "19 sample styles available to browse" },
  { area: "Code export (6 formats)", status: "ok", note: "Local download of the sample library" },
  { area: "Figma sync", status: "warn", note: "Demonstration only — no live Figma connection" },
  { area: "GitHub delivery", status: "warn", note: "Not connected — automatic pull requests unavailable" },
  { area: "AI helper", status: "warn", note: "Capability overview only — no hosted MCP service" },
  { area: "Accounts & storage", status: "warn", note: "Not connected — no accounts or saved workspaces" },
  { area: "Service security", status: "warn", note: "No live service security audit is available in this preview" },
] as const;

// ---- New page data (Supernova-for-India site) ----

export const docSections = [
  {
    group: "Start here",
    items: [
      { title: "What is Nexus?", mins: 3, desc: "One place for your brand's colours, text styles and building blocks." },
      { title: "Set up your first design system", mins: 8, desc: "From empty workspace to a working library in under 10 minutes." },
      { title: "Invite your team", mins: 2, desc: "Designers, developers and managers — who can do what." },
    ],
  },
  {
    group: "Everyday work",
    items: [
      { title: "Add and edit styles", mins: 5, desc: "Colours, spacing, fonts — with plain-English names." },
      { title: "Sync with Figma", mins: 6, desc: "Pull changes from Figma and review them before applying." },
      { title: "Export code for your app", mins: 4, desc: "Tailwind, CSS, TypeScript, Swift, Kotlin — pick and download." },
      { title: "Connect AI tools", mins: 5, desc: "Let Cursor, Claude or Copilot read your design system." },
    ],
  },
  {
    group: "For developers",
    items: [
      { title: "API reference", mins: 10, desc: "Every endpoint, with copy-paste examples." },
      { title: "Webhooks", mins: 6, desc: "Get notified in Slack or your CI when styles change." },
      { title: "Self-hosting notes", mins: 7, desc: "Run Nexus on your own servers in India." },
    ],
  },
];

export const integrations = [
  { name: "Figma", desc: "Two-way sync of colours, text styles and components.", status: "Needs access key", icon: "🎨" },
  { name: "GitHub", desc: "Open pull requests with updated design code automatically.", status: "Not connected", icon: "🐙" },
  { name: "VS Code", desc: "See your tokens as autocomplete while you code.", status: "Ready", icon: "💻" },
  { name: "Cursor", desc: "AI coding that follows your design system rules.", status: "Ready", icon: "🤖" },
  { name: "Storybook", desc: "Publish your component docs straight to Storybook.", status: "Ready", icon: "📕" },
  { name: "Slack", desc: "Get a message when someone changes a style.", status: "Ready", icon: "💬" },
];

export const blogPosts = [
  {
    title: "Why Indian fintech apps need a design system more than anyone",
    excerpt: "When your app moves money in ₹, one wrong colour on a Pay button costs trust. Here's how design systems prevent that.",
    author: "Ananya Sharma", date: "14 Oct 2026", mins: 6, tag: "Fintech", featured: true,
  },
  { title: "Design tokens, explained with a thali", excerpt: "Primitives, semantics, components — the easiest analogy you'll ever read.", author: "Rahul Verma", date: "9 Oct 2026", mins: 4, tag: "Basics" },
  { title: "Supporting 6 Indian languages without breaking your UI", excerpt: "Devanagari text is taller. Tamil words are longer. Plan your type scale for it.", author: "Priya Nair", date: "2 Oct 2026", mins: 7, tag: "Localisation" },
  { title: "From Figma to production in one afternoon", excerpt: "A real walkthrough: sync, review, export, ship.", author: "Arjun Mehta", date: "25 Sep 2026", mins: 5, tag: "Workflow" },
  { title: "Dark mode for Indian summers (and power cuts)", excerpt: "Why battery-saving dark UIs matter more here, and how to tokenise them.", author: "Kavya Reddy", date: "18 Sep 2026", mins: 5, tag: "Theming" },
];

export const customers = [
  { company: "PayKaro", industry: "Fintech · Bengaluru", quote: "Our UPI checkout used to have 4 different button styles. Now it's one, everywhere.", person: "Rohan Iyer, Head of Design", stat: "60% faster releases" },
  { company: "Seekho Academy", industry: "Edtech · Delhi NCR", quote: "We ship the same look to Android, iOS and web from one place. Students never notice a seam.", person: "Meera Krishnan, Product Lead", stat: "3 platforms, 1 source" },
  { company: "BazaarDirect", industry: "Commerce · Mumbai", quote: "Festive-sale theming used to take two weeks. With tokens, Diwali mode is a one-line switch.", person: "Aditya Joshi, CTO", stat: "2 weeks → 1 day" },
  { company: "SwasthCare", industry: "Healthtech · Hyderabad", quote: "Accessibility contrast checks are built in. Our elderly users thank us.", person: "Dr. Nandini Rao, Founder", stat: "WCAG AA by default" },
];

export const enterpriseFeatures = [
  { title: "Single sign-on (SSO)", desc: "Planned: sign in through your company identity provider. Not connected yet." },
  { title: "Audit log", desc: "Planned: a history of who changed what and when. No workspace history is stored yet." },
  { title: "India data residency", desc: "Under consideration: an India hosting option. No hosting region or regulatory compliance is guaranteed." },
  { title: "Dedicated support", desc: "Planned: support for Indian teams. Support contacts, languages and hours are not confirmed." },
  { title: "Custom roles", desc: "Planned: separate view, edit and publish permissions. This preview has no access-control service." },
  { title: "Service agreement", desc: "Not available yet. No uptime commitment or service-level agreement is offered in this preview." },
];

export const learnCourses = [
  { title: "Design systems from zero", lessons: 12, mins: 90, level: "Beginner", desc: "No jargon. Start from 'what is a token?' and end with a working library." },
  { title: "Figma to code, the right way", lessons: 8, mins: 60, level: "Intermediate", desc: "Set up sync so designers and developers stop stepping on each other." },
  { title: "Theming & dark mode", lessons: 6, mins: 45, level: "Intermediate", desc: "One brand, many looks — festival themes, dark mode, white-label apps." },
  { title: "Design systems for AI coding", lessons: 5, mins: 40, level: "Advanced", desc: "Make Cursor and Copilot write UI that matches your brand every time." },
];

export const contextExplainers = [
  { term: "Primitive", plain: "The raw ingredient. Like atta, rice, dal — base colours like 'blue 500'.", example: "color.primitive.blue.500 = #3b82f6" },
  { term: "Semantic token", plain: "The dish you make from ingredients. 'Main brand colour' points to blue 500 — change the blue once, everything updates.", example: "color.brand.primary → blue.500" },
  { term: "Component", plain: "The served thali. A Button uses semantic tokens, so it always matches the brand.", example: "Button bg → color.brand.primary" },
  { term: "Context / theme", plain: "The same kitchen, a different menu. Diwali theme, dark mode, or a white-label version for a partner.", example: "theme.diwali overrides brand.primary" },
];
