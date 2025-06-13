import axios from "axios"
import Loader from "../../components/loader"
import { useEffect, useState } from "react"
import ProductCard from "../../components/product-card"

export default function ProductsPage(){
    //need to use productarray use state and product loaded useState
    const [productList,setProductList]=useState([])
    const [productsLoaded,setProductsLoaded]=useState(false)
useEffect(
    ()=>{
        if(!productsLoaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (res)=>{
                    setProductList(res.data)
                    setProductsLoaded(true)
                }
            )

        }

    },[productsLoaded]
)

return(
    <div className="h-full w-full">
{
    productsLoaded?
    <div className="w-full h-full flex flex-wrap justify-center">
        {
            productList.map(
                (product,index)=>{
                    return(
                        <ProductCard key={product.productId} product={product}/>
                            
                
                    )
                }
            )


        }

    </div>
    :
    <Loader/>

}
    </div>
)

}