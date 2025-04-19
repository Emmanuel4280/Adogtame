import React, { useState } from "react";
import { auth } from "../componentes/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLoginSuccess(userCredential.user);
      alert("Bienvenido");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLoginSuccess(userCredential.user);
      alert("Usuario registrado correctamente");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />
      <button
        onClick={isRegistering ? handleRegister : handleLogin}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        {isRegistering ? "Registrarse" : "Entrar"}
      </button>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ width: "100%" }}
      >
        {isRegistering
          ? "¿Ya tienes cuenta? Iniciar sesión"
          : "¿No tienes cuenta? Registrarse"}
      </button>
      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>
      )}
    </div>
  );
}

export default Login;
