import { z } from 'zod';

export const API_VERSION = 'v1' as const;

export const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.literal('zostaje-api'),
  apiVersion: z.literal(API_VERSION),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  requestId: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const EntryKindSchema = z.enum([
  'note',
  'expense',
  'income',
  'plan',
  'goal',
  'question',
]);

export const EntryStatusSchema = z.enum([
  'inbox',
  'confirmed',
  'done',
  'archived',
]);

export const EntrySourceSchema = z.enum([
  'text',
  'voice',
  'receipt',
  'import',
  'shortcut',
  'mcp',
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

export type EntryKind = z.infer<typeof EntryKindSchema>;
export type EntryStatus = z.infer<typeof EntryStatusSchema>;
export type EntrySource = z.infer<typeof EntrySourceSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type Entry = z.infer<typeof EntrySchema>;

export const ConsequenceKindSchema = z.enum([
  'reduces_safe_to_spend',
  'funds_goal',
  'delays_goal',
  'creates_commitment',
  'matches_recurring_pattern',
  'needs_answer',
]);

export const ConsequenceSchema = z.object({
  kind: ConsequenceKindSchema,
  explanation: z.string().trim().min(1).max(500),
  delta: MoneySchema.optional(),
});

export type ConsequenceKind = z.infer<typeof ConsequenceKindSchema>;
export type Consequence = z.infer<typeof ConsequenceSchema>;

// The backend may store this envelope because it contains ciphertext only.
// Decrypted Entry values never cross the sync boundary by default.
export const EncryptedSyncRecordSchema = z.object({
  id: z.string().uuid(),
  deviceId: z.string().uuid(),
  version: z.number().int().positive(),
  algorithm: z.literal('AES-256-GCM'),
  keyVersion: z.number().int().positive(),
  nonce: z.string().min(16).max(64),
  ciphertext: z.string().min(16),
  deleted: z.boolean().default(false),
  updatedAt: z.string().datetime({ offset: true }),
});

export type EncryptedSyncRecord = z.infer<
  typeof EncryptedSyncRecordSchema
>;
