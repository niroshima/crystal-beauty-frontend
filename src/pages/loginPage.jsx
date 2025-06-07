import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage(){
//use hook useState here
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[loading,setLoading]=useState(false)
const navigate=useNavigate()

function handleLogin(){
        //console.log("Email: ",email);
        //console.log("Password: ",password);
setLoading(true)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log("You have sussessfully logged",response.data);
                 toast.success("You have sussessfully logged");
                 localStorage.setItem("token",response.data.token) //broweser table create with key and value

                 const user=response.data.user;
                 if(user.role==="admin")
                    {
                    //Window.location.href="/admin/"
                    navigate("/admin")
                 }else
                 {
                   //Window.location.href="/"
                    navigate("/")
                 }
                 setLoading(false)
                 }
            
        ).catch(
            (error)=>{
               console.log("Login failed",error.response.data); 
              toast.error(error.response.data.message||"Login failed");
               setLoading(false)
            }
        )
       // console.log("LoLogin button clicked");
    }

    return(
        <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover by-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-[55px] flex flex-col justify-center items-center">
                <input onChange={
                    (e)=>{
                   setEmail(e.target.value)
                }
                } className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="email"/>
                <input onChange={
                    (e)=>{
                   setPassword(e.target.value)
                }
                }className="w-[400px] h-[50px] border border-white rounded-xl text-center" type="password" placeholder="password "/>
                <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer">
                    {
                    loading?"Loading...":"Login"
                    }

                </button>
                <p className="text-gray-600 text-center m-[10px]">Don't have an account yet?
                &nbsp;
                <span className="text-green-500 cursor-pointer hover:text-green-700">
                    <Link to={"/register"}>Register Now</Link></span>
                </p>
                </div>
            </div>
        </div>
    )
}