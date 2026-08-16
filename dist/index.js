import { z } from "zod";
export const API_VERSION = "v1";
export const HealthResponseSchema = z.object({
    status: z.literal("ok"),
    service: z.literal("zostaje-api"),
    apiVersion: z.literal(API_VERSION),
});
export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().optional(),
});
export const EntryKindSchema = z.enum([
    "note",
    "expense",
    "income",
    "plan",
    "goal",
    "question",
]);
export const EntryStatusSchema = z.enum([
    "inbox",
    "confirmed",
    "done",
    "archived",
]);
export const EntrySourceSchema = z.enum([
    "text",
    "voice",
    "receipt",
    "import",
    "shortcut",
    "mcp",
]);
export const MoneySchema = z.object({
    minorUnits: z.number().int(),
    currency: z.string().regex(/^[A-Z]{3}$/),
});
export const EntrySchema = z.object({
    id: z.string().uuid(),
    text: z.string().trim().min(1).max(2_000),
    kind: EntryKindSchema,
    status: EntryStatusSchema,
    source: EntrySourceSchema,
    amount: MoneySchema.optional(),
    occurredAt: z.string().datetime({ offset: true }).optional(),
    dueAt: z.string().datetime({ offset: true }).optional(),
    category: z.string().trim().min(1).max(80).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
});
export const ConsequenceKindSchema = z.enum([
    "reduces_safe_to_spend",
    "funds_goal",
    "delays_goal",
    "creates_commitment",
    "matches_recurring_pattern",
    "needs_answer",
]);
export const ConsequenceSchema = z.object({
    kind: ConsequenceKindSchema,
    explanation: z.string().trim().min(1).max(500),
    delta: MoneySchema.optional(),
});
// The backend may store this envelope because it contains ciphertext only.
// Decrypted Entry values never cross the sync boundary by default.
export const EncryptedSyncRecordSchema = z.object({
    id: z.string().uuid(),
    deviceId: z.string().uuid(),
    version: z.number().int().positive(),
    algorithm: z.literal("AES-256-GCM"),
    keyVersion: z.number().int().positive(),
    nonce: z.string().min(16).max(64),
    ciphertext: z.string().min(16),
    deleted: z.boolean().default(false),
    updatedAt: z.string().datetime({ offset: true }),
});
export const SyncConflictSchema = z.object({
    id: z.string().uuid(),
    reason: z.enum(["stale_version", "same_version_different_payload"]),
    serverVersion: z.number().int().positive(),
});
export const SyncPushRequestSchema = z.object({
    records: z.array(EncryptedSyncRecordSchema).min(1).max(100),
});
export const SyncPushResponseSchema = z.object({
    accepted: z.array(z.string().uuid()),
    unchanged: z.array(z.string().uuid()),
    conflicts: z.array(SyncConflictSchema),
    cursor: z.number().int().nonnegative(),
});
export const SyncPullResponseSchema = z.object({
    records: z.array(EncryptedSyncRecordSchema).max(500),
    cursor: z.number().int().nonnegative(),
});
