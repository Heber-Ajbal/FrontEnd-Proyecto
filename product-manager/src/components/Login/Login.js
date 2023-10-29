import { useState } from "react";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL_AUTH } from "../../auth/routing";
import { AuthResponse } from "../../types/Type";
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
        console.log("Login successfully!!");
		const json = await response.json();
		AuthResponse.body.token = await json.token;
		AuthResponse.body.id = await json.id;
		AuthResponse.body.name = await json.username;
        setErrorResponse("");

		if(AuthResponse.body.token){
			auth.saveUser(AuthResponse);
			goTo("/dashboard");
		}

        goTo("/");
    }else{
        console.log("Something went wrong")
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
                    <input type="text" name="username" id="username" class="input-field" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="input-control">
                    <label for="password" class="input-label" hidden>Password</label>
                    <input type="password" name="password" id="password" class="input-field" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                </div>
				<div class="input-control">
					<a href="/#" class="text text-links">Olvide mi contraseña</a>
					<button> Iniciar Sesion </button>
				</div>
			</form>
			<div class="striped">
				<span class="striped-line"></span>
				<span class="striped-text">O</span>
				<span class="striped-line"></span>
			</div>
			<div class="method">
				<div class="method-control">
					<a href="/#" class="method-action">
						<i class="ion ion-logo-google"></i>
						<span>Inicia Sesion con Google</span>
					</a>
				</div>
				<div class="method-control">
					<a href="/#" class="method-action">
						<i class="ion ion-logo-facebook"></i>
						<span>Inicia Sesion con Facebook</span>
					</a>
				</div>
				<div class="method-control">
					<a href="/#" class="method-action">
						<i class="ion ion-logo-apple"></i>
						<span>Inicia Sesion con Apple</span>
					</a>
				</div>
			</div>
		</section>
	</div>
	</main>
);
}
