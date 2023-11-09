import { Link } from "react-router-dom";
import NavBarLayout from "../../layout/NavbarLayout";
import "./dashboard.css"
import { Button } from "react-bootstrap";
import user from "../../assets/image/users.jpg";
import sale from "../../assets/image/sales.jpg";
import product from "../../assets/image/products.jpg";

export default function Dashboard(){
    return(
    
        <NavBarLayout>

<div class="page-wrapper">
 <div class="nav-wrapper">
  <div class="grad-bar"></div>
  </div>
  <section class="headline">
    <h1>Bienvenidos</h1>
    <p>Podra Gestionar sus Ventas,Productos y Clientes!</p>
  </section>
  <section class="features">
    <div class="feature-container">
      <img src={user} alt="Flexbox Feature" className="img-fluid custom-image"/>
      <h2>Usuario</h2>
      <p>Podra llevar el control de todos los usuarios que acualmente estan registrados.</p>
      <Link to="/usersM">
            <Button variant="outline-info" size="md" className="w-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"/></svg>Ver
                </Button>
        </Link> 
    </div>
    <div class="feature-container">
      <img src={sale} alt="Flexbox Feature" className="img-fluid custom-image"/>
      <h2>sales</h2>
      <p>Podra verificar todas las transacciones que se han realizado de los prouductos.</p>
      <Link to="/store">
            <Button variant="outline-info" size="md" className="w-100"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M403.3 32H285.1c-3.7 0-7.2 1.5-9.8 4.1L40.1 272.2c-10.8 10.8-10.8 28.4 0 39.2l111.5 112.5C162.4 434.7 179 440 195 426l231.9-232.3c2.6-2.6 4.1-6.1 4.1-9.8V59.7c0-15.3-12.4-27.7-27.7-27.7zm-45.9 107.5c-19.6 2.1-36-14.4-33.9-33.9 1.5-14.3 13-25.7 27.3-27.3 19.6-2.1 36 14.4 33.9 33.9-1.5 14.3-13 25.8-27.3 27.3z" fill="currentColor"/><path d="M456 80.3V194c0 3.7-1.5 7.2-4.1 9.8L192.7 463l8.8 8.8c10.8 10.8 28.4 10.8 39.2 0l235.2-236.2c2.6-2.6 4.1-6.1 4.1-9.8V107.7c0-14-10.5-25.6-24-27.4z" fill="currentColor"/></svg> Ver</Button>
        </Link> 
    </div>
    <div class="feature-container ">
        <img src={product} alt="Flexbox Feature" className="custom-image img-fluid " />
        <h2>Productos</h2>
        <p>Podra llevar el control de todos los productos que actualmente estan registrados.                                                          </p>
        
        <Link to="/product">
            <Button variant="outline-info" size="md" className="w-100"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121l-241-120l-241 120l241 121z"/></svg>{' '}  Ver</Button>
        </Link> 
    </div>

  </section>
</div>
        </NavBarLayout>
    );
    
}