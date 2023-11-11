import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isAuthenticated: false,
    saveuser: ()=>{},
    getAccessToken: ()=>{},
    SingOut: () =>{},
});

export function AuthProvider({children}){

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    
    useEffect(()=>{checkAuth();})

    async function checkAuth(){                
            const token = getAccessToken();
            if(token){
                setIsAuthenticated(true);
            }
        
    }

    function getAccessToken(){
        const tokenData = localStorage.getItem("token");
        if(tokenData){
            return JSON.parse(tokenData);
        }
        return null;
    }

    function saveUser(AuthResponse){
        localStorage.setItem("token",JSON.stringify(AuthResponse.body.token));
        localStorage.setItem("ID",JSON.stringify(AuthResponse.body.id));        
        localStorage.setItem("Rol",JSON.stringify(AuthResponse.body.rol));
        setIsAuthenticated(true);
    }

    function SingOut(){
        setIsAuthenticated(false);
        localStorage.removeItem("ID")        
        localStorage.removeItem("token")
        localStorage.removeItem("Rol")
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,saveUser,getAccessToken,SingOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);