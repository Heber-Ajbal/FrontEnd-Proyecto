import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/routing"
import NavBarLayout from "../../layout/NavbarLayout";
import DataTable from "react-data-table-component";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "jspdf-autotable"

export default function User(){

    const [users, setusers] = useState([]);
    const [user, setuser] = useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter] = useState([]);
    const [showUpdate, setShow] = useState(false);    
    const [showCreate, setShowCreate] = useState(false);

    const [Id,setId] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [rol,setRol] = useState("");
    const [password,setPassword] = useState("");

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
            selector: row => row.idUser,
            sortable: true,
            omit:true
        },
        {
            name:'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            name:'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name:'Rol',
            selector: row => row.rol,
            sortable: true
        },
        {
            name:"Acciones",
            cell:(row)=>(
                <div >
                    <Button variant="danger" onClick={()=>deleteUser(row.idUser)}>Delete</Button>{' '}
                    <Button variant="primary" onClick={() =>getUserId(row.idUser)}>Ver</Button>


                    {/* MODAL TO UPDATE THE PRODUCT */}
                    <Modal show={showUpdate} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Datos del Usuario: {user.username}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID</Form.Label>
                            
                                <Form.Control
                                    type="text"
                                    value={user.idUser}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </Form.Group>                         
                            <Form.Group className="mb-3" controlId="dueDate">
                                        <Form.Label>Rol</Form.Label>
                                            <Form.Select value={rol} onChange={(e) => setRol(e.target.value)} disabled>
                                                <option>Seleccione un Rol</option>
                                                <option  value="ADMIN"  >Administrador</option>
                                                <option  value="Client" >Cliente</option>
                                            </Form.Select>
                                        </Form.Group>                              
                            
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* END THE MODAL TO UPDATE DE PRODUCT */}
                </div>        
            )
            
        }
    ]  

    useEffect(()=>{getUsers();}, []);

    useEffect(()=>{
        const result= users.filter((item)=>{
            const nameMatch = item.username.toLowerCase().includes(search.toLowerCase());
            const emailMatch = item.email.toLowerCase().includes(search.toLowerCase());
            return nameMatch || emailMatch;
        });
        setFilter(result);
    },[search]);

    useEffect(() => {
		const timeout = setTimeout(() => {
            
            const colums = [
                {
                    name:'Id',
                    selector: row => row.idUser,
                    sortable: true,
                    omit:true
                },
                {
                    name:'Username',
                    selector: row => row.username,
                    sortable: true
                },
                {
                    name:'Email',
                    selector: row => row.email,
                    sortable: true
                },
                {
                    name:'Rol',
                    selector: row => row.rol,
                    sortable: true
                },
                {
                    name:"Acciones",
                    cell:(row)=>(
                        <div >
                            <Button variant="danger" onClick={()=>deleteUser(row.idUser)}>Delete</Button>{' '}
                            <Button variant="primary" onClick={() =>getUserId(row.idUser)}>Ver</Button>
        
        
                           
                        </div>        
                    )
                    
                }
            ]  
            setColumns(colums);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

    async function getUsers(){
        try {
            const response = await fetch(`${API_URL}/users`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            const data = await response.json();

            if(response.ok){
                setusers(data)
                setFilter(data);
            }
        } catch (error) {
            
        }
    }

    async function getUserId(idUser){
        try {
            const response = await fetch(`${API_URL}/users/${idUser}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            const data = await response.json();

            if(response.ok){
                setuser(data);
                setId(data.idUser);
                setUsername(data.username);
                setEmail(data.email);
                setRol(data.authorities[0].authority);
                setPassword(data.password);
                handleShow();
            }
        } catch (error) {
            
        }
    }

    async function deleteUser(idUser){
        try {
            const response = await fetch(`${API_URL}/users/${idUser}`,{
                method: 'DELETE',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                }
            });

            if(response.ok){
                getUsers();
                alert("Usuario eliminado correctamente");
            }
        } catch (error) {
            
        }
    }

    async function updateUser(){
        try {
            const response = await fetch(`${API_URL}/users/update`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                },
                body: JSON.stringify(
                    {
                        "idUser": Id,
                        "username":username,
                        "email" : email,
                        "rol": rol,
                        "password":password,
                    }),
            });

            if(response.ok){
                getUsers();
                alert("Usuario Actualizado correctamente");
                handleClose()
            }
        } catch (error) {
            
        }
    }

    async function AddUser(){
        try {

            console.log(username);
            console.log(email);
            console.log(rol);
            console.log(password);

            const response = await fetch(`${API_URL}/users/add`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Auth.getAccessToken()}`
                },
                body: JSON.stringify(
                    {
                        "username":username,
                        "email" : email,
                        "password": password,
                        "rol":rol,
                    }),
            });

            if(response.ok){
                getUsers();
                handleCloseAdd()
                alert("Usuario Agregado correctamente");
                
            }
        } catch (error) {
            
        }
    }

    function cleanFieldsAdd(){
        setId("");
        setUsername("");
        setEmail("");
        setRol("");
        setPassword("");
        handleShowAdd();
    }


    return (
        <NavBarLayout>
            <Container fluid="md">  
            <div class = "text-center">
            <br/><br/>
            <h1>Usuario</h1>
                <div class="col">
                    <DataTable
                        columns={columns}
                        progressPending={pending}
                        data={filter}
                        pagination
                        fixedHeader
                        selectableRowsHighlight
                        highlightOnHover
                        actions={
                            <div>
                                <Button variant="outline-success" onClick={cleanFieldsAdd}>Agregar Usuario</Button>{' '}

                                 {/* MODAL TO Create THE User */}
                                <Modal show={showCreate} onHide={handleCloseAdd}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Datos del Usuario</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Email</Form.Label>
                                            <Form.Control
                                               type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                        <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dueDate">
                                        <Form.Label>Rol</Form.Label>
                                            <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                                                <option>Seleccione un Rol</option>
                                                <option value="ADMIN" >Administrador</option>
                                                <option value="Client">Cliente</option>
                                            </Form.Select>
                                        </Form.Group>                            
                                        
                                    </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseAdd}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" onClick={AddUser}>
                                        Agreagar Usuario
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                    {/* END THE MODAL TO Create DE User */}

                            </div>
                        }
                        subHeader
                        subHeaderComponent={
                            <div class="col">

                            <input type="text"
                                class="w-25 form-control"
                                placeholder="Buscar Usuario..."
                                value={ search}
                                onChange={(e)=>SetSearch(e.target.value)}
                            />
                            </div>
                        }
                        subHeaderAlign="left"
                    
                    />
                </div>


                 {/* MODAL TO UPDATE THE PRODUCT */}
                 <Modal show={showUpdate} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Datos del Usuario: {user.username}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>ID</Form.Label>
                                    
                                        <Form.Control
                                            type="text"
                                            value={user.idUser}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                    </Form.Group>                         
                                    <Form.Group className="mb-3" controlId="dueDate">
                                                <Form.Label>Rol</Form.Label>
                                                    <Form.Select value={rol} onChange={(e) => setRol(e.target.value)} disabled>
                                                        <option>Seleccione un Rol</option>
                                                        <option  value="ADMIN"  >Administrador</option>
                                                        <option  value="Client" >Cliente</option>
                                                    </Form.Select>
                                                </Form.Group>                              
                                    
                                </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* END THE MODAL TO UPDATE DE PRODUCT */}
            </div>
            </Container>
        </NavBarLayout>
    );
}