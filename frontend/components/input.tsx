"use client";

import { PrimaryButton } from "./button/PrimaryButton";

export const Input = ({label, placeholder, onChange, type="text"}:{
    label: string;
    placeholder: string;
    onChange: (e:any) => void;
    type?: "text" | "password"
}) => {
    return <div>
        <div className="flex">
        <div className="text-sm pb-1 font-semibold">
            * <label>{label}</label>
        </div>
        <div className="pl-2 text-sm text-slate-500">(required)</div>
        </div>
        <input className="border rounded px-4 py-2 w-full border-black" type={type} 
            placeholder={placeholder} onChange={onChange} />
        
    </div>
}