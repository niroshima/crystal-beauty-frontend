import axios from "axios"
import { useEffect, useState } from "react"

import Loader from "../../components/loader"


export default function AdminUserPage(){

    const[users,setUsers]=useState([])
    const[loaded,setLoaded]=useState(false)
    


    useEffect(
        ()=>{
            if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/user").then(
        (response)=>{
            
            setUsers(response.data)
            setLoaded(true)
        }
        )
    }
        },
        [loaded]
    )

return(
    <div className="e-full h-full rounded-lg relative">
        {loaded&&
        <table className="w-full">
             <thead>
                <tr>
                    <th className="p-2">Email</th>
                    <th className="p-2">First Name</th>
                    <th className="p-2">Last Name</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Phone</th>
                </tr>
                </thead>

             <tbody>
                {
                users.map(
                    (user,index)=>
                        { 
                            return(
                            <tr key={index} className="border-b-2 border-gray-300 cursor-pointer hover:bg-gray-100">
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.firstName}</td>
                                <td className="p-2">{user.lastName}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">{user.phone}</td>
                            </tr>
                         )}
                    )
                }
             </tbody>
        </table>
        }
        
        {
        !loaded&& 
    <div className="w-full h-full animation-spin flex justify-center items-center">
        <Loader/></div>
        }
    </div>
)
}