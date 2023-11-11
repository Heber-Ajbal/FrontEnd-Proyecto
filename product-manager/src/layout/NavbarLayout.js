import { Container, Nav, Navbar } from "react-bootstrap";
import "./navBarLayout.css"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../auth/AuthProvider";

export default function NavBarLayout({ children }) {

    const auth = useAuth();
   
    function SingOut(e){
        e.preventDefault();

        auth.SingOut();
    }
    return(
<>

<Navbar bg="dark" expand="md" variant="dark">

      <div className="container-fluid">
      
        <Navbar.Brand href="/#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
        
          <Nav className="ms-md-auto gap-2">
            <Nav.Link href="/#" className="rounded" active>
              Dasboard
            </Nav.Link>
            <Nav.Link href="/#" className="rounded">
              Ver Perfil
            </Nav.Link>
            <Nav.Link href="/#" className="rounded" onClick={SingOut}>
              Cerrar Sesion
            </Nav.Link>
           
          </Nav>
          
        </Navbar.Collapse>
        
      </div>
      
    </Navbar>
    <main> {children}</main>
 
</>
    );

}