import { Button, Card } from "react-bootstrap";
import image from "../../assets/image/default-product.jpg"
import { formatCurrency } from "./formatCurrency";
import { useShoppingCart } from "./ShoppingCartContext";


export function StoreItem({idproduct,name,price}){

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      } = useShoppingCart()

    const quantityTotal = getItemQuantity(idproduct);

    return(
        <Card className="h-100">
            <Card.Img
                variant = "top"
                src={image}
                height = "200px"
                style={{objectFit:"cover"}} 
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>

                <div className="mt-auto">
                    {quantityTotal === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(idproduct)}>+ Agregar al Carrito</Button>
                    ):
                    <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button onClick={() => decreaseCartQuantity(idproduct)}>-</Button>
                            <div>
                                <span className="fs-3">{quantityTotal}</span> en la Cesta
                            </div>
                            <Button onClick={() => increaseCartQuantity(idproduct)}>+</Button>
                        </div>
                    <Button onClick={() => removeFromCart(idproduct)} variant="danger" size="sm"> Eliminar </Button>
                  </div>}
                </div>

            </Card.Body>
        </Card>
    )
}