 import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SiginSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
 const router = Router();

 router.post("/signup", async(req, res)=>{
    const body = req.body;
    const ParsedData = SignupSchema.safeParse(body);
    console.log(ParsedData)
    if(!ParsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const userExists = await prismaClient.user.findFirst({
        where:{
            email: ParsedData.data.email
        }
    });

    if(userExists){
        return res.status(403).json({
            message: "User Already exists"
        })
    }
    await prismaClient.user.create({
        data:{
            email: ParsedData.data.email,
            name: ParsedData.data.name,
            // don't store password in plain text
            password: ParsedData.data.password

        }
    })

    // send out an varification email await email()
    return res.json({
        message: "Please verify your account by checking your email"
    })
 })

 router.post("/signin", async(req, res)=>{
    const body = req.body;
    const ParsedData = SiginSchema.safeParse(body);
    if(!ParsedData.success){
        return res.status(411).json({
            message: "incorrect input"
        })
    }
    const userExists = await prismaClient.user.findFirst({
        where: {
            email: ParsedData.data.email,
            password: ParsedData.data.password 
        }
    })
    if(!userExists){
        return res.status(403).json({
            message: "User doesn't exist "
        })
    }

    const token = jwt.sign({
        id: userExists.id
    }, JWT_SECRET);
    
    return res.json({
        token:token
    })
    
 })

 router.get("/user", authMiddleware , async(req, res)=>{
    //@ts-ignore
    const userId = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id: userId,
        },
        select: {
            name: true, 
            email: true
        }
    })

    return res.json({
        user
    });
 })

 export const userRouter = router;