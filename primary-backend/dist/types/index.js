"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapCreateSchema = exports.SiginSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    email: zod_1.z.string().min(5),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().min(3)
});
exports.SiginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.ZapCreateSchema = zod_1.z.object({
    avilableTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
