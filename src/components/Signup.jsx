import { useEffect, useState } from "react";
import Textf from "./Textf";
import Utton from "./Utton";
import { Link } from "react-router-dom"
export default function Signup(){

    const[formData, setFormData]=useState({
        name: "",
        email:"",
        phone:"",
        password:"",
        confirm:""
    })
    // const[email,setEmail]=useState("")
    // const [phone, setPhone]=useState("")
    // const [password, setPassword]=useState("")
    // const [confirm, setConfirm ]=useState("")
    
    const[message, setMessage]=useState("")

    const signup=()=>{
        if(password.length<8){
setMessage("Password is not long")
        }
        if(password!==confirm){
            setMessage("Passwords should match")
        }
        if(!phone.startsWith("98")&&(!phone.startsWith("97"))){
            setMessage("Phone must start with 97 or 98")
        }
        if(!password.match(/[A-Z]/)){
            setMessage("Password should have a capital letter")
        }
        localStorage.setItem("data",JSON.stringify({name,email,phone,password,confirm}))
    }

return(


<div className="flex w-screen h-screen font-mono  ">
<div className=" flex flex-1 bg-cover bg-center  bg-no-repeat bg-[url(https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">

<div className="text-white/50 text-2xl ml-6">
<h1>Reach your dreams</h1>
<h1>Play your games</h1>
</div>


</div>


<div className="felx flex-1 items-center ">
<div className="flex items-center flex-col ">
<h1 className="text-2xl ">Sign up Now</h1>

<div>
    <form 
    onSubmit={(e)=>{
       e.preventDefault()
        signup()
    }}>
<Textf
className="mt-4 mb-4 bg-emerald-100 px-10 py-3 rounded  "
label="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Enter your name"
/>

<Textf 
className="mt-4 mb-4  bg-emerald-100 px-10 py-3 rounded  "

label="Email"
value={email}
placeholder="Enter your email"
onChange={(e)=>setEmail(e.target.value)}
/>
<Textf 
className="mt-4 mb-4  bg-emerald-100 px-10 py-3 rounded  "

label="Phone"
type="text"
value={phone}
placeholder="Enter your phone"
onChange={(e)=>setPhone(e.target.value)}
/>

<Textf 
className="mt-4 mb-4  bg-emerald-100 px-10 py-3 rounded  "

label="Password"
type="password"
value={password}
placeholder="Enter your password"
onChange={(e)=>setPassword(e.target.value)}
/>
<Textf 
className="mt-4 mb-4  bg-emerald-100 px-10 py-3 rounded  "

label="Confirm Password"
type="password"
value={confirm}
placeholder="Confirm your password"
onChange={(e)=>setConfirm(e.target.value)}
/>
<Utton
 type="submit"
label="Signup"/>
<div className="flex mt-6 ">
<p>Already signed up?</p>
<p className="text-cyan-700 ">
<Link to="/Login">Login in now </Link>
    </p>
   
</div>
{message && (
        <p className="text-pink-500   ">
{message}
        </p>
    )
    }
</form>

</div>
</div>


</div>

</div>










)



}