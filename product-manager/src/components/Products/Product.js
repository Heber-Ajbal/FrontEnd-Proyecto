import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/routing"
import NavBarLayout from "../../layout/NavbarLayout";
import DataTable from "react-data-table-component";
import { Button, Form, Modal } from "react-bootstrap";

export default function Dashboard(){

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter] = useState([]);
    const [showUpdate, setShow] = useState(false);    
    const [showCreate, setShowCreate] = useState(false);

    const [Id,setId] = useState("");
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [dueDate,setDueDate] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowCreate(false);
    const handleShowAdd = () => setShowCreate(true);
    const Auth = useAuth();

    const colums = [
        {
            name:'Id',
            selector: row => row.idproduct,
            sortable: true
        },
        {
            name:'Nombre Producto',
            selector: row => row.name,
            sortable: true
        },
        {
            name:'Precio',
            selector: row => row.price,
            sortable: true
        },
        {
            name:'Cantidad',
            selector: row => row.quantity,
            sortable: true
        },
        {
            name:'Fecha de Vencimiento',
            selector: row => row.dueDate,
            sortable: true
        },
        {
            name:"Acciones",
            cell:(row)=>(
                <div>
                    <Button variant="danger" onClick={()=>deleteProduct(row.idproduct)}>Delete</Button>{' '}
                    <Button variant="primary" onClick={() =>getProductId(row.idproduct)}>Update</Button>


                    {/* MODAL TO UPDATE THE PRODUCT */}
                    <Modal show={showUpdate} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Datos del Producto: {product.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID</Form.Label>
                            
                                <Form.Control
                                    type="text"
                                    value={product.idproduct}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="dueDate">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name ="dueDate"
                                    value={dueDate}
                                    autoFocus
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Form.Group>                            
                            
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateProduct}>
                            Actualizar Producto
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* END THE MODAL TO UPDATE DE PRODUCT */}
                </div>        
            )
            
        }
    ]  

    useEffect(()=>{getProducts();}, []);

    useEffect(()=>{
        const result= products.filter((item)=>{
            const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
            const idMatch = item.idproduct.toString().includes(search.toLowerCase());
            return nameMatch || idMatch;
        });
        setFilter(result);
    },[search]);

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
                setProducts(data)
                setFilter(data);
            }
        } catch (error) {
            
        }
    }

    async function getProductId(idProduct){
        try {
            const response = await fetch(`${API_URL}/products/${idProduct}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            const data = await response.json();

            if(response.ok){
                console.log(data);
                setProduct(data);
                setId(data.idproduct);
                setName(data.name);
                setPrice(data.price);
                setQuantity(data.quantity);
                setDueDate(data.dueDate);
                handleShow();
            }
        } catch (error) {
            
        }
    }

    async function deleteProduct(idProduct){
        try {
            const response = await fetch(`${API_URL}/products/delete/${idProduct}`,{
                method: 'DELETE',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            if(response.ok){
                getProducts();
                alert("Producto eliminado correctamente");
            }
        } catch (error) {
            
        }
    }

    async function updateProduct(){
        try {
            const response = await fetch(`${API_URL}/products/update`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                },
                body: JSON.stringify(
                    {
                        "idproduct": Id,
                        "name":name,
                        "price" : price,
                        "quantity": quantity,
                        "dueDate":dueDate,
                    }),
            });

            if(response.ok){
                getProducts();
                alert("Producto Actualizado correctamente");
                handleClose()
            }
        } catch (error) {
            
        }
    }

    async function AddProduct(){
        try {
            const response = await fetch(`${API_URL}/products/add`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                },
                body: JSON.stringify(
                    {
                        "name":name,
                        "price" : price,
                        "quantity": quantity,
                        "dueDate":dueDate,
                    }),
            });

            if(response.ok){
                getProducts();
                handleCloseAdd()
                alert("Producto Agregado correctamente");
                
            }
        } catch (error) {
            
        }
    }

    function cleanFieldsAdd(){
        setId("");
        setName("");
        setPrice("");
        setQuantity("");
        setDueDate("");
        handleShowAdd();
    }

    return (
        <NavBarLayout>
            <div class = "container text-center">
                <div class="col">
                    <DataTable
                        columns={colums}
                        data={filter}
                        pagination
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        actions={
                            <div>
                                <Button variant="outline-success" onClick={cleanFieldsAdd}>Agregar Producto</Button>{' '}
                                <Button variant="outline-info" >Generar PDF</Button>{' '}

                                 {/* MODAL TO Create THE PRODUCT */}
                                <Modal show={showCreate} onHide={handleCloseAdd}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Agregar Producto</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Nombre</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Cantidad</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                        <Form.Label>Precio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dueDate">
                                        <Form.Label>Fecha de Vencimiento</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name ="dueDate"
                                                value={dueDate}
                                                autoFocus
                                                onChange={(e) => setDueDate(e.target.value)}
                                            />
                                        </Form.Group>                            
                                        
                                    </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseAdd}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={AddProduct}>
                                        Agreagar Producto
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                    {/* END THE MODAL TO Create DE PRODUCT */}

                            </div>
                        }
                        subHeader
                        subHeaderComponent={
                            <div class="col">

                            <input type="text"
                                class="w-25 form-control"
                                placeholder="Buscar Producto..."
                                value={ search}
                                onChange={(e)=>SetSearch(e.target.value)}
                            />
                            </div>
                        }
                        subHeaderAlign="left"
                    
                    />
                </div>


                
            </div>
        </NavBarLayout>
    );
}