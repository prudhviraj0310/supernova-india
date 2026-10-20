<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep content pages as TanStack file routes with individual head metadata; shared navigation lives in AppShell around the root Outlet so every page uses one shell.
- Account entry pages use a shared AuthPreview and never collect credentials or claim authentication until a real account service is connected.
- Search and small-screen navigation use the same navigation list so new pages remain discoverable on every screen.
- Keep educational reading content in browser-safe data modules and render it through the shared ReadingDialog; preview capabilities must never imply connected services.
