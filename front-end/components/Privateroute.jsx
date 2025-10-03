import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");//verifie si un token est token est present dans le local storage
    return token ? children : <Navigate to={"/login"}/>;
}