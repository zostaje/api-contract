import assert from "node:assert/strict";
import { test } from "node:test";

import {
  API_VERSION,
  EncryptedSyncRecordSchema,
  EntrySchema,
  HealthResponseSchema,
  SyncPullResponseSchema,
  SyncPushRequestSchema,
  SyncPushResponseSchema,
} from "./index.js";

test("health response contract accepts the current API version", () => {
  const result = HealthResponseSchema.parse({
    status: "ok",
    service: "zostaje-api",
    apiVersion: API_VERSION,
  });

  assert.equal(result.apiVersion, "v1");
});

test("entry contract preserves original financial notebook text", () => {
  const entry = EntrySchema.parse({
    id: "a14e7bd8-332a-43db-9d16-04cc55cc4f07",
    text: "McDonald's 24,50",
    kind: "expense",
    status: "inbox",
    source: "text",
    amount: { minorUnits: 2450, currency: "PLN" },
    category: "Jedzenie",
    createdAt: "2026-08-16T12:00:00+02:00",
    updatedAt: "2026-08-16T12:00:00+02:00",
  });

  assert.equal(entry.text, "McDonald's 24,50");
  assert.equal(entry.amount?.minorUnits, 2450);
});

test("sync contract accepts opaque encrypted records only", () => {
  const record = EncryptedSyncRecordSchema.parse({
    id: "01a2ef08-8b12-4bdf-8f66-bc543aeb4c35",
    deviceId: "15ef7900-7e0c-46a3-8d9e-f5cb5a622b01",
    version: 3,
    algorithm: "AES-256-GCM",
    keyVersion: 1,
    nonce: "AAECAwQFBgcICQoL",
    ciphertext: "encrypted-base64-payload",
    updatedAt: "2026-08-16T12:00:00+02:00",
  });

  assert.equal(record.deleted, false);
  assert.equal(record.version, 3);
});

test("push and pull contracts use bounded batches and monotonic cursors", () => {
  const record = {
    id: "01a2ef08-8b12-4bdf-8f66-bc543aeb4c35",
    deviceId: "15ef7900-7e0c-46a3-8d9e-f5cb5a622b01",
    version: 1,
    algorithm: "AES-256-GCM",
    keyVersion: 1,
    nonce: "AAECAwQFBgcICQoL",
    ciphertext: "encrypted-base64-payload",
    updatedAt: "2026-08-16T12:00:00+02:00",
  };

  assert.equal(
    SyncPushRequestSchema.parse({ records: [record] }).records.length,
    1,
  );
  assert.equal(
    SyncPushResponseSchema.parse({
      accepted: [record.id],
      unchanged: [],
      conflicts: [],
      cursor: 4,
    }).cursor,
    4,
  );
  assert.equal(
    SyncPullResponseSchema.parse({ records: [record], cursor: 4 }).records[0]
      ?.deleted,
    false,
  );
});

test("push contract rejects an empty or oversized batch", () => {
  assert.equal(SyncPushRequestSchema.safeParse({ records: [] }).success, false);
  assert.equal(
    SyncPushRequestSchema.safeParse({
      records: Array.from({ length: 101 }, () => ({})),
    }).success,
    false,
  );
});
