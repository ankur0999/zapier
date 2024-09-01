import { NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
export function authMiddleware (req: Request, res: Response, next: NextFunction){
    const header = req.headers.authorization as unknown as string;
    
    try{
        const token = header.split(" ")[1];
        const payload = jwt.verify(token,JWT_SECRET);
        // @ts-ignore
        req.id = payload.id;
        next();
    }catch(e){
        return res.status(403).json({
            message: "you are not logged in"
        })
    }

} 