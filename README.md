# Better Auth and InstantDB starter

This starter combines Better Auth, InstantDB, TanStack Start, and a Cloudflare Worker.

## Local development

Use the Bun version declared in `package.json`.
Create an InstantDB app for development. Copy `.env.example` to an ignored `.env` file.

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Server-side authentication secret. |
| `INSTANT_ADMIN_TOKEN` | Server-side InstantDB admin token. |
| `VITE_INSTANT_APP_ID` | Public identifier of the development InstantDB app. |

Keep admin tokens and auth secrets outside `VITE_*` variables.
Review `cloudflare.config.ts` and the database integration before running against a real account.

```bash
bun install --frozen-lockfile
bun run dev
```

## Checks and generated files

```bash
bun run typecheck
bun run build
```

`typecheck` also generates Worker types. For an authentication schema change, run `bun run auth-schema`.
Let the router generate its route tree. Do not edit generated files manually.
These commands do not prove that a live sign-in or permission flow works. Verify those flows with test accounts.

Read [CONTRIBUTING.md](CONTRIBUTING.md) for review instructions and [SUPPORT.md](SUPPORT.md) for help.
