

//we can take cart details in time in this function
export default function getCart()
{
let  cart=localStorage.getItem("cart");
if(cart==null)
{
    cart=[]
    localStorage.setItem("cart",JSON.stringify(cart)) // convert the cart as string
    return[]
}
cart=JSON.parse(cart) //cart convert to string
return cart
}

export function addToCart(product,qty){
   
let cart=getCart(); //exiting card looking

const productIndex=cart.findIndex((prdct)=>prdct.productId===product.productId); //pass karana product Id eka cart eke thiyenawada
//if it is not exiting create a new one
if(productIndex==-1){
    cart.push(
        {
            productId:product.productId,
            name:product.name,
            altName:product.altName,
            price:product.price,
            labeledPrice:product.labeledPrice,
            image:product.images[0], 
            quantity:qty

        }
    )
}else{
    cart[productIndex].quantity+=qty
    if(cart[productIndex].quantity<=0){
        cart=cart.filter((prdct)=>prdct.productId !== product.productId)
    }
}
localStorage.setItem("cart",JSON.stringify(cart))
return cart

}

export function removeFromCart(productId)
{
    let cart=getCart();
    cart=cart.filter((product)=>product.productId !==productId)
    localStorage.setItem("cart",JSON.stringify(cart))
    return cart

    
}

export function getTotal(){
    let cart=getCart();
    let total=0;
    cart.forEach((product)=>{
        total+=product.price*product.quantity
    })
    return total
}

export function getTotalForLabeledPrice(){
    let cart=getCart();
    let total=0;
    cart.forEach((product)=>{
        total+=product.labeledPrice*product.quantity
    })
    return total
}