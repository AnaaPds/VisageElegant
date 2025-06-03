import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerConsultasPaciente.css";

function VerConsultasPaciente() {
  const [consultas, setConsultas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [novaData, setNovaData] = useState('');
  const [filtroProcedimento, setFiltroProcedimento] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const navigate = useNavigate();

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

  const iniciarRemarcacao = (index) => {
    setEditIndex(index);
    setNovaData(consultas[index].data);
  };

  const confirmarRemarcacao = () => {
    if (novaData.trim() === '') return;
    const novasConsultas = [...consultas];
    novasConsultas[editIndex].data = novaData;
    setConsultas(novasConsultas);
    localStorage.setItem('consultas', JSON.stringify(novasConsultas));
    setEditIndex(null);
    setNovaData('');
  };

  // 🔍 Filtrar as consultas
  const consultasFiltradas = consultas.filter((consulta) => {
    return (
      (filtroProcedimento === '' || consulta.procedimento.toLowerCase().includes(filtroProcedimento.toLowerCase())) &&
      (filtroProfissional === '' || consulta.profissional.toLowerCase().includes(filtroProfissional.toLowerCase())) &&
      (filtroData === '' || consulta.data === filtroData)
    );
  });

  return React.createElement("div", { className: "ver-consultas-container" },

    // Sidebar
    React.createElement("div", { className: "sidebar" },
      React.createElement("div", { className: "sidebar-icons" },
        React.createElement("img", {
          src: "assets/imagens/home.webp",
          alt: "home",
          style: { cursor: "pointer" },
          onClick: () => navigate("/home-paciente")
        }),
        React.createElement("img", {
          src: "assets/imagens/consultas.jpg",
          alt: "consultas"
        })
      )
    ),

    // Conteúdo
    React.createElement("div", { className: "conteudo" },

      // Header
      React.createElement("div", { className: "header" },
        React.createElement("h1", null, "Visage Élégant"),
        React.createElement("img", {
          src: "assets/imagens/hibisco.png",
          alt: "hibisco",
          className: "hibisco"
        })
      ),

      // Consultas
      React.createElement("div", { className: "consultas" },
        React.createElement("h2", null, "Minhas Consultas"),

        // 🔍 Filtros
        React.createElement("div", { className: "filtros" },
          React.createElement("input", {
            type: "text",
            placeholder: "Filtrar por Procedimento",
            value: filtroProcedimento,
            onChange: (e) => setFiltroProcedimento(e.target.value)
          }),
          React.createElement("input", {
            type: "text",
            placeholder: "Filtrar por Profissional",
            value: filtroProfissional,
            onChange: (e) => setFiltroProfissional(e.target.value)
          }),
          React.createElement("input", {
            type: "date",
            value: filtroData,
            onChange: (e) => setFiltroData(e.target.value)
          })
        ),

        // Sem consultas
        consultasFiltradas.length === 0
          ? React.createElement("div", { className: "sem-consultas" },
              React.createElement("p", null, "Nenhuma consulta encontrada.")
            )

        // Lista de consultas
          : React.createElement("div", { className: "consultas-lista" },
              consultasFiltradas.map((consulta, index) =>
                React.createElement("div", { className: "consulta-card", key: index },
                  // Info
                  React.createElement("div", { className: "consulta-info" },
                    React.createElement("h3", null, consulta.procedimento),
                    React.createElement("p", null, `Paciente: ${consulta.nome}`),
                    React.createElement("p", null, `Profissional: ${consulta.profissional}`),
                    React.createElement("p", null, `Data: ${consulta.data}`)
                  ),
                  // Botões
                  React.createElement("div", { className: "consulta-botoes" },
                    editIndex === index
                      ? React.createElement(React.Fragment, null,
                          React.createElement("input", {
                            type: "date",
                            value: novaData,
                            onChange: (e) => setNovaData(e.target.value)
                          }),
                          React.createElement("button", { onClick: confirmarRemarcacao }, "Salvar"),
                          React.createElement("button", { onClick: () => setEditIndex(null) }, "Cancelar")
                        )
                      : React.createElement(React.Fragment, null,
                          React.createElement("button", {
                            className: "btn-remarcar",
                            onClick: () => iniciarRemarcacao(index)
                          }, "Remarcar"),
                          React.createElement("button", {
                            className: "btn-cancelar",
                            onClick: () => cancelarConsulta(index)
                          }, "Cancelar")
                        )
                  )
                )
              )
            )
      )
    )
  );
}

export default VerConsultasPaciente;
