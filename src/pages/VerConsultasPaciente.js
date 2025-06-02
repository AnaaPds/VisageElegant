import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerConsultasPaciente.css';

function VerConsultasPaciente() {
  const [consultas, setConsultas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [novaData, setNovaData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const consultasSalvas = JSON.parse(localStorage.getItem('consultas')) || [];
    setConsultas(consultasSalvas);
  }, []);

  // Cancelar consulta
  const cancelarConsulta = (index) => {
    const novasConsultas = [...consultas];
    novasConsultas.splice(index, 1);
    setConsultas(novasConsultas);
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
  };

  // Iniciar remarcação
  const iniciarRemarcacao = (index) => {
    setEditIndex(index);
    setNovaData(consultas[index].data);
  };

  // Confirmar remarcação
  const confirmarRemarcacao = () => {
    if (novaData.trim() === '') return;

    const novasConsultas = [...consultas];
    novasConsultas[editIndex].data = novaData;
    setConsultas(novasConsultas);
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
    setEditIndex(null);
    setNovaData('');
  };

  return (
    <div className="ver-consultas-container">
      <div className="sidebar">
        <div className="sidebar-icons">
          <img
            src="assets/imagens/home.webp"
            alt="home"
            onClick={() => navigate('/home-paciente')}
            style={{ cursor: 'pointer' }}
          />
          <img src="assets/imagens/consultas.jpg" alt="consultas" />
        </div>
      </div>

      <div className="conteudo">
        <div className="header">
          <h1>Visage Élégant</h1>
          <img src="assets/imagens/hibisco.png" alt="hibisco" className="hibisco" />
        </div>

        <div className="consultas">
          <h2>Minhas Consultas</h2>

          {consultas.length === 0 ? (
            <div className="sem-consultas">
              <p>Você ainda não possui consultas agendadas.</p>
            </div>
          ) : (
            <div className="consultas-lista">
              {consultas.map((consulta, index) => (
                <div className="consulta-card" key={index}>
                  <div className="consulta-info">
                    <h3>{consulta.procedimento}</h3>
                    <p>Paciente: {consulta.nome}</p>
                    <p>Profissional: {consulta.profissional}</p>
                    <p>Data: {consulta.data}</p>
                  </div>

                  <div className="consulta-botoes">
                    {editIndex === index ? (
                      <>
                        <input
                          type="date"
                          value={novaData}
                          onChange={(e) => setNovaData(e.target.value)}
                        />
                        <button onClick={confirmarRemarcacao}>Salvar</button>
                        <button onClick={() => setEditIndex(null)}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-remarcar" onClick={() => iniciarRemarcacao(index)}>
                          Remarcar
                        </button>
                        <button
                          className="btn-cancelar"
                          onClick={() => cancelarConsulta(index)}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerConsultasPaciente;
