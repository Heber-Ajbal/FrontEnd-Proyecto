import { Link } from "react-router-dom";
import NavBarLayout from "../../layout/NavbarLayout";
import "./dashboard.css"

export default function Dashboard(){
    return(
    
        <NavBarLayout>
        <div class="container">
        <div class="row row-cols-3">
            <div class="col">
                <a href="/#">
                    <div class="card">
                        <div class="image-box card2">
                            <div class="text-container">
                                <span class="subtitle">Usuarios<i class="fa fa-angle-double-down"></i></span>
                                <p>Podra gestionar los usuarios que acualmente estan registrados.</p>
                            </div>
                            <Link to="/usersM"><div class="button-down" >
                                <span  >Ver</span>
                            </div></Link>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col">
                <a href="/#">
                    <div class="card">
                        <div class="image-box card3">
                            <div class="text-container">
                                <span class="subtitle">Ventas<i class="fa fa-angle-double-down"></i></span>
                                <p>Podra verificar todas las transacciones que se han realizado de los prouductos.</p>
                            </div>
                            <Link to="/sales">
                                <div class="button-down" >
                                    <span  >Ver</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col">
                <a href="/#">
                    <div class="card">
                        <div class="image-box card1">
                            <div class="text-container">
                                <span class="subtitle">Productos<i class="fa fa-angle-double-down"></i></span>
                                <p>Podra gestionar todos los productos que actualmente estan registrados.</p>
                            </div>
                            <Link to="/product"><div class="button-down" >
                                <span  >Ver</span>
                            </div></Link> 
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>            
        </NavBarLayout>
    );
    
}