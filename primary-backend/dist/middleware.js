"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    try {
        const token = header.split(" ")[1];
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "you are not logged in"
        });
    }
}
exports.authMiddleware = authMiddleware;