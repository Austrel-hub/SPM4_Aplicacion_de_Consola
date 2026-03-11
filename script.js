let tareas = [];
let siguienteIdTarea = 1;

function limpiarConsola() {
  console.clear();
  console.log("============================================");
  console.log("   PROYECTO MÓDULO 4 - APLICACIÓN DE CONSOLA");
  console.log("============================================");
}

function pedirNumero(mensaje) {
  let valor;

  while (true) {
    valor = prompt(mensaje);

    if (valor === null) {
      return null;
    }

    valor = valor.trim();

    if (valor === "") {
      alert("Debes ingresar un valor.");
      continue;
    }

    if (isNaN(valor)) {
      alert("Debes ingresar un número válido.");
      continue;
    }

    return Number(valor);
  }
}

function pedirTexto(mensaje) {
  while (true) {
    const texto = prompt(mensaje);

    if (texto === null) {
      return null;
    }

    if (texto.trim() === "") {
      alert("Debes ingresar un texto válido.");
      continue;
    }

    return texto.trim();
  }
}

function pausar() {
  alert("Presiona Aceptar para continuar.");
}

function mostrarMenuPrincipal() {
  return prompt(
    "=== MENÚ PRINCIPAL ===\n" +
    "1. Operaciones matemáticas\n" +
    "2. Gestor de tareas\n" +
    "3. Blackjack\n" +
    "4. Salir\n\n" +
    "Selecciona una opción:"
  );
}

//Calculadora

function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return null;
  }
  return a / b;
}

function mostrarMenuCalculadora() {
  return prompt(
    "=== CALCULADORA ===\n" +
    "1. Sumar\n" +
    "2. Restar\n" +
    "3. Multiplicar\n" +
    "4. Dividir\n" +
    "5. Volver al menú principal\n\n" +
    "Selecciona una opción:"
  );
}

function ejecutarCalculadora() {
  let continuar = true;

  while (continuar) {
    limpiarConsola();
    console.log("MÓDULO 1: CALCULADORA");

    const opcion = mostrarMenuCalculadora();

    if (opcion === null || opcion === "5") {
      continuar = false;
      continue;
    }

    if (!["1", "2", "3", "4"].includes(opcion)) {
      alert("Opción no válida.");
      continue;
    }

    const numero1 = pedirNumero("Ingresa el primer número:");
    if (numero1 === null) continue;

    const numero2 = pedirNumero("Ingresa el segundo número:");
    if (numero2 === null) continue;

    let resultado;
    let operacion = "";

    switch (opcion) {
      case "1":
        resultado = sumar(numero1, numero2);
        operacion = "Suma";
        break;
      case "2":
        resultado = restar(numero1, numero2);
        operacion = "Resta";
        break;
      case "3":
        resultado = multiplicar(numero1, numero2);
        operacion = "Multiplicación";
        break;
      case "4":
        resultado = dividir(numero1, numero2);
        operacion = "División";
        if (resultado === null) {
          alert("No se puede dividir por cero.");
          continue;
        }
        break;
    }

    console.log(`Operación: ${operacion}`);
    console.log(`Primer número: ${numero1}`);
    console.log(`Segundo número: ${numero2}`);
    console.log(`Resultado: ${resultado}`);

    alert(`${operacion} realizada con éxito.\nResultado: ${resultado}`);
  }
}

//Gestor de tareas

function mostrarMenuTareas() {
  return prompt(
    "=== GESTOR DE TAREAS ===\n" +
    "1. Agregar tarea\n" +
    "2. Ver tareas\n" +
    "3. Marcar tarea como completada / pendiente\n" +
    "4. Eliminar tarea\n" +
    "5. Ver solo tareas completadas\n" +
    "6. Ver solo tareas pendientes\n" +
    "7. Volver al menú principal\n\n" +
    "Selecciona una opción:"
  );
}

function agregarTarea() {
  const descripcion = pedirTexto("Escribe la descripción de la tarea:");

  if (descripcion === null) {
    return;
  }

  const nuevaTarea = {
    id: siguienteIdTarea,
    descripcion: descripcion,
    completada: false
  };

  tareas.push(nuevaTarea);
  siguienteIdTarea++;

  alert("Tarea agregada correctamente.");
}

function listarTareas(lista = tareas, titulo = "LISTA DE TAREAS") {
  limpiarConsola();
  console.log(`=== ${titulo} ===`);

  if (lista.length === 0) {
    console.log("No hay tareas para mostrar.");
    alert("No hay tareas para mostrar. Revisa la consola.");
    return;
  }

  for (let i = 0; i < lista.length; i++) {
    const tarea = lista[i];
    console.log(
      `ID: ${tarea.id} | ${tarea.descripcion} | Estado: ${tarea.completada ? "Completada" : "Pendiente"}`
    );
  }

  alert("Tareas mostradas en la consola.");
}

function buscarTareaPorId(id) {
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id === id) {
      return tareas[i];
    }
  }
  return null;
}

function cambiarEstadoTarea() {
  if (tareas.length === 0) {
    alert("No hay tareas registradas.");
    return;
  }

  listarTareas();

  const id = pedirNumero("Ingresa el ID de la tarea que deseas cambiar de estado:");
  if (id === null) return;

  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    alert("No se encontró una tarea con ese ID.");
    return;
  }

  tarea.completada = !tarea.completada;

  alert(
    `La tarea "${tarea.descripcion}" ahora está como: ${
      tarea.completada ? "Completada" : "Pendiente"
    }`
  );
}

function eliminarTarea() {
  if (tareas.length === 0) {
    alert("No hay tareas registradas.");
    return;
  }

  listarTareas();

  const id = pedirNumero("Ingresa el ID de la tarea que deseas eliminar:");
  if (id === null) return;

  const indice = tareas.findIndex((tarea) => tarea.id === id);

  if (indice === -1) {
    alert("No se encontró una tarea con ese ID.");
    return;
  }

  const tareaEliminada = tareas.splice(indice, 1);

  alert(`La tarea "${tareaEliminada[0].descripcion}" fue eliminada correctamente.`);
}

function verTareasCompletadas() {
  const completadas = tareas.filter((tarea) => tarea.completada === true);
  listarTareas(completadas, "TAREAS COMPLETADAS");
}

function verTareasPendientes() {
  const pendientes = tareas.filter((tarea) => tarea.completada === false);
  listarTareas(pendientes, "TAREAS PENDIENTES");
}

function ejecutarGestorTareas() {
  let continuar = true;

  while (continuar) {
    const opcion = mostrarMenuTareas();

    if (opcion === null || opcion === "7") {
      continuar = false;
      continue;
    }

    switch (opcion) {
      case "1":
        agregarTarea();
        break;
      case "2":
        listarTareas();
        break;
      case "3":
        cambiarEstadoTarea();
        break;
      case "4":
        eliminarTarea();
        break;
      case "5":
        verTareasCompletadas();
        break;
      case "6":
        verTareasPendientes();
        break;
      default:
        alert("Opción no válida.");
        break;
    }
  }
}
// Blackjack
function crearMazo() {
  const palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
  const valores = [
    { nombre: "A", puntos: 11 },
    { nombre: "2", puntos: 2 },
    { nombre: "3", puntos: 3 },
    { nombre: "4", puntos: 4 },
    { nombre: "5", puntos: 5 },
    { nombre: "6", puntos: 6 },
    { nombre: "7", puntos: 7 },
    { nombre: "8", puntos: 8 },
    { nombre: "9", puntos: 9 },
    { nombre: "10", puntos: 10 },
    { nombre: "J", puntos: 10 },
    { nombre: "Q", puntos: 10 },
    { nombre: "K", puntos: 10 }
  ];

  const mazo = [];

  for (let i = 0; i < palos.length; i++) {
    for (let j = 0; j < valores.length; j++) {
      mazo.push({
        palo: palos[i],
        nombre: valores[j].nombre,
        puntos: valores[j].puntos
      });
    }
  }

  return mazo;
}

function barajarMazo(mazo) {
  for (let i = mazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
  }
  return mazo;
}

function repartirCarta(mazo, mano) {
  const carta = mazo.pop();
  mano.push(carta);
}

function calcularPuntaje(mano) {
  let total = 0;
  let ases = 0;

  for (let i = 0; i < mano.length; i++) {
    total += mano[i].puntos;

    if (mano[i].nombre === "A") {
      ases++;
    }
  }

  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }

  return total;
}

function mostrarMano(nombreJugador, mano, ocultarPrimera = false) {
  console.log(`=== ${nombreJugador} ===`);

  if (ocultarPrimera) {
    console.log("[Carta oculta]");
    for (let i = 1; i < mano.length; i++) {
      console.log(`${mano[i].nombre} de ${mano[i].palo}`);
    }
  } else {
    for (let i = 0; i < mano.length; i++) {
      console.log(`${mano[i].nombre} de ${mano[i].palo}`);
    }
    console.log(`Puntaje: ${calcularPuntaje(mano)}`);
  }
}

function determinarGanador(puntajeJugador, puntajeCrupier) {
  if (puntajeJugador > 21) {
    return "El jugador pierde por pasarse de 21.";
  }

  if (puntajeCrupier > 21) {
    return "El crupier se pasa de 21. El jugador gana.";
  }

  if (puntajeJugador > puntajeCrupier) {
    return "El jugador gana.";
  }

  if (puntajeJugador < puntajeCrupier) {
    return "El crupier gana.";
  }

  return "Empate.";
}

function jugarBlackjack() {
  limpiarConsola();
  console.log("=== BLACKJACK ===");

  let mazo = crearMazo();
  mazo = barajarMazo(mazo);

  const manoJugador = [];
  const manoCrupier = [];

  repartirCarta(mazo, manoJugador);
  repartirCarta(mazo, manoCrupier);
  repartirCarta(mazo, manoJugador);
  repartirCarta(mazo, manoCrupier);

  let turnoJugador = true;

  while (turnoJugador) {
    limpiarConsola();
    console.log("=== BLACKJACK ===");
    mostrarMano("CRUPIER", manoCrupier, true);
    console.log("");
    mostrarMano("JUGADOR", manoJugador);

    const puntajeJugador = calcularPuntaje(manoJugador);

    if (puntajeJugador === 21) {
      alert("¡Blackjack o 21 exacto! Termina tu turno.");
      turnoJugador = false;
      break;
    }

    if (puntajeJugador > 21) {
      alert("Te pasaste de 21. Has perdido.");
      limpiarConsola();
      mostrarMano("CRUPIER", manoCrupier);
      console.log("");
      mostrarMano("JUGADOR", manoJugador);
      return;
    }

    const decision = prompt(
      "=== BLACKJACK ===\n" +
      "1. Pedir carta\n" +
      "2. Plantarse\n\n" +
      "Selecciona una opción:"
    );

    if (decision === null || decision === "2") {
      turnoJugador = false;
    } else if (decision === "1") {
      repartirCarta(mazo, manoJugador);
    } else {
      alert("Opción no válida.");
    }
  }

  while (calcularPuntaje(manoCrupier) < 17) {
    repartirCarta(mazo, manoCrupier);
  }

  limpiarConsola();
  console.log("=== RESULTADO FINAL BLACKJACK ===");
  mostrarMano("CRUPIER", manoCrupier);
  console.log("");
  mostrarMano("JUGADOR", manoJugador);

  const puntajeJugador = calcularPuntaje(manoJugador);
  const puntajeCrupier = calcularPuntaje(manoCrupier);
  const resultado = determinarGanador(puntajeJugador, puntajeCrupier);

  console.log("");
  console.log("Resultado:", resultado);
  alert(resultado);
}

function iniciarAplicacion() {
  let salir = false;

  while (!salir) {
    limpiarConsola();

    const opcion = mostrarMenuPrincipal();

    if (opcion === null) {
      const confirmar = confirm("¿Deseas salir de la aplicación?");
      if (confirmar) {
        salir = true;
      }
      continue;
    }

    switch (opcion) {
      case "1":
        ejecutarCalculadora();
        break;
      case "2":
        ejecutarGestorTareas();
        break;
      case "3":
        jugarBlackjack();
        break;
      case "4":
        salir = true;
        alert("Gracias por usar la aplicación.");
        break;
      default:
        alert("Opción no válida. Intenta nuevamente.");
        break;
    }
  }

  limpiarConsola();
  console.log("La aplicación ha finalizado.");
}

document.getElementById("iniciarApp").addEventListener("click", iniciarAplicacion);