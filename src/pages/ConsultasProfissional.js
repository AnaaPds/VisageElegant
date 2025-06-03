import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ConsultasProfissional.css';

function ConsultasProfissional() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});

  const [filtroNome, setFiltroNome] = useState('');
  const [filtroData, setFiltroData] = useState('');

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

  const toggleDetalhes = (index) => {
    setDetalhesVisiveis((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const consultasFiltradas = consultas.filter(consulta => {
    const nomeMatch = consulta.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const dataMatch = consulta.data.includes(filtroData);
    return nomeMatch && dataMatch;
  });

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

          {/* Filtros */}
          <div className="filtros">
            <input
              type="text"
              placeholder="Filtrar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
            <input
              type="date"
              placeholder="Filtrar por data"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
            />
          </div>

          {consultasFiltradas.length === 0 ? (
            <p>Não há consultas encontradas.</p>
          ) : (
            consultasFiltradas.map((consulta, index) => (
              <div className="consulta-card" key={index}>
                <h3>{consulta.procedimento}</h3>
                <p><strong>Nome:</strong> {consulta.nome}</p>
                <p><strong>Data:</strong> {consulta.data}</p>

                {detalhesVisiveis[index] && (
                  <div className="detalhes">
                    <p><strong>Telefone:</strong> {consulta.telefone}</p>
                    <p><strong>Observações:</strong> {consulta.observacoes || 'Nenhuma'}</p>
                  </div>
                )}

                <div className="botoes">
                  <button onClick={() => toggleDetalhes(index)}>
                    {detalhesVisiveis[index] ? 'Ocultar' : 'Ver mais'}
                  </button>
                  <button onClick={() => cancelarConsulta(index)}>Cancelar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ConsultasProfissional;
