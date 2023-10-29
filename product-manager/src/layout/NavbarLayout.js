import "./navBarLayout.css"
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBarLayout({ children }) {
    return(
<>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-md-auto gap-2">
        <li class="nav-item rounded">
          <a class="nav-link active" aria-current="page" href="/#"><i class="bi bi-house-fill me-2"></i>Home</a>
        </li>
        <li class="nav-item rounded">
          <a class="nav-link" href="/#"><i class="bi bi-people-fill me-2"></i>About</a>
        </li>
        <li class="nav-item rounded">
          <a class="nav-link" href="/#"><i class="bi bi-telephone-fill me-2"></i>Contact</a>
        </li>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
      </ul>
    </div>
  </div>
</nav>
 <main> {children}</main>
</>
    );

}