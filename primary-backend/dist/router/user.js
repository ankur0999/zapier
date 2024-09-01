"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const ParsedData = types_1.SignupSchema.safeParse(body);
    console.log(ParsedData);
    if (!ParsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: ParsedData.data.email
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "User Already exists"
        });
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: ParsedData.data.email,
            name: ParsedData.data.name,
            // don't store password in plain text
            password: ParsedData.data.password
        }
    });
    // send out an varification email await email()
    return res.json({
        message: "Please verify your account by checking your email"
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const ParsedData = types_1.SiginSchema.safeParse(body);
    if (!ParsedData.success) {
        return res.status(411).json({
            message: "incorrect input"
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: ParsedData.data.email,
            password: ParsedData.data.password
        }
    });
    if (!userExists) {
        return res.status(403).json({
            message: "User doesn't exist "
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: userExists.id
    }, config_1.JWT_SECRET);
    return res.json({
        token: token
    });
}));
router.get("/user", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
}));
exports.userRouter = router;
