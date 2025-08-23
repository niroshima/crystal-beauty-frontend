import toast from "react-hot-toast";
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../../utils/mediaUpload";

export default function AddProductForm(){

const [productId,setProductId]=useState("");
const [name,setName]=useState("");
const [altName,setAltNames]=useState("");
const [price,setPrice]=useState("");
const [labeledPrice,setLabeledPrice]=useState("");
const [description,setDescription]=useState("");
const [stock,setStock]=useState("");
const [category,setCategory]=useState("");
const [images,setImages]=useState([]);

const navigate=useNavigate()



   async function handleSubmit(){
        
    const promiseArray=[]
    for(let i=0; i<images.length; i++)
    {
        const promise=mediaUpload(images[i]);
        promiseArray[i]=promise;
    }
    const result=await Promise.all(promiseArray)

    const altNamesInArray=altName.split(",")

        const product={
           productId: productId,
           name:name,
           altName:altNamesInArray,
           price:price,
           labeledPrice:labeledPrice,
           description:description,
           stock:stock,
           category:category,
           images:result

        }
                 const token=localStorage.getItem("token")
 
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product",product,{
            headers:{
                "Authorization": "Bearer "+token
            }
        }).then(
           ()=>{
            toast.success("Product added successfully")
            navigate("/admin/products")
           } 
        ).catch(
            ()=>{
                toast.error("Product adding failed")
            }
        )

    }
    return(

        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center"> 
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Products</h1>

            <input 
            value={productId}
            onChange={(e)=>{
                setProductId(e.target.value)
            }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product ID"/>

            <input 
            value={name}
            onChange={(e)=>{
                setName(e.target.value)
            }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product Name"/>
            <input 
            value={altName}
            onChange={(e)=>{
                setAltNames(e.target.value)
            }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Alternative Names"/>
            <input 
            value={price}
            onChange={(e)=>{
                setPrice(e.target.value)
            }
            }
            type="number"
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Procuct Price"/>
            <input 
            value={labeledPrice}
            onChange={(e)=>{
                setLabeledPrice(e.target.value)
            }
            }
            type="number"
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Labeled Price"/>
            <textarea 
            value={description}
            onChange={(e)=>{
                setDescription(e.target.value)
            }
            }
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Description"/>

            <input
            type="file"
            onChange={(e)=>{
                setImages(e.target.files)
            }}
            multiple // can select many images using ctrl
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Product Images"/>
            

            <input 
            value={stock}
            onChange={(e)=>{
                setStock(e.target.value)
            }
            }
            type="number"
            className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
            placeholder="Stock"/>

           <select
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
           >
            <option value="">Select Category</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Haircare">Haircare</option>
            <option value="Fragrance">Fragrance</option>
            </select>

            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/products"} className="w-[180px] text-center bg-red-500 text-white p-[10px] rounded-lg pointer-center hover:bg-red-600">
        Cancel
        </Link>
        <button onClick={handleSubmit} className="w-[180px] text-center bg-green-500 text-white p-[10px] rounded-lg pointer-center hover:bg-green-600">
       Add Product
        </button>
            </div>

        </div>
        </div>
    )

}