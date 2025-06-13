import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader"
import ImageSlider from "../../components/imageSlider"


export default function ProductOverview()
{
    const params=useParams()
    if(params.id==null)
    {
        window.location.href="/products"
    }
const [product,setProduct]=useState(null)
//there are three status in this pag,.hence we can use boolean(true false)
//they are loading,loaded,error
const [status,setStatus]=useState("loading")

useEffect(
    ()=>{
        if(status=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
               
                (res)=>{
                    console.log(res)
                    setProduct(res.data.product)
                    setStatus("loaded")
                }
            ).catch(
                ()=>{
                    toast.error("Product is not available")
                    setStatus("error")
                }
            )
        }
    },[status]
)
return(
    <div className="w-full h-full"> 
    {
    status=="loading"&&<Loader/>
    }
    {
        status=="loaded"&&
        <div className="w-full h-full flex">
          
          <div className="w-[50%] h-full">
            <ImageSlider images={product.images}/>
          </div>
<div className="w-[50%] h-full">
    <h1 className="text-3xl font-bold text-center">{product.name}</h1>
    <h2 className="text-3xl font-semibold text-center text-gray-500">{product.altName.join("|")}</h2>
    <div className="w-full flex">
        {
            product.labeledPrice>product.price?
            <>
            <h2 className="text-3xl mr-[20px]">LKR: {product.Price.toFixed(2)}</h2>
            <h2 className="text-3xl line-through text-gray-500">LKR: {product.labeledPrice.toFixed(2)}</h2>
            
            </>:
            <h2>{product.price}</h2>
        }

    </div>
    <h2 className="text-3xl font-semibold text-center text-gray-500">LKR: {product.price}</h2>
    <p className="text-xl text-center text-gray-500">{product.description}</p>

</div>
            </div>

    }

    {
        status=="error"&&<div>
            ERROR
            </div>
    }
    
    </div>
)
}