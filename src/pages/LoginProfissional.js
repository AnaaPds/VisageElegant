import React, { useState } from 'react';
import '../styles/LoginProfissional.css';
import { useNavigate } from 'react-router-dom';

function LoginProfissional() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aqui entra depois a conexão com backend via Axios
    console.log({
      email,
      senha,
    });

    // Após login bem-sucedido
    navigate('/home-profissional');
  };

  return (
    <div className="login-profissional-container">
      <div className="header">
        <h1>Visage Élégant</h1>
        <img
          src="/assets/imagens/hibisco.png"
          alt="Logo Hibisco"
          className="logo-hibisco"
        />
      </div>

      <div className="login-card">
        <h2>Login Profissional</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        <p className="link-cadastro">
          Não tem conta?{' '}
          <span onClick={() => navigate('/cadastro-profissional')}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginProfissional;
