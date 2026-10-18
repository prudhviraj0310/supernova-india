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
  { area: "Colour & style library", status: "ok", note: "19 styles load and resolve correctly" },
  { area: "Code export (6 formats)", status: "ok", note: "Tailwind, CSS, TS, JSON, Swift, Kotlin" },
  { area: "Figma sync", status: "warn", note: "Needs a Figma access key to go live" },
  { area: "GitHub delivery", status: "warn", note: "Needs GitHub connection to open pull requests" },
  { area: "AI helper (MCP server)", status: "ok", note: "8 tools exposed to Cursor / Claude" },
  { area: "Database", status: "ok", note: "Embedded database with migrations" },
  { area: "Security", status: "bad", note: "Secret files (.env, .pem) committed to the repo" },
] as const;
