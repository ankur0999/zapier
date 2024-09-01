"use client";
import { ReactNode } from "react"
export const PrimaryButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: ()=> void,
    size?: "big"|"small"
})=>{
    return <div onClick={onClick} className={`${size === "small"? " px-4 py-1 hover:shadow-md":"text-lg px-11 py-3 hover:bg-orange-700"} font-semibold text-white bg-orange-600 cursor-pointer rounded-3xl `}>
        {children}
    </div>
}