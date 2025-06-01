import React from "react";

const VerConsultasPaciente = () => {
  return React.createElement("div", { className: "container" },
    React.createElement("header", { className: "header" },
      React.createElement("img", { src: "/assets/imagens/hibisco.png", alt: "Logo", className: "logo" }),
      React.createElement("h1", null, "Visage Élégant")
    ),
    React.createElement("nav", { className: "menu" },
      React.createElement("img", { src: "/assets/imagens/home.webp", alt: "Home", className: "icon" }),
      React.createElement("img", { src: "/assets/imagens/consultas.jpg", alt: "Consultas", className: "icon" })
    ),
    React.createElement("main", { className: "consultas" },
      React.createElement("h2", null, "Minhas Consultas"),
      createConsultaCard("Preenchimento Facial", "Ana", "10/01/2025"),
      createConsultaCard("Botox", "Ana", "10/01/2025")
    )
  );
};

function createConsultaCard(procedimento, profissional, data) {
  return React.createElement("div", { className: "consulta-card" },
    React.createElement("h3", null, procedimento),
    React.createElement("p", null, `Profissional: ${profissional}`),
    React.createElement("p", null, `Data: ${data}`),
    React.createElement("div", { className: "buttons" },
      React.createElement("button", null, "Remarcar"),
      React.createElement("button", null, "Cancelar")
    )
  );
}

export default VerConsultasPaciente;
