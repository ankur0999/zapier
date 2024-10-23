"use client";
import { Appbar } from "@/components/Appbar"
import { LinkButton } from "@/components/button/LinkButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function() {
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<{
        availableActionId: string;
        availableActionName: string;
    }[]>([]);
    return <div>

        <Appbar/>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center ">
            <div className="flex justify-center w-full pb-2">
                <ZapCell name = {selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
            </div>
            <div className=" w-full pt-1">
                {selectedActions.map((action, index) => <div className="flex justify-center py-1"><ZapCell name = {action.availableActionName ? action.availableActionName: "Action"
                    } index = {2 + index} /></div>
                )}
            </div>
            <div className="flex justify-center">
                <div className="w-12">
                    
                <LinkButton onclick={() => {
                    setSelectedActions(a => [...a, {
                        availableActionId:"",
                        availableActionName:""
                    }])
                } }><div className="text-2xl text-center">+
                    </div></LinkButton>
                    
                    </div>
                </div>
        </div>
    </div>
}