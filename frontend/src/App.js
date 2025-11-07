import './App.css';
import React, { useState } from "react";
import { login } from "./services/api";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await login(email, password);
    console.log(res);
  }

  return (
    <div>
      <h1>Connexion</h1>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />

      <input placeholder="mot de passe" type="password" onChange={e => setPassword(e.target.value)} />
      
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default App;
