import { Container, Nav, Navbar } from "react-bootstrap";
import "./navBarLayout.css"
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBarLayout({ children }) {
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
            <Nav.Link href="/#" className="rounded">
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