import "./navBarLayout.css"

export default function NavBarLayout({ children }) {
    return(
<>
<div class="nav">
  <input type="checkbox" id="nav-check"/>
  <div class="nav-header">
    <div class="nav-title">
      PRODUCTOS :D
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
    <a href="//github.io/jo_geek" >Inicio</a>
    <a href="/http://stackoverflow.com/users/4084003/" >Usuarios</a>
    <a href="/https://in.linkedin.com/in/jonesvinothjoseph" >Ventas</a>
    <a href="/https://jsfiddle.net/user/jo_Geek/" >Perfil</a>
    <a href="/https://codepen.io/jo_Geek/">Cerrar Sesion</a>
    
  </div>
</div>

        <main> {children}</main>
</>
    );

}