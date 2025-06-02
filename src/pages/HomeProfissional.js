import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeProfissional.css';

function HomeProfissional() {
  const navigate = useNavigate();

  return (
    <div className="home-profissional-container">
      <div className="sidebar">
        <img
          src="assets/imagens/home.webp"
          alt="Home"
          onClick={() => navigate('/home-profissional')}
          className="icon"
        />
      </div>

      <div className="conteudo">
        <div className="header">
          <h1>Visage Élégant</h1>
          <img src="assets/imagens/hibisco.png" alt="hibisco" className="hibisco" />
        </div>

        <h2 className="saudacao">Olá Doutor(a)!</h2>

        <div className="botoes">
          <div className="botao" onClick={() => navigate('/consultas-profissional')}>
            <img src="assets/imagens/calendario.webp" alt="Consultas" />
            <p>Consultas</p>
          </div>
          <div className="botao">
            <img src="assets/imagens/relatorio.png" alt="Relatório" />
            <p>Relatório</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProfissional;
