"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./button/LinkButton"
import { PrimaryButton } from "./button/PrimaryButton";

export const Appbar = () =>{
    const router = useRouter();
    return <div className="flex justify-between border-b px-4">
        <div className="  ">
            <div className="flex ">
                <div className="text-orange-600 text-4xl font-black ">
                    <div className=" ">
                        _
                    </div>
                </div>
                <div className="text-3xl font-bold pt-2 ">zapier</div>
                
            </div>
            
        </div>
        <div className="">
            <div className="flex py-3 pr-4 pl-3 text-base font-sans">
            <LinkButton onclick={() => {}} > Contact Sales</LinkButton>
            <LinkButton onclick={() => {
                router.push("/login")
            }} > Log in</LinkButton>
            <PrimaryButton onClick={()=>{
                router.push("/signup")
            }}>
                Sign up
            </PrimaryButton>

            </div>
            
        </div>
    </div>
}