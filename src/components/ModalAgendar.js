import React, { useState } from 'react';
import '../styles/ModalAgendar.css';

function ModalAgendar({ procedimento, onClose, onConfirm }) {
  const [especialidade, setEspecialidade] = useState('');
  const [profissional, setProfissional] = useState('');
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  const handleAgendar = () => {
    const dados = {
      procedimento,
      especialidade,
      profissional,
      nome,
      data,
    };

    // ✅ Salvando no localStorage
    const consultasAntigas = JSON.parse(localStorage.getItem('consultas')) || [];
    const novasConsultas = [...consultasAntigas, dados];
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));

    // ✅ Executando callback se necessário
    if (onConfirm) onConfirm(dados);

    // ✅ Fechando o modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="btn-fechar" onClick={onClose}>×</button>

        <div className="header-modal">
          <h1>Visage Élégant</h1>
          <img src="/assets/imagens/hibisco.png" alt="Hibisco" className="hibisco-modal" />
        </div>

        <h2>Agendar {procedimento}</h2>

        <div className="form-group">
          <label>Especialidade:</label>
          <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
            <option value="">Selecione</option>
            <option value="Preenchimento facial">Preenchimento facial</option>
            <option value="Botox">Botox</option>
            <option value="Laser">Laser</option>
            <option value="Harmonização Facial">Harmonização Facial</option>
            <option value="Limpeza de Pele">Limpeza de Pele</option>
            <option value="Microagulhamento">Microagulhamento</option>
          </select>
        </div>

        <div className="form-group">
          <label>Profissional:</label>
          <select value={profissional} onChange={(e) => setProfissional(e.target.value)}>
            <option value="">Selecione</option>
            <option value="Dra. Camila Souza">Dra. Camila Souza</option>
            <option value="Dr. Rafael Lima">Dr. Rafael Lima</option>
            <option value="Dra. Ana Beatriz">Dra. Ana Beatriz</option>
          </select>
        </div>

        <div className="form-group">
          <label>Seu Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Data da Consulta:</label>
          <div className="input-com-icone">
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn-agendar"
          onClick={handleAgendar}
          disabled={!especialidade || !profissional || !nome || !data}
        >
          Agendar
        </button>
      </div>
    </div>
  );
}

export default ModalAgendar;
