"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/button/DarkButton";

export  default function (){
    return <div>
        <Appbar />
        <div className="pt-8">
            <div className="flex justify-end pr-8">
            <DarkButton onClick={()=>{}}>Create</DarkButton>
            </div>
        </div>
    </div>
}