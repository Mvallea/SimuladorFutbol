const jugadores = [
  { nombre: "Cristiano Ronaldo", tiro: 95, regate: 88 },
  { nombre: "Lionel Messi", tiro: 92, regate: 96 },
  { nombre: "Lamine Yamal", tiro: 80, regate: 85 },
  { nombre: "Kylian Mbappé", tiro: 90, regate: 94 },
  { nombre: "Vinicius Jr", tiro: 85, regate: 91 },
  { nombre: "Julián Álvarez", tiro: 84, regate: 87 }
];

const porteros = [
  { nombre: "Thibaut Courtois", parada: 90 },
  { nombre: "Jan Oblak", parada: 89 },
  { nombre: "Unai Simón", parada: 85 }
];

const jugadorSelect = document.getElementById("jugadorSelect");
const porteroSelect = document.getElementById("porteroSelect");
const resultadoDiv = document.getElementById("resultado");
const historialLista = document.getElementById("historialLista");
const contadorGoles = document.getElementById("contadorGoles");
const contadorParadas = document.getElementById("contadorParadas");

let goles = 0;
let paradas = 0;

function cargarOpciones() {
  jugadores.forEach((j, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = j.nombre;
    jugadorSelect.appendChild(option);
  });

  porteros.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = p.nombre;
    porteroSelect.appendChild(option);
  });
}

function actualizarHistorial(jugador, portero, resultado) {
  const li = document.createElement("li");
  li.innerHTML = `<span class="badge ${resultado.includes('GOOOOL') ? 'gol' : 'atajada'}">${resultado}</span> 
                  <strong>${jugador}</strong> vs <strong>${portero}</strong>`;
  historialLista.prepend(li);
}

function simularDisparo() {
  const jugador = jugadores[jugadorSelect.value];
  const portero = porteros[porteroSelect.value];

  const potenciaJugador = jugador.tiro + Math.random() * 10;
  const capacidadPortero = portero.parada + Math.random() * 10;

  const resultado = potenciaJugador > capacidadPortero ? "¡GOOOOL! ⚽🔥" : "¡ATAJADA! 🧤❌";

  if (resultado.includes("GOOOOL")) {
    goles++;
  } else {
    paradas++;
  }

  resultadoDiv.innerHTML = `
    <h3>Resultado del disparo</h3>
    <p><strong>${jugador.nombre}</strong> vs <strong>${portero.nombre}</strong></p>
    <p class="final">${resultado}</p>
  `;

  contadorGoles.textContent = `Goles: ${goles}`;
  contadorParadas.textContent = `Paradas: ${paradas}`;

  const historial = JSON.parse(localStorage.getItem("historialPartidas")) || [];
  historial.push({ jugador: jugador.nombre, portero: portero.nombre, resultado });
  localStorage.setItem("historialPartidas", JSON.stringify(historial));

  actualizarHistorial(jugador.nombre, portero.nombre, resultado);
}

document.getElementById("simularBtn").addEventListener("click", simularDisparo);
cargarOpciones();
