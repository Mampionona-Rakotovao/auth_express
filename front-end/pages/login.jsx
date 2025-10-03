import { useState  } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/api";
import "./login.css";

export default function Login() {
    const [mailUser, setMailUser] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const res = await api.post("/auth/login", { mailUser, password });

            //stocker les tokens
            localStorage.setItem("token", res.data.token);

            setMessage("Connexion reussie!");
            //redirection vers la page d'accueil
            // setTimeout(() => navigate("/"), 1500);
            navigate("/");
        } catch (err) {
            setMessage("Email ou mot de passe invalide");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Se connecter</h1>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Votre email" 
                            value={mailUser} 
                            onChange={(e) => setMailUser(e.target.value)} 
                            required 
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input"
                                disabled={isLoading}
                            />
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={toggleShowPassword}
                                disabled={isLoading}
                            >
                                {showPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                {message && (
                    <div className={`message ${message.includes("réussie") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                <div className="login-links">
                    <p>
                        Pas encore de compte? <Link to="/register" className="link">S'inscrire</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

