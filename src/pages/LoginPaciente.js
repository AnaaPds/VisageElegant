import React, { useState } from 'react';
import '../styles/LoginPaciente.css';
import { useNavigate } from 'react-router-dom';

function LoginPaciente() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aqui futuramente você conecta com Axios
    console.log('Email:', email);
    console.log('Senha:', senha);

    // Após login bem-sucedido
    navigate('/home-paciente');
  };

  return (
    <div className="login-paciente-container">
      <div className="header">
        <h1>Visage Élégant</h1>
        <img
          src="/assets/imagens/hibisco.png"
          alt="Logo Hibisco"
          className="logo-hibisco"
        />
      </div>

      <div className="login-card">
        <h2>Login Paciente</h2>
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
          Não tem cadastro?{' '}
          <span onClick={() => navigate('/cadastro-paciente')}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPaciente;
