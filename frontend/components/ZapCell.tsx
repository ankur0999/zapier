export const ZapCell = ({
    name,
     index,
     onClick
}:{ 
    name?: string;
    index: number
    onClick : () => void;
}) => {
    return <div onClick ={onClick} className="border border-black py-6 px-6 flex w-[400px] justify-center cursor-pointer">
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}