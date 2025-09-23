import axios from "axios"
import Loader from "../../components/loader"
import { useEffect, useState } from "react"
import ProductCard from "../../components/product-card"
import { useLocation } from "react-router-dom"

export default function ProductsPage(){
    //need to use productarray use state and product loaded useState
    const [productList,setProductList]=useState([])
    const [productsLoaded,setProductsLoaded]=useState(false)
    const [search,setSearch]=useState("")
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryQuery = queryParams.get("category"); // get category from URL

useEffect(() => {
    if (!productsLoaded) {
      let url = import.meta.env.VITE_BACKEND_URL + "/api/product/";
      if (categoryQuery) {
        url += "category/" + categoryQuery; // backend should support this route
      }

      axios.get(url).then((res) => {
        setProductList(res.data.products || res.data);
        setProductsLoaded(true);
      });
    }
  }, [productsLoaded, categoryQuery]
);


function searchProducts() {
    if (search.length > 0) {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search).then(
            (res) => {
                setProductList(res.data.products)
            })
    } 
}

function resetProducts() {
    setSearch(""); // clear the search input
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((res) => {
        setProductList(res.data.products || res.data);
    });
}


return(
    <div className="h-full w-full">

        <div className="w-full h-[50px] flex items-center justify-center">
            <input type="text" placeholder="Search" value={search} className="w-[300px] h-[30px] border-2 border-gray-300 rounded md p-2"
            onChange={
                (e)=>{setSearch(e.target.value)}
                }/>
                
            <button className="bg-blue-500 text-white p-2 rounded-md ml-2"
                onClick={()=>{
                    searchProducts()
                    }}>
                Search
            </button>


                <button className="bg-blue-500 text-white p-2 rounded-md ml-2" 
                onClick={resetProducts}>
                    Reset
                </button>
        </div>
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
