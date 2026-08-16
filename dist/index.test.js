import assert from 'node:assert/strict';
import { test } from 'node:test';
import { API_VERSION, HealthResponseSchema } from './index.js';
test('health response contract accepts the current API version', () => {
    const result = HealthResponseSchema.parse({
        status: 'ok',
        service: 'zostaje-api',
        apiVersion: API_VERSION,
    });
    assert.equal(result.apiVersion, 'v1');
});
