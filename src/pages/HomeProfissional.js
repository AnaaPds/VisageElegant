import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeProfissional.css';

function HomeProfissional() {
  const navigate = useNavigate();

  const gerarRelatorio = () => {
    const idProfissional = localStorage.getItem('idProfissional');

    if (!idProfissional) {
      alert('ID do profissional não encontrado. Faça login novamente.');
      return;
    }

    fetch(`http://localhost:8080/relatorios/profissional/${idProfissional}`, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao gerar o relatório');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_profissional_${idProfissional}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao gerar o relatório');
      });
  };

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
          <div className="botao" onClick={gerarRelatorio}>
            <img src="assets/imagens/relatorio.png" alt="Relatório" />
            <p>Relatório</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProfissional;
