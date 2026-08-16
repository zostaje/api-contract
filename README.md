# Zostaje API Contract

Public, versioned contract shared by the Zostaje backend, native clients and
integrations such as the official MCP server.

## Contents

- `openapi.yaml` — language-neutral HTTP API contract.
- `src/` — runtime Zod schemas and TypeScript transport types.

Breaking API changes require a new major API version. Do not put credentials,
internal deployment configuration or user data in this repository.

```bash
npm install
npm test
npm run typecheck
npm run build
```

## Status

The current contract contains the platform health endpoint. Financial resources
will be added after authentication, storage and privacy rules are accepted in
the main product architecture.
