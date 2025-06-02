import React, { useState } from 'react';
import '../styles/CadastroPaciente.css';
import { useNavigate } from 'react-router-dom';

function CadastroPaciente() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    // Aqui futuramente vai o Axios para enviar pro backend
    console.log({
      nome,
      dataNasc,
      telefone,
      email,
      senha,
    });

    // Após cadastro
    navigate('/login-paciente');
  };

  return (
    <div className="cadastro-paciente-container">
      <div className="header">
        <h1>Visage Élégant</h1>
        <img
          src="/assets/imagens/hibisco.png"
          alt="Logo Hibisco"
          className="logo-hibisco"
        />
      </div>

      <div className="cadastro-card">
        <h2>Cadastro Paciente</h2>
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

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

          <button type="submit">Cadastrar</button>
        </form>

        <p className="link-login">
          Já tem cadastro?{' '}
          <span onClick={() => navigate('/login-paciente')}>Faça login</span>
        </p>
      </div>
    </div>
  );
}

export default CadastroPaciente;
