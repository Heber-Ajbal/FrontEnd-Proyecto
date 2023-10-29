import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isAuthenticated: false,
    saveuser: ()=>{},
    getAccessToken: ()=>{},
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
        console.log(AuthResponse.body);
        setIsAuthenticated(true);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,saveUser,getAccessToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);