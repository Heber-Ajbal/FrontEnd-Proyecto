import { useState } from "react";
import "../Login/login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL_AUTH } from "../../auth/routing";
import Swal from "sweetalert2";
export default function SignUp() {

    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [errorResponse,setErrorResponse] = useState("");
    
    const auth = useAuth();
    const goTo = useNavigate();


    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!userName || !password || !email) {
			Swal.fire({
				title: "ERROR",
				text: "Debe de llenar todos los campos necesarios",
				icon: "error"
			  });
			return;
		  }

    try {
    const response = await fetch(`${API_URL_AUTH}/signup`, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                "userName": userName,
                "password": password,
                "email": email,
            }),
    });

    if(response.ok){
        console.log("User created successfully!!");
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario Creado Exitosamente!!",
            showConfirmButton: false,
            timer: 1500
          });
        setErrorResponse("");
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
    <main className="main">
        <div className="container">
        <section className="wrapper">
            <div className="heading">
            <h1 className="text text-large">Registrar</h1>
            <p className="text text-normal">Ya tienes una cuenta?{" "} <span> <Link to="/">Inicia Sesion</Link></span> </p>
            </div>
            {!!errorResponse && <div className="ErrorMessage">{errorResponse}</div>}
            <form name="signin" className="form" onSubmit={handleSubmit}>
                <div className="input-control">
                <label for="email" className="input-label" hidden> Email Address </label>
                <input type="email" name="email" id="email" class="input-field" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-control">
                <label for="username" className="input-label" hidden> Username </label>
                <input type="text" name="username" id="username" class="input-field" placeholder="username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-control">
                <label for="password" class="input-label" hidden>  Password </label>
                <input type="password" name="password" id="password" class="input-field" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
            <div class="input-control">
            <a href="/#" class="method-actionL " style={{ textDecoration: 'none' }}>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M256 136a12 12 0 0 1-12 12h-8v8a12 12 0 0 1-24 0v-8h-8a12 12 0 0 1 0-24h8v-8a12 12 0 0 1 24 0v8h8a12 12 0 0 1 12 12Zm-54.81 56.28a12 12 0 1 1-18.38 15.44C169.12 191.42 145 172 108 172c-28.89 0-55.46 12.68-74.81 35.72a12 12 0 0 1-18.38-15.44a124.08 124.08 0 0 1 48.69-35.75a72 72 0 1 1 89 0a124 124 0 0 1 48.69 35.75ZM108 148a48 48 0 1 0-48-48a48.05 48.05 0 0 0 48 48Z"/></svg> Registrarse </button>
                </a>	
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
