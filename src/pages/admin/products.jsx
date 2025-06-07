import axios from "axios";
import { useState,useEffect } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

//Add product function

export default function AdminProductsPage(){

    const[products,setProducts]=useState([]) //here empty array
    const[loaded,setLoaded]=useState(false) //page eka load weddima false
    const navigate=useNavigate() //thawa page ekakata smoothly yanna use karnaa hook eka


    useEffect(
        ()=>{
            if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
        (response)=>{
            //console.log(response.data)
            setProducts(response.data)
            setLoaded(true)
        }
        )
    }
        },
        [loaded]
    
)

//delete product function

async function deleteProduct(id){
const token=localStorage.getItem("token")
if(token==null)
{
    toast.error("Please login to delete a product")
    return
}
try{
await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
headers:{
    Authorization: "Bearer "+token
}
})
setLoaded(false) // Again go to useEffect function and true value set as false
toast.success("Product deleted successfully")
}catch(error){
toast.error("error deleting product")
return
}
}


return(
    <div className="e-full h-full rounded-lg relative">
     <Link to={"/admin/addProduct"} className="absolute right-5 bottom-5 text-white bg-black p-[12px] rounded-full pointer-center hover:bg-gray-300 hover:text-gray-700">
        <FaPlus/>
        </Link>
        {loaded&&
        <table className="w-full">
             <thead>
<tr>
    <th className="p-2">Product ID</th>
    <th className="p-2">Name</th>
    <th className="p-2">Alternative Name</th>
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
            <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100">
       <td className="p-2">{product.productId}</td>
        <td className="p-2">{product.name}</td>
         <td className="p-2">{product.altName}</td>
         <td className="p-2">{product.price}</td>
          <td className="p-2">{product.labeledPrice}</td>
           <td className="p-2">{product.stock}</td>
           <td className="p-2">
<div className="w-full h-full flex justify-center">
  
    <FaRegTrashAlt onClick={
        ()=>{
        deleteProduct(product.productId)
    }}className="text-[25px] m-[10px] hover:text-red-600"/> 

    <HiOutlinePencilSquare 
    onClick={
        ()=>{
            navigate("/admin/editProduct",{
                state:product}
            )//url and which data need to carry
        }
    }
    className="text-[25px] m-[10px] hover:text-blue-500"/>

</div>

           </td>
</tr>
           
            )
        } 
       )
        }
             </tbody>
        </table>}
        {
        !loaded&& 
    <div className="w-full h-full animation-spin flex justify-center items-center">
        <Loader/></div>
        }
    </div>
)
}

