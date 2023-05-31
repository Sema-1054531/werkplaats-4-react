import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Inloggen succesvol, doe iets zoals doorsturen naar een andere pagina
      console.log("Inloggen succesvol:", response.data);
    } catch (error) {
      // Inloggen mislukt, toon een foutmelding of neem andere acties
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Wachtwoord"
      />
      <button type="submit">Inloggen</button>
    </form>
  );
};

export default LoginForm;