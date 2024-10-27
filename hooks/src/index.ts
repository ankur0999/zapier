import express from "express"
import { PrismaClient } from "@prisma/client";



const client = new PrismaClient();

const app = express();
app.use(express.json());


// zapier hooks
// password logic
app.post("/hooks/catch/:userId/:zapId" , async (req, res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store in db a new trigger
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });
        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "webhooks received"
    })

    // push it on a queue (kafka/redis)
})

app.listen(3002)