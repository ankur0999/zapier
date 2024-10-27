import { Router } from "express";
import { authMiddleware } from "../middleware";
import { prismaClient } from "../db";
import { ZapCreateSchema } from "../types";

const router = Router();



router.post("/", authMiddleware, async(req, res)=>{
   // @ts-ignore
   const userId:string = req.id;
   const body = req.body;
   const parsedData = ZapCreateSchema.safeParse(body);
   if(!parsedData.success){
      return res.status(411).json({
         message: "incorrect input"
      })
   }
   try{
   const zapId = await prismaClient.$transaction(async tx =>{
      
       const zap = await prismaClient.zap.create({
         data:{
            userId: parseInt(userId),
            triggerId: "",
            actions: {
               create: parsedData.data.actions.map((x,index)=>({
                  actionId: x.availableActionId,
                  sortingOrder: index,
                  metadata: x.actionMetadata
               }))
            }
         }
       })
       

       const trigger = await tx.trigger.create({
         data:{
            triggerId: parsedData.data.avilableTriggerId,
            zapId: zap.id
         }
       });
       

       await tx.zap.update({
         where: {
            id: zap.id
         },
         data:{
            triggerId: trigger.id
         }
       })
       
       return zap.id;
   }) 
   return res.json({
      zapId
   })
} catch(e){
   console.log(e);
}

   
})

router.get("/", authMiddleware, async(req, res)=>{
   // @ts-ignore
   const userId = req.id;
   const zaps = await prismaClient.zap.findMany({
      where: {
         userId
      },
      include: {
         actions: {
            include: {
               type: true
            }
         }, 
         trigger: {
            include :{
               type: true
            }
         }
      }

   });
   return res.json({
      zaps
   })
})

router.get("/:zapId", authMiddleware, async(req, res)=>{
   // @ts-ignore 
   const userId = req.id;
   const zapId = req.params.zapId;
   const zaps = await prismaClient.zap.findFirst({
      where:{
         id: zapId,
         userId
      },
      include:{
         actions: {
            include: {
               type: true
            }
         },
         trigger:{
            include:{
               type: true
            }
         }
      }
   });
   return res.json({
      zaps
   })
})

export const zapRouter = router;