# Plan: Complete "Supernova for India" — no Pricing page

## Goal
Turn the app into a complete Supernova-style product site for Indian customers, using the design already built (glass cards, navy accent, Manrope) and the structure of the reference repos. **No Pricing page** — pricing is removed entirely.

## What stays (already built, verified)
- Home, Colours & styles, Building blocks, Figma sync, Get code, AI helper, Guide, System health
- Same design system, icon nav rail, mobile bottom bar

## New pages to add (Supernova-style, Indian-first)
1. **Documentation** (`/docs`) — searchable doc layout: getting started, tokens, components, Figma sync, export, API
2. **Integrations** (`/integrations`) — Figma, GitHub, VS Code, Cursor, Storybook, Slack; each with connect status
3. **Blog** (`/blog`) — article list + one featured post, Indian design-system topics
4. **Customers** (`/customers`) — Indian company stories (fintech, edtech, commerce style case cards)
5. **Enterprise** (`/enterprise`) — SSO, audit logs, dedicated support, India data residency
6. **For AI** (`/for-ai`) — how AI tools (Cursor, Copilot, Claude) use the design system via MCP
7. **Learn** (`/learn`) — courses/tutorials on design systems
8. **Contexts 101** (`/contexts-101`) — explainer page on design contexts/tokens
9. **Design system management** (`/dsm`) — product overview page
10. **Login / Signup** (`/login`, `/signup`) — clean auth screens (demo only, no real accounts yet; real accounts need Lovable Cloud — say the word and I'll enable it)

## Indian-first touches throughout
- ₹ prices, +91 phone formats, Indian names and cities in all sample content
- IST timestamps, Namaste greeting, UPI-style examples in components
- Plain everyday language, no jargon

## Navigation update
- Nav rail groups: Product (existing 8 pages) + Company/Resources section (docs, blog, customers, integrations, learn, enterprise)
- Login/Signup buttons in the shell header

## Technical notes
- All new routes get their own `head()` metadata (unique title/description, og tags)
- No backend changes; all content is sample data in `src/lib/data.ts`
- After building: verify every route loads in the browser with no console errors, and re-check build log
