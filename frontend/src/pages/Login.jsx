import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * formulair d'authentification
 * @returns 
 */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Ajout du state message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("http://localhost:5000/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      
      if (data.status === "authenticate_succed") {
          if (!data.token) {
          setMessage("Erreur : token manquant.");
          return;
        }

        // token dans data.token
        localStorage.setItem("token", data.token);

        navigate("/dashboard");
      }
      else if (data.status === "authenticate_credentials") {
        setMessage("Mot de passe incorrect");

      } else if (data.status === "user_not_found") {
        setMessage("Utilisateur non trouvé");

      } else {
        setMessage("Erreur inconnue : " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>

      <h1>Port de Plaisance Russell</h1>

      <p>L'application utilitaire du port de plaisance de Russell permet de pouvoir réserver des passerelle et gérer leur état.</p>

      <div>     
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>Se connecter</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
