let cargando = document.getElementById(`cargando`);
let mostrar = document.getElementById(`mostrar`);
let modificarListado = document.getElementById(`modificarListado`);
let calcularPresupuesto = document.getElementById(`presupuesto`);
let textoPresupuesto = document.getElementById(`presupuestoTotal`);
let divError = document.getElementById(`error`);
let inputId = document.getElementById(`inputId`);
let inputCantidad = document.getElementById(`inputCantidad`);
let presupuestoOculto = document.getElementById(`presupuestoOculto`);
let mostrarTablaPresupuesto = document.getElementById(`mostrarTablaPresupuesto`)
let tramosAccesorios = [];
let tmpListado = [];
let presupuestos = [];

loadTramoAccesorio();
loadPresupuesto();
let nuevafecha;

async function loadTramoAccesorio() {
  cargando.innerHTML = `<h1>Loading.....</h1>`;
  try {
    let response = await fetch(`/tramoaccesorio`);
    if (response.ok) {
      tramosAccesorios = await response.json();
      console.log(tramosAccesorios);
      precargarArreglo();
      actualizarTramoAccesorio();
      cargando.innerHTML = '';
    } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
  }
};

async function loadPresupuesto() {
  cargando.innerHTML = `<h1>Loading.....</h1>`;
  try {
    let response = await fetch(`/presupuesto`);
    if (response.ok) {
      presupuestos = await response.json();
      console.log(presupuestos);
      mostrarPresupuesto();
      cargando.innerHTML = '';
    } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
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
    // console.log(accesorio);
    if (!EstaEnTmp(accesorio.idAccesorio, tmpListado)) {
      tmpListado.push({
        "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
        "idAccesorio": accesorio.idAccesorio,
        "nombre_accesorio": accesorio.nombre_accesorio,
        // "cantidad": tramosAccesorios[i].cantidad,
        "cantidad": cantidad(accesorio.idAccesorio),
        "tramo_precio_accesorio": precio(accesorio.idAccesorio)
      });
    }  
  }
  console.log(tmpListado);
};

function cantidad(idAccesorio) {
  let suma = 0;
  for(let i=0;i<tramosAccesorios.length;i++){
    let accesorio = tramosAccesorios[i].accesorio;
    // console.log(accesorio)
    if (idAccesorio == accesorio.idAccesorio) {
      suma += tramosAccesorios[i].cantidad;
      // console.log(suma);
    }
  }
  return suma;
};

function precio(idAccesorio) {
  let suma = 0;
  for(let i=0;i<tramosAccesorios.length;i++){
    let accesorio = tramosAccesorios[i].accesorio;
    // console.log(accesorio)
    if (idAccesorio == accesorio.idAccesorio) {
      suma += tramosAccesorios[i].tramo_precio_accesorio;
    }
  }
  return suma;
};

function actualizarTramoAccesorio() {
  html = '';
  for (let i = 0; i < tmpListado.length; i++) {
    html += `
                  <tr>
                     <td>${tmpListado[i].idTramoAccesorio}</td>
                     <td>${tmpListado[i].idAccesorio}</td>
                     <td>${tmpListado[i].nombre_accesorio}</td>
                     <td>${tmpListado[i].cantidad}</td>
                     <td>${tmpListado[i].tramo_precio_accesorio}</td>
                     </tr>`;
  }
  mostrar.innerHTML = html;
};

async function load() {
  try {
    let response = await fetch(`/tramoaccesorio`);
    if (response.ok) {
      tramosAccesorios = await response.json();
      console.log(tramosAccesorios);
      actualizarTramoAccesorio();
      cargando.innerHTML = '';
    } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
  }
};

calcularPresupuesto.addEventListener('click', async () => {
  presupuestoOculto.classList.remove("presupuestoOculto")
  nuevafecha =new Date();
  //let nuevafecha= Date.now();
  console.log(nuevafecha);
  //let fechaActual = `${nuevafecha.getDate()}-${nuevafecha.getMonth()}-${nuevafecha.getFullYear()}`
  let idUsuario = localStorage.getItem("idUsuario");
  console.log(idUsuario)
  let suma = 0;
  for (let i=0; i<tmpListado.length; i++) {
    suma += tmpListado[i].tramo_precio_accesorio;
  }
  // return suma;
  // textoPresupuesto.innerHTML = `$ ${suma}`;
  // console.log(suma)
    let presupuesto = {
      "fecha": nuevafecha,
      "total": suma,
      "idUsuario": parseInt(idUsuario),
    }
    //console.log
    //presupuestos.push(presupuesto);
    console.log(presupuesto);
    crearPresupuesto(presupuesto);
    loadPresupuesto();
});

async function crearPresupuesto(presupuesto) {
  let response = await fetch(`/presupuesto`, {
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
  html = '';
  for (let i = 0; i < presupuestos.length; i++) {
    html += `
                  <tr>
                     <td>${fechaActual}</td>
                     <td>$${presupuestos[i].total}</td>
                     <td>${nombre}</td>
                     </tr>`;
  }
  mostrarTablaPresupuesto.innerHTML = html;
};

// html += `
//                   <tr>
//                      <td>${presupuestos[i].idPresupuesto}</td>
//                      <td>${nombre}</td>
//                      <td>${presupuestos[i].fecha}</td>
//                      <td>$${presupuestos[i].total}</td>
//                      <td>${presupuestos[i].idUsuario}</td>
//                      </tr>`;
//   }

