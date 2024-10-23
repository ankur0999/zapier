"use client";
import { ReactNode } from "react"
export const LinkButton =({children, onclick, size="small"}: {
    children:ReactNode, 
    onclick:() => void,
    size? : "big" | "small"
}) =>{
    return <div className={`${size == "small" ? "py-1 px-2 hover:bg-stone-300": "flex justify-center text-lg font-bold text-slate-900 px-10 py-3 border-2 border-slate-400 rounded-full hover:border-slate-900"} cursor-pointer  text-gray-500`} onClick={onclick}>
        {children}
    </div>
}