let cargando = document.getElementById(`cargando`);
let mostrar = document.getElementById(`mostrar`);
let modificarListado = document.getElementById(`modificarListado`);
let divError = document.getElementById(`error`);
let inputId = document.getElementById(`inputId`);
let inputCantidad = document.getElementById(`inputCantidad`);
let tramosAccesorios = [];
// let tramosAccesoriosFinal = [];
let tmpListado = {};
let arrayListado = [];
loadTramoAccesorio();


async function loadTramoAccesorio() {
  cargando.innerHTML = `<h1>Loading.....</h1>`;
  try {
    let response = await fetch(`/tramoaccesorio`);
    if (response.ok) {
      tramosAccesorios = await response.json();
      // console.log(tramosAccesorios);
      precargarArreglo(tramosAccesorios);
      actualizarTramoAccesorio();
      cargando.innerHTML = '';
    } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
  } catch (err) {
    cargando.innerHTML = `<h1> ${err.message} </h1>`;
  }
};

////////////////////////////////////////////

function precargarArreglo() {
  let filtro1 = [];
  // let accesoriosRecorrido = [];
  for (let t = 0; t < tramosAccesorios.length; t++) {
    filtro1 = tramosAccesorios[t];

    let identificadorAccesorio = filtro1.accesorio.idAccesorio
    console.log(identificadorAccesorio);
    while (identificadorAccesorio) {
      if (!identificadorAccesorio) {
        let arreglo = [];
        arreglo.push(identificadorAccesorio)
      }
    }
    console.log(arreglo);
  }
}





function actualizarTramoAccesorio() {
  html = '';
  for (let i = 0; i < arrayListado.length; i++) {
    html += `
                  <tr>
                     <td>${tmpListado[i].idTramoAccesorio}</td>
                     <td>${tmpListado[i].idAccesorio}</td>
                     <td>${tmpListado[i].nombre_accesorio}</td>
                     <td>${tmpListado[i].cantidad}</td>
                     <td>${tmpListado[i].tramo_precio_accesorio}</td>
                     </tr>`;
  }
  // console.log(arrayListado);
  mostrar.innerHTML = html;
}



modificarListado.addEventListener('click', async () => {
  try {
    let tramoAccesorio = {
      "idTramoAccesorio": parseInt(inputId.value),
      "cantidad": parseInt(inputCantidad.value),
    };
    let response = await fetch("/tramoaccesorio/", {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tramoAccesorio)
    });
    if (response.ok) {
      loadTramoAccesorio();
      inputId.value = "";
      inputCantidad.value = "";
    } else {
      divError.innerHTML = "Error en lectura de servidor";
    }
  } catch (error) {
    error.innerHTML = "Error en conexion al servidor";
  }
});





////////////////////////////////////////////////////
//Versiones de la funcion precargas arreglo


////////VERSION ANI
// function precargarArreglo() {
//   // console.log(tramosAccesorios);
//   let filtro1 = [];
//   for (let t = 0; t < tramosAccesorios.length; t++) {
//     filtro1 = tramosAccesorios[t];
//     console.log(filtro1);
//     for (let i = 0; i < filtro1.length; i++) {
//       let accesorioRecorrido = filtro1[i];
//        console.log(accesorioRecorrido);
//       //  if ( !tmpListado.hasOwnProperty(accesorioRecorrido.idAccesorio) ){
//       if (!tmpListado.hasOwnProperty(accesorioRecorrido.idAccesorio)) {
//         // tmpListado[accesorioRecorrido.idAccesorio]= {
//         tmpListado = {
//           "idTramoAccesorio": tramosAccesorios[t].idTramoAccesorio,
//           "idAccesorio": accesorioRecorrido.idAccesorio,
//           "nombre_accesorio": tramosAccesorios[t].nombre_accesorio,
//           "cantidad": tramosAccesorios[t].cantidad,
//           "tramo_precio_accesorio": tramosAccesorios[t].precio
//         }
//         arrayListado.push(tmpListado)
//       }
//       // console.log(accesorioRecorrido);
//     }
//   }
//   // console.log(arrayListado);
//   console.log(tmpListado);
// };

////////////////////

// //VERSION 4/2
// function precargarArreglo() {
//   for (let i = 0; i < tramosAccesorios.length; i++) {
//       if (!tramosAccesorios[i].accesorio.idAccesorio) {
//         console.log(tramosAccesorios[i].accesorio.idAccesorio);
//         tmpListado.push(tramosAccesorios[i]);
//         // let tramoAccesorio = {
//         //   "idTramoAccesorio":tramosAccesorios[i].idTramoAccesorio,
//         //   "idAccesorio": tramosAccesorios[i].accesorio.idAccesorio,
//         //   "nombre_accesorio": tramosAccesorios[i].accesorio.nombre_accesorio,
//         //   "cantidad": tramosAccesorios[i].accesorio.cantidad,
//         //   "tramo_precio_accesorio": tramosAccesorios[i].accesorio.precio
//         // }
//         console.log(tmpListado);
//       }
//       // console.log(tmpListado);
//   }
// };

///////////////////

//VERSION MARI
// function precargarArreglo() {
//   for (let t = 0; t < tramosAccesorios.length; t++) {
//     // console.log(tramosAccesorios);
//     let accesorios=[];
//     accesorios = tramosAccesorios[t].accesorio;
//     // console.log(accesorios);

//       // for (let i = 0; i < accesorios.length; i++) {
//       //  let accesorioRecorrido = accesorios[t];
//       //  console.log(accesorioRecorrido);
//        if (!accesorios.idAccesorio) {
//           tmpListado = {
//             // "idTramoAccesorio":tramosAccesorios[t].idTramoAccesorio,
//            "idAccesorio": accesorios.idAccesorio,
//            "nombre_accesorio": accesorios.nombre_accesorio,
//            "cantidad": accesorios.cantidad,
//            "tramo_precio_accesorio": accesorios.precio
//          }
//           arrayListado.push(tmpListado);
//         }
//       //  console.log(arrayListado);
//     // };//fin for 2

//   };//fin for 1
// };