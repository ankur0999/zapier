import { Router } from "express";
import { prismaClient } from "../db";
 const router = Router();

 router.get("/available", async (req, res) =>{
    const avilableActions = await prismaClient.availableAction.findMany({});
    res.json({
        avilableActions
    })
})

 export const actionRouter = router;