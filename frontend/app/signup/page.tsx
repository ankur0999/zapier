"use client";
import { Appbar } from "@/components/Appbar"
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { CheckFeatures } from "@/components/CheckFeatures"
import { Input } from "@/components/Input"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    const [name, setName] = useState("");
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
                <Input label={"Name"} onChange={e => {
                    setName(e.target.value);
                }} type="text" placeholder="Your name"></Input>
                </div>
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
                    await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                        email,
                        password,
                        name
                    });
                    router.push("/login")
                }}>Get started free</PrimaryButton>
                </div>
                <div className="text-sm pt-4">By signing up, you agree to Zapier's terms of service and privacy policy.</div>
            </div>
        </div>
        </div>
        </div>
}
