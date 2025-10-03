import { useNavigate } from "react-router-dom";

export default function Accueil() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Bienvenue sur la page d’accueil 🎉</h1>
      <p>Tu es connecté avec succès.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1rem",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
    );
}