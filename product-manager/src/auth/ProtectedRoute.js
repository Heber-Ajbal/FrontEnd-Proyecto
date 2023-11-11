import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";


export default function ProtectedRoute(){
    
    const auth = useAuth();

    return auth.isAuthenticated ? (<Outlet/>) : <Navigate to="/"/>
}