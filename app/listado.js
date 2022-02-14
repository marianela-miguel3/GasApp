let cargando = document.getElementById(`cargando`);
let mostrar = document.getElementById(`mostrar`);
let modificarListado = document.getElementById(`modificarListado`);
let divError = document.getElementById(`error`);
let inputId = document.getElementById(`inputId`);
let inputCantidad = document.getElementById(`inputCantidad`);
let tramosAccesorios = [];
// let tramosAccesoriosFinal = [];
// let tmpListado = {};

loadTramoAccesorio();


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

////////////////////////////////////////////

let tmpListado = [];
function precargarArreglo() {
  
  for (let i = 0; i < tramosAccesorios.length; i++) {
    let accesorio = tramosAccesorios[i].accesorio;
    if (!EstaEnTmp(accesorio.idAccesorio, tmpListado)) {
      tmpListado.push({
        "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
        "idAccesorio": accesorio.idAccesorio,
        "nombre_accesorio": accesorio.nombre_accesorio,
        "cantidad": tramosAccesorios[i].cantidad,
        "tramo_precio_accesorio": tramosAccesorios[i].tramo_precio_accesorio
      });
    }  
  }
  console.log(tmpListado);
};

   // } 
       // else{
      // for (let j = i + 1; j < tramosAccesorios.length; j++) {
      //   if (accesorio.idAccesorio == tramosAccesorios[j].accesorio.idAccesorio) {
      //     tmpListado.push({
      //       "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
      //       "idAccesorio": accesorio.idAccesorio,
      //       "nombre_accesorio": accesorio.nombre_accesorio,
      //       "cantidad": tramosAccesorios[i].cantidad,
      //       "tramo_precio_accesorio": tramosAccesorios[i].tramo_precio_accesorio
      //     })
      //   }
      // }



// let tmpListado = [];
// function precargarArreglo() {
//   for (let i = 0; i < tramosAccesorios.length; i++) {
//     let accesorio = tramosAccesorios[i].accesorio;
//     if (!EstaEnTmp(accesorio.idAccesorio, tmpListado)) {
//       tmpListado.push({
//         "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
//         "idAccesorio": accesorio.idAccesorio,
//         "nombre_accesorio": accesorio.nombre_accesorio,
//         "cantidad": tramosAccesorios[i].cantidad,
//         "tramo_precio_accesorio": tramosAccesorios[i].tramo_precio_accesorio
//       })} else{
//       for (let j = i + 1; j < tramosAccesorios.length; j++) {
//         if (accesorio.idAccesorio == tramosAccesorios[j].accesorio.idAccesorio) {
//           tmpListado.push({
//             "idTramoAccesorio": tramosAccesorios[i].idTramoAccesorio,
//             "idAccesorio": accesorio.idAccesorio,
//             "nombre_accesorio": accesorio.nombre_accesorio,
//             "cantidad": tramosAccesorios[i].cantidad,
//             "tramo_precio_accesorio": tramosAccesorios[i].tramo_precio_accesorio
//           })
//         }
//       }
//     }
//   }
//   console.log(tmpListado);
// };

function EstaEnTmp(id, arreglo) {
  for (let t = 0; t < arreglo.length; t++) {
    if (id == arreglo[t].idAccesorio) {
      return true
    }
  }
  return false;
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




modificarListado.addEventListener('click', async () => {
  try {
    let tramoAccesorio = {
      "idTramoAccesorio": parseInt(inputId.value),
      "cantidad": parseInt(inputCantidad.value),
    };
    let response = await fetch("/tramoaccesorio/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tramoAccesorio)
    });
    if (response.ok) {
      load();
      inputId.value = "";
      inputCantidad.value = "";
    } else {
      divError.innerHTML = "Error en lectura de servidor";
    }
  } catch (error) {
    error.innerHTML = "Error en conexion al servidor";
  }
});

