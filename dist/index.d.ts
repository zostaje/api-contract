import { z } from 'zod';
export declare const API_VERSION: "v1";
export declare const HealthResponseSchema: z.ZodObject<{
    status: z.ZodLiteral<"ok">;
    service: z.ZodLiteral<"zostaje-api">;
    apiVersion: z.ZodLiteral<"v1">;
}, "strip", z.ZodTypeAny, {
    status: "ok";
    service: "zostaje-api";
    apiVersion: "v1";
}, {
    status: "ok";
    service: "zostaje-api";
    apiVersion: "v1";
}>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export declare const ApiErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    requestId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    requestId?: string | undefined;
}, {
    code: string;
    message: string;
    requestId?: string | undefined;
}>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export declare const EntryKindSchema: z.ZodEnum<["note", "expense", "income", "plan", "goal", "question"]>;
export declare const EntryStatusSchema: z.ZodEnum<["inbox", "confirmed", "done", "archived"]>;
export declare const EntrySourceSchema: z.ZodEnum<["text", "voice", "receipt", "import", "shortcut", "mcp"]>;
export declare const MoneySchema: z.ZodObject<{
    minorUnits: z.ZodNumber;
    currency: z.ZodString;
}, "strip", z.ZodTypeAny, {
    minorUnits: number;
    currency: string;
}, {
    minorUnits: number;
    currency: string;
}>;
export declare const EntrySchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    kind: z.ZodEnum<["note", "expense", "income", "plan", "goal", "question"]>;
    status: z.ZodEnum<["inbox", "confirmed", "done", "archived"]>;
    source: z.ZodEnum<["text", "voice", "receipt", "import", "shortcut", "mcp"]>;
    amount: z.ZodOptional<z.ZodObject<{
        minorUnits: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        minorUnits: number;
        currency: string;
    }, {
        minorUnits: number;
        currency: string;
    }>>;
    occurredAt: z.ZodOptional<z.ZodString>;
    dueAt: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "inbox" | "confirmed" | "done" | "archived";
    text: string;
    id: string;
    kind: "note" | "expense" | "income" | "plan" | "goal" | "question";
    source: "text" | "voice" | "receipt" | "import" | "shortcut" | "mcp";
    createdAt: string;
    updatedAt: string;
    amount?: {
        minorUnits: number;
        currency: string;
    } | undefined;
    occurredAt?: string | undefined;
    dueAt?: string | undefined;
    category?: string | undefined;
}, {
    status: "inbox" | "confirmed" | "done" | "archived";
    text: string;
    id: string;
    kind: "note" | "expense" | "income" | "plan" | "goal" | "question";
    source: "text" | "voice" | "receipt" | "import" | "shortcut" | "mcp";
    createdAt: string;
    updatedAt: string;
    amount?: {
        minorUnits: number;
        currency: string;
    } | undefined;
    occurredAt?: string | undefined;
    dueAt?: string | undefined;
    category?: string | undefined;
}>;
export type EntryKind = z.infer<typeof EntryKindSchema>;
export type EntryStatus = z.infer<typeof EntryStatusSchema>;
export type EntrySource = z.infer<typeof EntrySourceSchema>;
export type Money = z.infer<typeof MoneySchema>;
export type Entry = z.infer<typeof EntrySchema>;
export declare const ConsequenceKindSchema: z.ZodEnum<["reduces_safe_to_spend", "funds_goal", "delays_goal", "creates_commitment", "matches_recurring_pattern", "needs_answer"]>;
export declare const ConsequenceSchema: z.ZodObject<{
    kind: z.ZodEnum<["reduces_safe_to_spend", "funds_goal", "delays_goal", "creates_commitment", "matches_recurring_pattern", "needs_answer"]>;
    explanation: z.ZodString;
    delta: z.ZodOptional<z.ZodObject<{
        minorUnits: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        minorUnits: number;
        currency: string;
    }, {
        minorUnits: number;
        currency: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    kind: "reduces_safe_to_spend" | "funds_goal" | "delays_goal" | "creates_commitment" | "matches_recurring_pattern" | "needs_answer";
    explanation: string;
    delta?: {
        minorUnits: number;
        currency: string;
    } | undefined;
}, {
    kind: "reduces_safe_to_spend" | "funds_goal" | "delays_goal" | "creates_commitment" | "matches_recurring_pattern" | "needs_answer";
    explanation: string;
    delta?: {
        minorUnits: number;
        currency: string;
    } | undefined;
}>;
export type ConsequenceKind = z.infer<typeof ConsequenceKindSchema>;
export type Consequence = z.infer<typeof ConsequenceSchema>;
export declare const EncryptedSyncRecordSchema: z.ZodObject<{
    id: z.ZodString;
    deviceId: z.ZodString;
    version: z.ZodNumber;
    algorithm: z.ZodLiteral<"AES-256-GCM">;
    keyVersion: z.ZodNumber;
    nonce: z.ZodString;
    ciphertext: z.ZodString;
    deleted: z.ZodDefault<z.ZodBoolean>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedAt: string;
    deviceId: string;
    version: number;
    algorithm: "AES-256-GCM";
    keyVersion: number;
    nonce: string;
    ciphertext: string;
    deleted: boolean;
}, {
    id: string;
    updatedAt: string;
    deviceId: string;
    version: number;
    algorithm: "AES-256-GCM";
    keyVersion: number;
    nonce: string;
    ciphertext: string;
    deleted?: boolean | undefined;
}>;
export type EncryptedSyncRecord = z.infer<typeof EncryptedSyncRecordSchema>;
