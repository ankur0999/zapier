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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const parse_1 = require("./parse");
const prismaClient = new client_1.PrismaClient();
const TOPIC_NAME = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: "main-worker" });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.connect();
        yield consumer.subscribe({
            topic: TOPIC_NAME, fromBeginning: true
        });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e, _f, _g, _h, _j;
                console.log({
                    partition,
                    offset: message.offset,
                    value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                if (!((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString())) {
                    return;
                }
                const parsedValue = JSON.parse((_d = message.value) === null || _d === void 0 ? void 0 : _d.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetails = yield prismaClient.zapRun.findFirst({
                    where: {
                        id: zapRunId
                    },
                    include: {
                        zap: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        },
                    }
                });
                const currentAction = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log("Current action not found?");
                    return;
                }
                if (currentAction.type.id === "email") {
                    const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                    const body = (0, parse_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.body, zapRunMetadata);
                    const to = (0, parse_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.email, zapRunMetadata);
                    console.log(`Sending out email to ${to} body is ${body}`);
                }
                if (currentAction.type.id === "send-sol") {
                    const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                    const amount = (0, parse_1.parse)((_g = currentAction.metadata) === null || _g === void 0 ? void 0 : _g.amount, zapRunMetadata);
                    const address = (0, parse_1.parse)((_h = currentAction.metadata) === null || _h === void 0 ? void 0 : _h.address, zapRunMetadata);
                    console.log(`Sending out solana to address ${address} of amount ${amount}`);
                }
                yield new Promise(r => setTimeout(r, 5000));
                const lastStage = (((_j = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions) === null || _j === void 0 ? void 0 : _j.length) || 1) - 1;
                if (lastStage !== stage) {
                    producer.send({
                        topic: TOPIC_NAME,
                        messages: [{
                                value: JSON.stringify({
                                    stage: stage + 1,
                                    zapRunId
                                })
                            }]
                    });
                }
                console.log("processing done");
                yield consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
            }),
        });
    });
}
main();
