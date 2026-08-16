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

## Privacy boundary

The contract includes the local `Entry` vocabulary so native clients can share
fixtures and semantics. The optional sync backend accepts only
`EncryptedSyncRecord` envelopes. A plaintext entry is not a remote financial
CRUD resource and is encrypted on-device before it crosses the sync boundary.
