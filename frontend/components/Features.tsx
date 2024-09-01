export const Features = ({title, subtitle, check="false"}:{title: string, subtitle: string, check? : "false" | "true"}) =>{
    if(check === "true"){
        return <div className="px-2 flex">
        <Check />
        <div>{title}</div>
        <div className="font-bold px-1">{subtitle}</div>
        
        </div>
    }
    return <div className="px-2 flex">
        <Check />
        <div className="font-bold px-1">{title}</div>
        <div>{subtitle}</div>

        
    </div>
}

export const  Check = () =>{
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
    </div>
}