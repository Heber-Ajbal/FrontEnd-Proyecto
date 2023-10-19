import { useState } from "react";
import "../Login/login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL_AUTH } from "../../auth/routing";
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
    <main class="main">
        <div class="container">
        <section class="wrapper">
            <div class="heading">
            <h1 class="text text-large">Registrar</h1>
            <p class="text text-normal">Ya tienes una cuenta?{" "} <span> <Link to="/">Inicia Sesion</Link></span> </p>
            </div>
            {!!errorResponse && <div className="ErrorMessage">{errorResponse}</div>}
            <form name="signin" class="form" onSubmit={handleSubmit}>
                <div class="input-control">
                <label for="email" class="input-label" hidden> Email Address </label>
                <input type="email" name="email" id="email" class="input-field" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="input-control">
                <label for="username" class="input-label" hidden> Username </label>
                <input type="text" name="username" id="username" class="input-field" placeholder="username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="input-control">
                <label for="password" class="input-label" hidden>  Password </label>
                <input type="password" name="password" id="password" class="input-field" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
            <div class="input-control">
                <button> Registrarse </button>
            </div>
            </form>
            <div class="striped">
                <span class="striped-line"></span>
                <span class="striped-text">O</span>
                <span class="striped-line"></span>
            </div>
            <div class="method">
            <div class="method-control">
                <a href="/#" class="method-action"> <i class="ion ion-logo-google"></i> <span>Registrarse con Google</span></a> </div>
            <div class="method-control">
                <a href="/#" class="method-action"> <i class="ion ion-logo-facebook"></i> <span>Registrarse con Facebook</span> </a>
            </div>
            <div class="method-control">
                <a href="/#" class="method-action"> <i class="ion ion-logo-apple"></i> <span>Registrarse con Apple</span> </a>
            </div>
            </div>
        </section>
    </div>
    </main>
);
}
