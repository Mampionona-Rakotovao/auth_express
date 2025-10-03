import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../service/api";
import "./register.css";

export default function Register() {
    const [nomUser, setNomUser] = useState("");
    const [mailUser, setMailUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        if (password.length < 10) {
            setMessage("Le mot de passe doit contenir au moins 10 caractères.");
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/auth/register", { nomUser, mailUser, password });
            setMessage("Inscription reussie! Vous pouvez maintenant vous connecter.");
            // setTimeout(() => navigate("/login"), 2000);
            navigate("/login");
        } catch (err) {
            const serverMsg = err?.response?.data?.error || err?.message;
            setMessage(`Erreur lors de l'inscription: ${serverMsg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((s) => !s);

    const getPasswordStrength = () => {
        if (password.length === 0) return { strength: 0, text: "", color: "" };
        if (password.length < 6) return { strength: 25, text: "Faible", color: "#ff4444" };
        if (password.length < 10) return { strength: 50, text: "Moyen", color: "#ffaa00" };
        if (password.length < 14) return { strength: 75, text: "Fort", color: "#00c851" };
        return { strength: 100, text: "Très fort", color: "#007e33" };
    };

    const passwordStrength = getPasswordStrength();
    const isSuccess = message && message.toLowerCase().includes("reussie");

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">S'inscrire</h1>

                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-group">
                        <label htmlFor="nomUser" className="form-label">Nom complet</label>
                        <input
                            type="text"
                            id="nomUser"
                            placeholder="Votre nom complet"
                            value={nomUser}
                            onChange={(e) => setNomUser(e.target.value)}
                            required
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mailUser" className="form-label">Email</label>
                        <input
                            type="email"
                            id="mailUser"
                            placeholder="Votre email"
                            value={mailUser}
                            onChange={(e) => setMailUser(e.target.value)}
                            required
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Mot de passe
                            <span className="password-requirement"> (minimum 10 caractères)</span>
                        </label>
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
                                minLength={10}
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

                        {password.length > 0 && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div
                                        className="strength-fill"
                                        style={{
                                            width: `${passwordStrength.strength}%`,
                                            backgroundColor: passwordStrength.color,
                                        }}
                                    />
                                </div>
                                <span className="strength-text" style={{ color: passwordStrength.color }}>
                                    {passwordStrength.text}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirmez votre mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-input"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={toggleShowConfirmPassword}
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? "Masquer" : "Afficher"}
                            </button>
                        </div>

                        {confirmPassword && password !== confirmPassword && (
                            <span className="error-text">Les mots de passe ne correspondent pas</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`register-button ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>

                {message && (
                    <div className={`message ${isSuccess ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                <div className="register-links">
                    <p>
                        Déjà un compte? <Link to="/login" className="link">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}