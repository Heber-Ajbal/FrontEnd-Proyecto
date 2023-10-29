import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";
import { formatCurrency } from "./formatCurrency";
import { CartItem } from "./cartItem"
import { API_URL } from "../../auth/routing";
import { useAuth } from "../../auth/AuthProvider";
import { getNumber,GetDate } from "../../helpers/productHelper";
import { useState } from "react";

export  function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems } = useShoppingCart();
    const [idSale,setIdSale] = useState("")
    const Auth = useAuth();
    


    async function AddDetailSale(){
        try {
            const numberSale = "#" + getNumber();
            const saleDate = GetDate();
            const IdUser = localStorage.getItem("ID");
            const Total = document.getElementById('total');
            const contenido = Total.textContent.trim();

            const response = await fetch(`${API_URL}/sales`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                },
                body: JSON.stringify(
                    {
                        "numberSale":numberSale,
                        "saleDate" : saleDate,
                        "total": parseFloat(contenido.slice(7)),
                        "idUser":IdUser,
                    }),
            });


            if(response.ok){
                alert("Funciona")
                

                
            }
        } catch (error) {
            
        }
    }

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Productos Seleccionados</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.idproduct} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5" id="total">
                        Total{" "}
                        {formatCurrency(
                        cartItems.reduce((total, cartItem) => {
                            const item = cartItems.find((i) => i.idproduct === cartItem.idproduct);
                            return total + (item?.price || 0) * cartItem.quantity;
                        }, 0)
                        )}
                    </div>
                    <div >
                        <Button onClick={AddDetailSale} className="w-100">Proceder con el pago</Button>
                    </div>
                </Stack>
            </Offcanvas.Body> 
        </Offcanvas>
    );
}
