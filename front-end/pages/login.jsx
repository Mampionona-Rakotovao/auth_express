import { useState  } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/api";

export default function Login() {
    const [mailUser, setMailUser] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { mailUser, password });

            //stocker les tokens
            localStorage.setItem("token", res.data.token);

            setMessage("Connexion reussie!");
            //redirection vers la page d'accueil
            navigate("/");
        } catch (err) {
            setMessage("Email ou mot de passe invalide");
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", maxWidth: "400px" }}>
            <h1>Se connecter</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ marginBottom: "1rem" }}>
                <label>Email</label>
                <input type= "email" placeholder="Votre email" value={mailUser} onChange={ (e) => setMailUser(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
             </div>
            <div style={{ marginBottom: "1rem" }}>
            <label>Mot de passe</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "0.5rem" }}/>
            </div>
            <button type="submit" style={{ padding: "0.7rem", width: "100%" }}>
                Se connecter
            </button>
            </form>

            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

            {/* Lien vers la page d'inscription */}
            <p style={{ marginTop: "1rem" }}>
                Pas encore de compte? <Link to="/register">S'inscrire</Link>
            </p>

            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
        </div>
    )
}

