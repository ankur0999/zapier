import { Router } from "express";
import { prismaClient } from "../db";

 const router = Router();

router.get("/available", async (req, res) =>{
    const avilableTriggers = await prismaClient.availableTriggers.findMany({});
    res.json({
        avilableTriggers
    })
})


 export const triggerRouter = router;