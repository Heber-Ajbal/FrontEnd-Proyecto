import { Col, Row } from "react-bootstrap";
import { StoreItem } from "./StoreItem";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/routing";
import { useEffect, useState } from "react";
import NavBarUserLayout from "../../layout/navBarUserLayout";
import { ShoppingCartProvider } from "./ShoppingCartContext";
// import { DataProduct } from "../../helpers/productHelper";

export default function Store(){

    const Auth = useAuth();
    const [products, setProducts] = useState([]);

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
            console.log(data);

            if(response.ok){
                setProducts(data);
            }
        } catch (error) {
            
        }
    }

    return(
    
        <ShoppingCartProvider>
        <NavBarUserLayout>
            
                <Row md={2} xs={1} lg={3} className="g-3">
                    {products.map(item => (
                        <Col key={item.idproduct}>
                            <StoreItem {...item}
                                
                            />
                        </Col>
                    ))}

                </Row>    
        </NavBarUserLayout>
        </ShoppingCartProvider>
    );
    
}