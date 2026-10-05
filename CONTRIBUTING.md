# Contribute to better-auth-instantdb-starter

Contributions can fix behavior, improve documentation, or add focused tests.

## Before you start

Read [the support guide](SUPPORT.md) for questions and issue routing.
Search existing issues and pull requests. Discuss larger API, architecture, or dependency changes before implementation.

Work from `main` and target that branch in your pull request.
Keep each change focused. Avoid unrelated formatting and dependency updates.

## Prepare a checkout

Use the Bun version declared in `package.json`. Development requires an InstantDB app and local Better Auth configuration.

```bash
bun install --frozen-lockfile
bun run dev
```

Run the commands below from the repository root unless a command names another directory.
On Windows, use `gradlew.bat` in place of `./gradlew` for Gradle commands.

## Repository layout

- `src/database/`: database and authentication integration.
- `src/instant.schema.ts`, `src/instant.perms.ts`: InstantDB schema and permissions.
- `src/routes/`: TanStack routes.
- `cloudflare.config.ts`: Worker configuration.
- `auth.schema.ts`: generated auth schema.

## Verify your change

```bash
bun run typecheck
bun run build
```

Copy `.env.example` to an ignored `.env` file. Use a separate InstantDB app for development. Keep the admin token and auth secret on the server. Treat `VITE_*` variables as public. For auth schema changes, run `bun run auth-schema` from the source configuration. Let the owning tools generate routes and Worker types. Verify sign-in, sign-out, permissions, and session handling with test accounts.

Run the relevant checks before review. State the command and result in the pull request.
If a check cannot run, explain the missing dependency or service. Do not claim it passed.
Keep generated artifacts consistent with their source and review their diff.

## Style and documentation

Follow the existing code conventions and repository formatter. Keep commit hooks enabled.
Add focused tests for changed logic when practical. Avoid tests that only assert source strings.
Update documentation when commands, APIs, configuration, or expected behavior change.
Keep examples small and reproducible. Preserve exact identifiers, commands, and error messages.

## Open a pull request

Explain the problem and resulting behavior. Link related issues without a placeholder issue number.
Describe auth or permission changes and the flows checked.
Include commands and results. State any runtime checks that remain necessary.
Respond to review with a correction or concrete evidence.

Use Conventional Commits: `type(scope): description`, for example `docs(contributing): explain local validation`.
Use a meaningful scope, or omit it. Keep the subject concise and imperative.
Add a body when the reason or compatibility impact is not obvious.

For vulnerabilities, follow [the security reporting instructions](SECURITY.md).
Remove credentials and private data from examples, logs, and screenshots.
