import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";
import { formatCurrency } from "./formatCurrency";
import image from "../../assets/image/default-product.jpg";
import { useEffect, useState } from "react";




export function CartItem({ id, quantity,name,price }) {
    const { removeFromCart,cartItems } = useShoppingCart();
    const [shopItem,setShopItem] = useState([]);
    const storeItems = useState([]);
    
    
    useEffect(() => {
        setShopItem(cartItems);
    }, [cartItems]);

    const item = shopItem.find((i) => i.id === id);

    if (item == null) return null;

    return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={image}style={{ width: "125px", height: "75px", objectFit: "cover" }}/>
        <div className="me-auto">
            <div>
                {name}{" "}
                {quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: ".68rem" }}>
                    x{quantity}
                    </span>
                )}
            </div>
            <div className="text-muted" style={{ fontSize: ".75rem" }}>
                {formatCurrency(price)}
            </div>
        </div>
        <div> {formatCurrency(price * quantity)}</div>
        <Button variant="outline-danger"size="sm" onClick={() => removeFromCart(item.idproduct)}>&times;</Button>
    </Stack>
);
}
