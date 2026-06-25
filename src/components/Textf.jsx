export default function Textf({type,className, value,label, onChange , placeholder}){
return(
<div className="w-full ">
    <label className=" font-bold font-mono  ">{label}</label><br />
    <input className={className}  
     type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    />
</div>
)



}