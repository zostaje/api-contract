import { z } from 'zod';
export const API_VERSION = 'v1';
export const HealthResponseSchema = z.object({
    status: z.literal('ok'),
    service: z.literal('zostaje-api'),
    apiVersion: z.literal(API_VERSION),
});
export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().optional(),
});
