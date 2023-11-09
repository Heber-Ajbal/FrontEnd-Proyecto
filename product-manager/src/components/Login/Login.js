import { useState } from "react";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL_AUTH } from "../../auth/routing";
import { AuthResponse } from "../../types/Type";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
export default function Login() {

    const [username,setUsername] = useState("");
    const [password,setpassword] = useState("");
    const [errorResponse,setErrorResponse] = useState("");

    const goTo = useNavigate();
    const auth = useAuth();


    if(auth.isAuthenticated){
        return <Navigate  to="/dashboard" />
    }

	async function handleSubmit(e) {
        e.preventDefault();

		if (!username || !password) {
			Swal.fire({
				title: "ERROR",
				text: "Debe de llenar todos los campos necesarios",
				icon: "error"
			  });
			return;
		  }

		try {
			const response = await fetch(`${API_URL_AUTH}/login`, 
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					{
						"username": username,
						"password": password
					}),
			});

			if(response.ok){
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Inicio Sesion",
					showConfirmButton: false,
					timer: 1500
				  });
				const json = await response.json();
				AuthResponse.body.token = await json.token;
				AuthResponse.body.id = await json.id;
				AuthResponse.body.name = await json.username;		
				AuthResponse.body.rol = await json.rol;

				setErrorResponse("");

				if(AuthResponse.body.token){
					auth.saveUser(AuthResponse);

					console.log(AuthResponse.body.rol)

					if(AuthResponse.body.rol === "Client"){
						goTo("/store");
					}else{
						goTo("/dashboard");
					}

					
				}
			}else{
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Usuario o Contraseña incorrecta, intente de nuevo.",
					showConfirmButton: false,
					timer: 1500
				  });
				const json = await response.json();
				setErrorResponse(json.body)
				return;
			}

		} catch (error) {
			console.log(error);
		}
	}

return (
    <main class="main">
	<div class="container">
		<section class="wrapper">
			<div class="heading">
				<h1 class="text text-large">Iniciar Sesion</h1>
				<p class="text text-normal">Nuevo Usuario? <span><Link to="/signup" >Crea una nueva Cuenta</Link></span>
				</p>
			</div>
			{!!errorResponse && <div className="ErrorMessage">{errorResponse}</div>}
			<form name="signin" class="form" onSubmit={handleSubmit}>
                <div class="input-control">
                    <label for="username" class="input-label" hidden>Username</label>
                    <input type="text" name="username" id="username" class="input-field" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="input-control">
                    <label for="password" class="input-label" hidden>Password</label>
                    <input type="password" name="password" id="password" class="input-field" placeholder="Contraseña" value={password} onChange={(e) => setpassword(e.target.value)} />
                </div>
				<div class="input-control">
					<a href="/#" class="method-actionL " style={{ textDecoration: 'none' }}>		
						<button >
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2.001 11.999h14m0 0l-3.5-3m3.5 3l-3.5 3"/><path d="M9.002 7c.012-2.175.109-3.353.877-4.121C10.758 2 12.172 2 15 2h1c2.829 0 4.243 0 5.122.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.878 5.121c-.769.769-1.947.865-4.122.877M9.002 17c.012 2.175.109 3.353.877 4.121c.641.642 1.568.815 3.121.862"/></g>
							</svg>  Iniciar Sesion 
						</button>
						</a>

				</div>
				<div className="input-control">
					<a href="/#" class="text text-links">Olvide mi contraseña</a>

				</div>
			</form>
			<div class="striped">
				<span class="striped-line"></span>
				<span class="striped-text">O</span>
				<span class="striped-line"></span>
			</div>
			<div class="method">
				<div class="method-control">
					<a href="/#" class="method-action" style={{ textDecoration: 'none' }}>
						<span>
							 <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"/><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
							 </svg>  Inicia Sesion con Google
							 </span>
					</a>
				</div>
				<div class="method-control">
					<a href="/#" class="method-action" style={{ textDecoration: 'none' }}>
						<span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"/></svg> Inicia Sesion con Facebook</span>
					</a>
				</div>
				<div class="method-control">
					<a href="/#" class="method-action" style={{ textDecoration: 'none' }}>
						<span><svg xmlns="http://www.w3.org/2000/svg" width="0.82em" height="1em" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg> Inicia Sesion con Apple</span>
					</a>
				</div>
			</div>
		</section>
	</div>
	</main>
);
}
