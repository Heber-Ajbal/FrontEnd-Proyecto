import { Button, Modal, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";
import { formatCurrency } from "./formatCurrency";
import { CartItem } from "./cartItem"
import { API_URL } from "../../auth/routing";
import { useAuth } from "../../auth/AuthProvider";
import { getNumber,GetDate } from "../../helpers/productHelper";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export  function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems } = useShoppingCart();
    const [idSale,setIdSale] = useState("")
    const Auth = useAuth();    
    const [showPayment, setShow] = useState(false);   

    const goTo = useNavigate();

    const [Id,setId] = useState("");
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [dueDate,setDueDate] = useState("");
    
    const [total,setTotal] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function AddSale(){
        try {
            const numberSale = "#" + getNumber();
            const saleDate = GetDate();
            const IdUser = localStorage.getItem("ID");
            const Total = document.getElementById('total');
            const contenido = Total.textContent.trim();     

           
            handleShow();

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
                        "total": parseFloat(contenido.slice(9)),
                        "user": {"idUser":parseInt(IdUser)}
                    }),
            });


            if(response.ok){ 
                const data = await response.json();
                setIdSale(data); 
                goTo("/store");
                return <Navigate  to="/store" />
            }else{
                console.log(response)
            }
        } catch (error) {
            
        }
    }

    async function getProductId(idProduct,nQuantity){
      try {
          const response = await fetch(`${API_URL}/products/${idProduct}`,{
              headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Auth.getAccessToken()}`
              }
          });

          const data = await response.json();

          if(response.ok){
              setId(data.idproduct);
              setName(data.name);
              setPrice(data.price);
              setQuantity(data.quantity);
              setDueDate(data.dueDate);


              const newQuantity = data.quantity - nQuantity;
              console.log(newQuantity)
              updateProduct(idProduct,newQuantity,data.name,data.price,data.dueDate);

          } 
      } catch (error) {
          
      }
    }

    async function AddDetailSale(idProduct,total,quantity,idSale){
      try {
           
          const response = await fetch(`${API_URL}/detail-sale`,{
              method: 'POST',
              headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Auth.getAccessToken()}`
              },
              body: JSON.stringify(
                  {
                      "total":total,
                      "quantity" : quantity,
                      "sale": {"idSale":parseInt(idSale)},
                      "product": {"idproduct":idProduct}
                  }),
          });


          if(response.ok){
              
              

          }else{
              console.log(response)
          }
      } catch (error) {
          
      }
    }

  function MakePayment(){
    cartItems.forEach(element => {
      const total = element.quantity * element.price;
      ShowPaymant(element.idproduct,element.quantity,idSale,total,)
  });  

    window.location.reload();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Compra Exitosa!!",
      showConfirmButton: false,
      timer: 1500
      });
  }


    function ShowPaymant(idProduct,nQuantity,idSale,total){

      
      AddDetailSale(idProduct,total,nQuantity,idSale)
      getProductId(idProduct,nQuantity);


      
    }

    async function updateProduct(idProduct, NewQuantity,nameProduct,priceProduct,dueDateP){
      try {

          console.log(idProduct);
          console.log("Esta es la nueva cantidad Actualizar Producto"+NewQuantity);
          console.log(nameProduct);
          console.log(priceProduct);
          console.log(dueDateP);
          const response = await fetch(`${API_URL}/products/update`,{
              method: 'POST',
              headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Auth.getAccessToken()}`
              },
              body: JSON.stringify(
                  {
                      "idproduct": idProduct,
                      "name":nameProduct,
                      "price" : priceProduct,
                      "quantity": NewQuantity,
                      "dueDate":dueDateP,
                  }),
          });

          if(response.ok){
              
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
                            const totalSale = total + (item?.price || 0) * cartItem.quantity;
                            if(totalSale === 0){
                              setTotal(totalSale)
                              console.log(totalSale)
                            }
                            console.log(totalSale)
                            return total + (item?.price || 0) * cartItem.quantity;
                        }, 0)
                        )}
                    </div>
                    <div >
                      
                          
                          <Button onClick={AddSale} className="w-100">Proceder con el pago</Button>
                     
                        
                      
                        

                        <Modal size="xl" show={showPayment} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Pago</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
     
                            <form class="needs-validation" novalidate>
                            <h4 class="mb">Direccion de Facturacion</h4>
                              <div class="row">
                                <div class="col">
                                  <label for="firstName">Nombre</label>
                                  <input type="text" class="form-control" id="firstName" placeholder="" value="" required/>
                                  <div class="invalid-feedback">
                                    Valid first name is required.
                                  </div>
                                </div>
                                <div class="col">
                                  <label for="lastName">Apellidos</label>
                                  <input type="text" class="form-control" id="lastName" placeholder="" value="" required/>
                                  <div class="invalid-feedback">
                                    Valid last name is required.
                                  </div>
                                </div>
                              </div>

                              <div class="mb-3">
                                <label for="address">Direccion</label>
                                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required/>
                                <div class="invalid-feedback">
                                  Please enter your shipping address.
                                </div>
                              </div>

                              <div class="mb-3">
                                <label for="address2">Direccion 2 <span class="text-muted">(opcional)</span></label>
                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"/>
                              </div>
                              <hr class="mb-4"/>

                              <h4 class="mb-3">Tipo de Pago</h4>

                              <div class="d-block my-3">
                                <div class="custom-control custom-radio">
                                  <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required/>
                                  <label class="custom-control-label" for="credit">Tarjeta de Credito</label>
                                </div>
                                <div class="custom-control custom-radio">
                                  <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required/>
                                  <label class="custom-control-label" for="debit">Tarjeta de Debito</label>
                                </div>
                                <div class="custom-control custom-radio">
                                  <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required/>
                                  <label class="custom-control-label" for="paypal">PayPal</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 mb-3">
                                  <label for="cc-name">Nombre del Propietario</label>
                                  <input type="text" class="form-control" id="cc-name" placeholder="" required/>
                                  <small class="text-muted">Nombre completo que se muestra en la tarjeta</small>
                                  <div class="invalid-feedback">
                                    Name on card is required
                                  </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                  <label for="cc-number">Numero de Tarjeta</label>
                                  <input type="text" class="form-control" id="cc-number" placeholder="" required/>
                                  <div class="invalid-feedback">
                                    Credit card number is required
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-3 mb-3">
                                  <label for="cc-expiration">Fecha de expiracion</label>
                                  <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
                                  <div class="invalid-feedback">
                                    Expiration date required
                                  </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                  <label for="cc-cvv">CVV</label>
                                  <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
                                  <div class="invalid-feedback">
                                    Security code required
                                  </div>
                                </div>
                              </div>
                            </form>         
                            
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={MakePayment}>
                            Realizar Compra
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                </Stack>
            </Offcanvas.Body> 
        </Offcanvas>


        

    );
}
