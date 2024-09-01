export const CheckFeatures = ({label}:{label:string}) =>{
    return <div className="p-3"> 
    <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<div className="pl-4">
    {label}
</div>
    
</div>
</div>
}