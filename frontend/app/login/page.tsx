"use client";
import { Appbar } from "@/components/Appbar"
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { CheckFeatures } from "@/components/CheckFeatures"
import { Input } from "@/components/input"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import axios from "axios";





export default function () {
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="flex pt-8  max-w-5xl">
            <div className="flex-1 pt-20">
                <div className="font-semibold text-3xl px-4  font-sans">
                Join millions worldwide who automate their work using Zapier.
                </div>
                <div className="pt-6 ">
                <CheckFeatures label={"Easy setup, no coding required"}/>
                <CheckFeatures label={"Free forever for core features"}/>
                <CheckFeatures label={"14-day trial of premium features & apps"}/>
                </div>
            </div>
            <div className="flex-1 pt-8 pb-8 px-4  border rounded">
                
                <div className="p-2">
                <Input label={"Email"} onChange={e => {
                    setEmail(e.target.value);
                }} type="text" placeholder="Your Email"></Input>
                </div>
                <div className="p-2">
                <Input label={"Password"} onChange={e => {
                    setPassword(e.target.value);
                }} type="password" placeholder="Password"></Input>
                </div>
                <div className="text-center pt-4">
                <PrimaryButton size = "big" onClick={async()=>{
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                        email,
                        password,
                    
                    });
                    localStorage.setItem("token",res.data.token);
                    router.push("/dashboard")
                }}>Get started free</PrimaryButton>
                </div>
                <div className="text-sm pt-4">By signing up, you agree to Zapier's terms of service and privacy policy.</div>
            </div>
        </div>
        </div>
        </div>
}
