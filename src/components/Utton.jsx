export default function Utton({label, onClick }){
return(
<button 
onClick={onClick }
className="bg-cyan-800/10 mt-6 px-20 py-2 rounded-2xl  ">{label}</button>
)}