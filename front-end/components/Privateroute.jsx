import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token"); // vérifie si un token est présent dans le local storage

    if (!token) {
        // pas de token -> redirection vers /login
        return <Navigate to="/login" replace />;
    }

    // token présent -> rendre les enfants protégés
    return children;
}