import { useState } from "react"
import  Textf from "./Textf"
import Utton from "./Utton"
import { Link } from "react-router-dom"
export default function Login(){
const [email, setEmail] =useState("")
const [password, setPassword]=useState("")

return(
<div className="flex w-screen h-screen  ">
    <div className="flex-1 bg-cover bg-center   bg-no-repeat    bg-[url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FtaW5nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)]">
<h1 className="font-bold text-[#AACCD6] bg-black/10   text-4xl ml-3 ">Gaming corner </h1>
    </div>

<div className="flex flex-1 flex-col gap-10 bg-cyan items-center  ">
<div className="font-bold text-2xl font-mono  ">
 <h1>Welcome Back</h1>   
<h1>Login Now</h1> 
</div>

<div className=" ">

<Textf 
className=" w-full  py-3 rounded-md pl-2 mt-6 bg-emerald-800/10"
type="email"
label="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Textf 
className=" w-full  py-3 rounded-md pl-2 mt-6 bg-emerald-800/10"
type="password"
label="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

</div>

<Utton
label ="Login"
/>
<div className="flex ">
<p>Not signed in?</p>
<p className="text-cyan-800">
<Link to="/Signup"> Sign-in Now</Link>
</p>
</div>
</div>
</div>

)
}