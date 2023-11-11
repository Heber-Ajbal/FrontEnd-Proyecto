import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/routing"
import NavBarLayout from "../../layout/NavbarLayout";
import DataTable from "react-data-table-component";
import { Button, Container, Form, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import "jspdf-autotable"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function Product(){

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

    
    const [pending, setPending] = useState(true);
    const [columns, setColumns] = useState([]);

    const colums = [
        {
            name:'Id',
            selector: row => row.idproduct,
            sortable: true,
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
                <div className="text-center">
                    
                    <Button variant="danger" onClick={()=>message(row.idproduct)}>Delete</Button>{' '}
                    <Button variant="primary" onClick={() =>getProductId(row.idproduct)}>Update</Button>{' '}


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
                               {/* <Form.Control
                                    type="text"
                                    name ="dueDate"
                                    value={dueDate}
                                    autoFocus
                                    onChange={(e) => setDueDate(e.target.value)}
                                /> */}

<br/>
                                            <DatePicker selected={dueDate}
                                            onChange={ date=>setDueDate(date)}
                                            dateFormat="dd-MM-yyyy"
                                        // isClearable
                                            showYearDropdown
     
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
                const fecha = new Date(data.dueDate);
                const fechaFormateada = format(fecha, 'dd-MM-yyyy');
                //setDueDate(fechaFormateada);
                console.log(fechaFormateada)
                handleShow();
            }
        } catch (error) {
            
        }
    }

    function message(idProduct){
        Swal.fire({
            title: "¿Está seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(idProduct);
            }
          });
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
                Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Producto Eliminado!!",
					showConfirmButton: false,
					timer: 1500
				  });
                getProducts();                

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
                Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Producto Actualizado!!",
					showConfirmButton: false,
					timer: 1500
				  });
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
                Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Producto Agregado!!",
					showConfirmButton: false,
					timer: 1500
				  });
                handleCloseAdd()

                
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

    const generatePDF = () => {

        const doc = new jsPDF();
        const columnsPDF = [{
            header:'Id',
            dataKey: 'idproduct'
        },
        {
            header:'Nombre Producto',
            dataKey: 'name'
        },
        {
            header:'Precio',
            dataKey: 'price'
        },
        {
            header:'Cantidad',
            dataKey: 'quantity'
        },
        {
            header:'Fecha de Vencimiento',
            dataKey: 'dueDate'
        }]   
        const dataPDF = products;


        doc.autoTable({
            columns: columnsPDF,
            body: dataPDF
        });

        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Suma 1 al mes porque los meses en JavaScript van de 0 a 11
        const day = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${year}-${month}-${day}`;

        doc.save(`Repoerte de Productos ${fechaFormateada}.pdf`);
    }

    return (
        <NavBarLayout>  
            <Container fluid="md">

                  
            <div class = "text-center">
                <br/><br/>
                <h1>Productos</h1>
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
                                <Button variant="outline-info" onClick={generatePDF}>Generar PDF</Button>{' '}

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
                                            {/* <Form.Control
                                                type="text"
                                                name ="dueDate"
                                                value={dueDate}
                                                autoFocus
                                                onChange={(e) => setDueDate(e.target.value)}
                                            /> */}
                                            <br/>
                                            <DatePicker selected={ dueDate}
                                            onChange={ date=>setDueDate(date)}
                                            dateFormat="dd-MM-yyyy"
                                            //minDate={ new Date()}
                                            //maxDate={ new Date()}
                                            //filterDate={ date=>date.getDay()!=6 && date.getDay()!=0}
                                        // isClearable
                                            showYearDropdown
     
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
            </Container>    
        </NavBarLayout>
    );
}