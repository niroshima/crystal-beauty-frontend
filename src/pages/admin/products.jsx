import axios from "axios"
import { useState,useEffect } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link} from "react-router-dom";

export default function AdminProductsPage(){

    const[products,setProducts]=useState([]) //here empty array


    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response)=>{
            console.log(response.data)
            setProducts(response.data)
        }
        )
        },
        []
    
)

return(
    <div className="e-full h-full rounded-lg relative">
     <Link to={"/admin/addProduct"} className="absolute right-5 bottom-5 text-white bg-black p-[12px] rounded-full pointer-center hover:bg-gray-300 hover:text-gray-700">
        <FaPlus/>
        </Link>
        <table className="w-full">
             <thead>
<tr>
    <th className="p-2">Product ID</th>
    <th className="p-2">Name</th>
    <th className="p-2">Price</th>
    <th className="p-2">Labled Price</th>
    <th className="p-2">Stock</th>
    <th className="p-2">Actions</th>
</tr>
             </thead>
             <tbody>
              
                {
       products.map(
        (product,index)=>{
          //console.log("Mapping"+product.productId)
          return(
            <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-300 hover:text-white">
       <td className="p-2">{product.productId}</td>
        <td className="p-2">{product.name}</td>
         <td className="p-2">{product.price}</td>
          <td className="p-2">{product.labelPrice}</td>
           <td className="p-2">{product.stock}</td>
           <td className="p-2">
<div className="w-full h-full flex justify-center">
  
    <FaRegTrashAlt /> 
    <HiOutlinePencilSquare />

</div>

           </td>
</tr>
           
            )
        } 
       )
        }
             </tbody>
        </table>
        
    </div>
)
}

