let cargando = document.getElementById("cargando");
let mostrar = document.getElementById("mostrar");
let modificarListado = document.getElementById("modificarListado");
let calcularPresupuesto = document.getElementById("presupuesto");
let textoPresupuesto = document.getElementById("presupuestoTotal");
let divError = document.getElementById("error");
let inputId = document.getElementById("inputId");
let inputCantidad = document.getElementById("inputCantidad");
let presupuestoOculto = document.getElementById("presupuestoOculto");
let mostrarTablaPresupuesto = document.getElementById("mostrarTablaPresupuesto");
let tramosAccesorios = [];
let tmpListado = [];
let presupuestos = [];
loadTramoAccesorio();
loadPresupuesto();
let nuevafecha;

async function loadTramoAccesorio() {
  cargando.innerHTML = "<h1>Loading.....</h1>";
  try {
    let response = await fetch("/tramoaccesorio");
    if (response.ok) {
      tramosAccesorios = await response.json();
      precargarArreglo();
      actualizarTramoAccesorio();
      cargando.innerHTML = "";
    } else cargando.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
  }
};

async function loadPresupuesto() {
  cargando.innerHTML = "<h1>Loading.....</h1>";
  try {
    let response = await fetch("/presupuesto");
    if (response.ok) {
      presupuestos = await response.json();
      mostrarPresupuesto();
      cargando.innerHTML = "";
    } else cargando.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
  }
};
  
function EstaEnTmp(id, arreglo) {
  for (let t = 0; t < arreglo.length; t++) {
    if (id == arreglo[t].idAccesorio) {
      return true
    }
  }
  return false;
};

function precargarArreglo() {
  
  for (let i = 0; i < tramosAccesorios.length; i++) {
    let accesorio = tramosAccesorios[i].accesorio;
    if (!EstaEnTmp(accesorio.idAccesorio, tmpListado)) {
      tmpListado.push({
        "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
        "idAccesorio": accesorio.idAccesorio,
        "nombre_accesorio": accesorio.nombre_accesorio,
        "cantidad": cantidad(accesorio.idAccesorio),
        "tramo_precio_accesorio": precio(accesorio.idAccesorio)
      });
    }  
  }
};

function cantidad(idAccesorio) {
  let suma = 0;
  for(let i=0;i<tramosAccesorios.length;i++){
    let accesorio = tramosAccesorios[i].accesorio;
    if (idAccesorio == accesorio.idAccesorio) {
      suma += tramosAccesorios[i].cantidad;
    }
  }
  return suma;
};

function precio(idAccesorio) {
  let suma = 0;
  for(let i=0;i<tramosAccesorios.length;i++){
    let accesorio = tramosAccesorios[i].accesorio;
    if (idAccesorio == accesorio.idAccesorio) {
      suma += tramosAccesorios[i].tramo_precio_accesorio;
    }
  }
  return suma;
};

function actualizarTramoAccesorio() {
  html = "";
  for (let i = 0; i < tmpListado.length; i++) {
    html += `
                  <tr>
                     <td>${tmpListado[i].idTramoAccesorio}</td>
                     <td>${tmpListado[i].idAccesorio}</td>
                     <td>${tmpListado[i].nombre_accesorio}</td>
                     <td>${tmpListado[i].cantidad}</td>
                     <td>$${tmpListado[i].tramo_precio_accesorio}</td>
                     </tr>`;
  }
  mostrar.innerHTML = html;
};

async function load() {
  try {
    let response = await fetch("/tramoaccesorio");
    if (response.ok) {
      tramosAccesorios = await response.json();
      actualizarTramoAccesorio();
      cargando.innerHTML = "";
    } else cargando.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
  }
};

calcularPresupuesto.addEventListener("click", async () => {
  presupuestoOculto.classList.remove("presupuestoOculto")
  nuevafecha =new Date();
  let idUsuario = localStorage.getItem("idUsuario");
  let suma = 0;
  for (let i=0; i<tmpListado.length; i++) {
    suma += tmpListado[i].tramo_precio_accesorio;
  }
    let presupuesto = {
      "fecha": nuevafecha,
      "total": suma,
      "idUsuario": parseInt(idUsuario),
    }
    crearPresupuesto(presupuesto);
    loadPresupuesto();
});

async function crearPresupuesto(presupuesto) {
  let response = await fetch("/presupuesto", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presupuesto),
  });
  let r = await response.json();
  console.log(r)
}

function mostrarPresupuesto() {
  let nombre = localStorage.getItem("nombre");
  let fechaActual = `${nuevafecha.getDate()}-${nuevafecha.getMonth()}-${nuevafecha.getFullYear()}`
  html = "";
  for (let i = 0; i < presupuestos.length; i++) {
    html += `
                  <tr>
                     <td>${presupuestos[i].idPresupuesto}</td>
                     <td>${fechaActual}</td>
                     <td>$${presupuestos[i].total}</td>
                     <td>${nombre}</td>
                     </tr>`;
  }
  mostrarTablaPresupuesto.innerHTML = html;
};








 
