"use client";
import { ReactNode } from "react"
export const DarkButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: ()=> void,
    size?: "big"|"small"
})=>{
    return <div onClick={onClick} className={`${size === "small"? " px-4 py-1 hover:shadow-md":"text-lg px-11 py-3 hover:bg-purple-800"} 
    font-semibold text-white bg-purple-800 cursor-pointer rounded `}>
        {children}
    </div>
}