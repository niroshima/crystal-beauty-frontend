import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import LandingPage from "./client/homeLandingPage";
import ContactPage from "./client/contactPage";
import ReviewerPage from "./client/reviwersPage";

export default function HomePage(){

    return(
        <div className="w-full h-screen max-h-screen">
          <Header/>

          <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
 <Routes path="/*">
               <Route path="/" element={<LandingPage/>}/>
               <Route path="/products" element={<ProductsPage/>}/>
               <Route path="/overview/:id" element={<ProductOverview/>}/>
               <Route path="/cart" element={<CartPage/>}/>
               <Route path="/checkout" element={<CheckoutPage/>}/>
               <Route path="/contact" element={<ContactPage/>}/>

              <Route path="/review" element={<ReviewerPage />} />
               
               
               <Route path="/*" element={<h1>404 NotFound</h1>}/>
              
               
               </Routes>
          </div>
        </div>
    )
}