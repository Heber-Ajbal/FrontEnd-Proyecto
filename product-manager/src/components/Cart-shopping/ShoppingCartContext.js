import { createContext, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "./shoppingCart";
import { API_URL } from "../../auth/routing";
import { useAuth } from "../../auth/AuthProvider";

const CartItem = {
    idproduct: 0,
    quantity: 0,
    quantityTotal: 0,
};

const Productitem={
    idproduct: 0,
    quantity: 0,
}

const ShoppingCartContext = createContext({
    openCart: () => {},
    closeCart: () => {},
    getItemQuantity: (id) => 0,
    increaseCartQuantity: (id) => {},
    decreaseCartQuantity: (id) => {},
    removeFromCart: (id) => {},
    cartQuantity: 0,
    cartItems: Productitem,

});


export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}){
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    const [addProduct, setAddProduct] = useState([]);
    const Auth = useAuth();
    const[isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
        getProducts()    
    }, []);
    
    async function getProducts(){
        try {
            const response = await fetch(`${API_URL}/products`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });
    
            const data = await response.json();
            console.log("Funciona");
    
            if(response.ok){
                setProduct(data);
            }
        } catch (error) {
            
        }
    }
    

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity,0);

    function openCart(){                
        setIsOpen(true);  
        console.log("Verdadero");
    }
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id) {
        return cartItems.find(item => item.idproduct === id)?.quantity || 0
    }

    function increaseCartQuantity(id) {
        const foundProduct = product.find(product => product.idproduct === id);
    
        if (foundProduct) {
          const updatedCartItems = [...cartItems];
          const itemIndex = updatedCartItems.findIndex(item => item.idproduct === id);
    
          if (itemIndex !== -1) {
            updatedCartItems[itemIndex] = {
              ...foundProduct,
              quantity: updatedCartItems[itemIndex].quantity + 1
            };
          } else {
            updatedCartItems.push({ ...foundProduct, quantity: 1, key: foundProduct.idproduct });
          }
    
          setCartItems(updatedCartItems);
        }
        
      }

    function decreaseCartQuantity(id){
        setCartItems(currentItem =>{
            if(currentItem.find(item => item.idproduct === id)?.quantity === 1){
                return currentItem.filter(item => item.idproduct !== id)
            }else{
                return currentItem.map(item =>{
                    if(item.idproduct === id){
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item;
                    }
                })
            }
        })

    }

    function removeFromCart(id){
        setCartItems(currentItem =>{
            return currentItem.filter(item => item.idproduct!== id);
        })
    }

    return(
        <ShoppingCartContext.Provider value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartQuantity,
                cartItems
            }}>
            {children}
            <ShoppingCart isOpen={isOpen}>

            </ShoppingCart>
        </ShoppingCartContext.Provider>
    )
}
//export const useShoppingCart = () => useContext(ShoppingCartContext);

