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
