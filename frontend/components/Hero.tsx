"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./button/LinkButton";
import { PrimaryButton } from "./button/PrimaryButton"
import { Features } from "./Features";

export const Hero = () =>{
    const router = useRouter();
    return <div>
        <div className="flex justify-center"> 
            <div className="text-5xl font-semibold text-center pt-10 max-w-xl">
            Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center"> 
            <div className="text-xl font-medium text-center pt-5 max-w-2xl">
            AI gives you automation superpowers, and Zapier puts them to work.
             Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>
        <div className="flex justify-center pt-8  ">
            <div className="mb-4">
            <PrimaryButton onClick={() => {
                 router.push("/signup")
            }} size="big">Get Started free</PrimaryButton>
            </div>
            <div className="pl-4 mb-4"> 
                <LinkButton onclick={()=>{}} size="big" >Contact Sales</LinkButton>
            </div>
        </div>
        <div className="flex justify-center text-sm">
            <Features title="Free forever" subtitle="for core features" />
            <Features title="More apps" subtitle="than any other platfor" />
            <Features title="Cutting-edge " subtitle="AI features" check="true" />
        </div>
    </div>
}