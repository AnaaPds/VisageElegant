import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConsultasProfissional.css';

function ConsultasProfissional() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const consultasSalvas = JSON.parse(localStorage.getItem('consultas')) || [];
    setConsultas(consultasSalvas);
  }, []);

  const cancelarConsulta = (index) => {
    const novasConsultas = [...consultas];
    novasConsultas.splice(index, 1);
    setConsultas(novasConsultas);
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
  };

  return (
    <div className="consultas-profissional-container">
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

        <div className="consultas">
          <h2>Consultas</h2>

          {consultas.length === 0 ? (
            <p>Não há consultas agendadas.</p>
          ) : (
            consultas.map((consulta, index) => (
              <div className="consulta-card" key={index}>
                <h3>{consulta.procedimento}</h3>
                <p>{consulta.nome}</p>
                <p>Data: {consulta.data}</p>
                <button onClick={() => cancelarConsulta(index)}>Cancelar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ConsultasProfissional;
