let idTramo = document.getElementById("idTramo"); //input
let comienzoTramo = document.getElementById("comienzoTramo"); //input
let finTramo = document.getElementById("finTramo"); //input
let longitudReal = document.getElementById("longitudReal"); //input
let longitudCalculo = document.getElementById("longitudCalculo"); //input
let artefacto = document.getElementById("artefacto");
let calorias = document.getElementById("calorias"); //input
//let cargando=document.getElementById("cargando");//
let cargando2 = document.getElementById("cargando2"); //mensaje de carga los accesorios
//hasta aca
let mostrarError = document.getElementById("mostrarError"); //mensaje de carga de tramosacessorios
let container = document.getElementById("container"); //muestra los accesorios[]
let recarga = document.getElementById("recarga"); //mensaje de carga de tramos
// let idTramo=document.getElementById("idTramo");
let accesorio = document.getElementById("accesorio"); //input
let cantidad = document.getElementById("cantidad"); //input
// let sumaEquivalente=document.getElementById("sumaEquivalente");//??
let precio = document.getElementById("precio");
let cargar = document.getElementById("botonCargarAcc"); //boton cargar los accesorios
let mostrar = document.getElementById("mostrar"); //muestra los tramosaccesorios
let cargarTramo = document.getElementById("botonCargarTramo"); //boton para agregar un tramo
let mostrarTA = document.getElementById("mostrarTA"); //mostrar los tramos
let accesorios = [];
let tramosAccesorios = [];
let tramos = [];
let tramosAccesoriosCargados = [];
////////////////////////////
let eliminarTramo=document.getElementById("eliminarTramo");
// let idTramoAEliminar=document.getElementById("idTramoAEliminar");
let modificarTramo=document.getElementById("modificarTramo");
let idTramoAModificar=document.getElementById("idTramoAModificar");
let inputId=document.getElementById("inputId");
let inputEquivalente=document.getElementById("inputEquivalente")
let inputTotal=document.getElementById("inputTotal");
let inputConsumo=document.getElementById("inputConsumo");
let inputDiametro=document.getElementById("inputDiametro");
let errorTramoActualizado=document.getElementById("errorTramoActualizado");
let consumos=[];

// let valoresPosibles=[];
loadAccesorio();

async function loadAccesorio() {
  cargando2.innerHTML = "<h1>Loading.....</h1>";
  try {
    let response = await fetch("/accesorios");
    if (response.ok) {
      accesorios = await response.json();
      // accesorios = t;
      actualizarListado();
      cargando2.innerHTML = "";
    } else cargando2.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
    cargando2.innerHTML = `<h1> ${err.message} </h1>`;
  }
}

function actualizarListado() {
  html = "";
  for (let i = 0; i < accesorios.length; i++) {
    html += `
                 <tr>
                     <td>${accesorios[i].idAccesorio}</td>
                     <td>${accesorios[i].nombre_accesorio}</td>
                     <td>${accesorios[i].diametro}</td>
                     <td>${accesorios[i].equivalente}</td>
                     <td>${accesorios[i].precio}</td>
                     </tr>`;
  }
  container.innerHTML = html;
}

async function loadTramoAccesorio() {
  //LOAD TRAMOACCESORIO
  // mostrarError.innerHTML = "<h1>Loading.....</h1>";
  try {
    let response = await fetch("/tramoaccesorio"); //me los busca
    if (response.ok) {
      tramosAccesorios = await response.json(); //me los guarda en tramosAccesorios
      //console.log(tramosAccesorios);
      actualizarTramoAccesorio();
    } else mostrarError.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
    mostrarError.innerHTML = `<h1> ${err.message} </h1>`;
  }
}

//para ir cargando los tramos-accesorios
function cargarEquivalente() {
  for (let i = 0; i < accesorios.length; i++) {
    if (accesorios[i].idAccesorio == accesorio.value) {
      return accesorios[i].equivalente;
    }
  }
}
function cargarPrecio() {
  for (let i = 0; i < accesorios.length; i++) {
    if (accesorios[i].idAccesorio == accesorio.value) {
      return accesorios[i].precio;
    }
  }
}
cargar.addEventListener("click", () => {
  let tramoAccesorio = {
    idAccesorio: parseInt(accesorio.value),
    cantidad: parseInt(cantidad.value),
    equivalenteTramo: parseFloat(cargarEquivalente() * cantidad.value).toFixed(
      2,
),
    tramo_precio_accesorio: cargarPrecio() * cantidad.value,
  };
  crearTramoAccesorio(tramoAccesorio);
  tramosAccesoriosCargados.push(tramoAccesorio);
  actualizarTramoAccesorioCargado();
  accesorio.value = "";
  cantidad.value = "";
});

async function crearTramoAccesorio(tramoAccesorio) {
  let response = await fetch("/tramoaccesorio", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tramoAccesorio),
  });
  let r = await response.json();
}

function actualizarTramoAccesorioCargado() {
  html = "";
  for (let i = 0; i < tramosAccesoriosCargados.length; i++) {
    html += `
                 <tr>
                     <td>${tramosAccesoriosCargados[i].idAccesorio}</td>
                     <td>${tramosAccesoriosCargados[i].cantidad}</td>
                     <td>${tramosAccesoriosCargados[i].equivalenteTramo}</td>
                     <td>${tramosAccesoriosCargados[i].tramo_precio_accesorio}</td>
                     </tr>`;
  }
  mostrar.innerHTML = html;
}

cargarTramo.addEventListener("click", async () => {
  let diametro = await calcularDiametro();
  parseInt(diametro);
  let total = calcularTotal();
  parseFloat(total);
  let equivalente = calcularEquivalenteTotal();
  parseFloat(equivalente);
  let tramo = {
    nombre_tramo: `${comienzoTramo.value}-${finTramo.value}`,
    longitud_real: longitudReal.value,
    longitud_de_calculo: longitudCalculo.value,
    artefacto:artefacto.value,
    equivalente_total: equivalente,
    total: total,
    metros_cubicos: (calorias.value / 9300).toFixed(2),
    diametro_de_calculo: diametro,
  };
  tramos.push(tramo);
  crearTramo(tramo);
  loadTramo();
  tramosAccesoriosCargados = [];
});

function calcularTotal() {
  let a = calcularEquivalenteTotal();
  let b = longitudCalculo.value;
  suma = parseFloat(a) + parseFloat(b);
  return parseFloat(suma);
}
function calcularEquivalenteTotal() {
  let total = 0;
  for (let i = 0; i < tramosAccesoriosCargados.length; i++) {
    total += parseFloat(tramosAccesoriosCargados[i].equivalenteTramo);
  }
  return total;
}

async function buscarPorLongitud() {
  //FUNCIONA
  let valor = calcularTotal();
  let response = await fetch(`/consumo/${parseInt(valor)}`);
  if (response.ok) {
    consumos = await response.json();
    // actualizarPublicaciones();
    console.log(consumos);
  }
  return consumos;
}

async function calcularDiametro() {
  //tenemos que hacer un case
  let valoresPosibles = await buscarPorLongitud();
  let consumoTramo = (calorias.value / 9300).toFixed(2);
  for (let i = 0; i < valoresPosibles.length; i++) {
    console.log(valoresPosibles);
    if (valoresPosibles[i].cantidad_consumo > consumoTramo) {
      console.log(valoresPosibles[i].diametro_canio);
      console.log(valoresPosibles[i].cantidad_consumo);
      return valoresPosibles[i].diametro_canio;
        } else if (valoresPosibles[i + 1].cantidad_consumo > consumoTramo) {
        console.log(valoresPosibles[i + 1].diametro_canio);
        return valoresPosibles[i + 1].diametro_canio;
         } else if (valoresPosibles[i + 2].cantidad_consumo > consumoTramo) {
          console.log(valoresPosibles[i + 2].diametro_canio);
          return valoresPosibles[i + 2].diametro_canio;
            } else if (valoresPosibles[i + 3].cantidad_consumo > consumoTramo) {
              console.log(valoresPosibles[i + 3].diametro_canio);
            return valoresPosibles[i + 3].diametro_canio;
              } else {
              return valoresPosibles[i + 4].diametro_canio;
            }
  }
  valoresPosibles = [];
}

async function crearTramo(tramo) {
  let response = await fetch("/tramos", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tramo),
  });
  let r = await response.json();
}

async function loadTramo() {
  recarga.innerHTML = "<h1>Loading.....</h1>";
  try {
    let response = await fetch("/tramos");
    if (response.ok) {
      tramos = await response.json();
      console.log(tramos);
      actualizarTramo();
      recarga.innerHTML = "";
    } else recarga.innerHTML = "<h1>Error=Failed URL</h1>";
  } catch (err) {
    recarga.innerHTML = `<h1> ${err.message} </h1>`;
  }
}

function actualizarTramo() {
  console.log(tramos)
  html = "";
  for (let i = 0; i < tramos.length; i++) {
    html += `
                 <tr>
                     <td>${tramos[i].idTramo}</td>
                     <td>${tramos[i].nombre_tramo}</td>
                     <td>${tramos[i].longitud_real}</td>
                     <td>${tramos[i].longitud_de_calculo}</td>
                     <td>${tramos[i].artefacto}</td>
                     <td>${tramos[i].equivalente_total}</td>
                     <td>${tramos[i].total}</td>
                     <td>${tramos[i].metros_cubicos}</td>
                     <td>${tramos[i].diametro_de_calculo}</td>
                     <td>${tramos[i].diametro_adoptado}</td>
                     </tr>`;
  }
  mostrarTA.innerHTML = html;
  longitudReal.value = "";
  longitudCalculo.value = "";
  calorias.value = "";
}

eliminarTramo.addEventListener("click", async () => {
  try {
    let response = await fetch(`/tramos/${inputId.value}`, {
      method: `DELETE`,
      headers: {
        'Content-Type': 'aplicattion/json',
      },
    });
    if (response.ok) {
      loadTramo();
      idTramoAEliminar.value = "";
    } else {
      error.innerHTML = "Error en la lectura del servidor";
    }
  } catch (error) {
    error.innerHTML = "Error en la conexion del servidor";
  }
  inputId.value="";
});


 modificarTramo.addEventListener("click",async ()=>{
  let diametroModificado = await calcularDiametroModificado();
  console.log(diametroModificado);
  // parseInt(diametroModificado);
  try{
      let tramo={
          idTramo:parseInt(inputId.value),
          equivalente_total:parseFloat(inputEquivalente.value),
          total:parseFloat(inputTotal.value),
          metros_cubicos:parseFloat(inputConsumo.value),
          diametro_de_calculo:diametroModificado,
          diametro_adoptado:parseInt(inputDiametro.value)
      };
      let response=await fetch("/tramos/",{
          method:`PUT`,
          headers:{ "Content-Type":"application/json"},
          body:JSON.stringify(tramo)
        });
        
      if(response.ok){
        console.log(tramo);
          loadTramo();
          inputId.value="";
          inputEquivalente.value="";
          inputTotal.value="";
          inputConsumo.value="";
      }else{
        errorTramoActualizado.innerHTML="Error en lectura de servidor";
      }
  }catch(error){
    errorTramoActualizado.innerHTML="Error en conexion al servidor";
  }  

});

async function buscarPorLongitudModificado() {
  //FUNCIONA
  // let valor = calcularTotal();
  let response = await fetch(`/consumo/${parseInt(inputTotal.value)}`);
  if (response.ok) {
    consumos = await response.json();
    // actualizarPublicaciones();
    console.log(consumos);
  }
  return consumos;
}

async function calcularDiametroModificado() {
  //tenemos que hacer un case
  let valoresPosibles = await buscarPorLongitudModificado();
  let consumoTramo = parseFloat(inputConsumo.value);
  for (let i = 0; i < valoresPosibles.length; i++) {
    console.log("entre");
     console.log(valoresPosibles);
    if (valoresPosibles[i].cantidad_consumo > consumoTramo) {
      console.log(valoresPosibles[i].diametro_canio);
      console.log(valoresPosibles[i].cantidad_consumo);
      return valoresPosibles[i].diametro_canio;
        } else if (valoresPosibles[i + 1].cantidad_consumo > consumoTramo) {
        console.log(valoresPosibles[i + 1].diametro_canio);
        return valoresPosibles[i + 1].diametro_canio;
         } else if (valoresPosibles[i + 2].cantidad_consumo > consumoTramo) {
          console.log(valoresPosibles[i + 2].diametro_canio);
          return valoresPosibles[i + 2].diametro_canio;
            } else if (valoresPosibles[i + 3].cantidad_consumo > consumoTramo) {
              console.log(valoresPosibles[i + 3].diametro_canio);
            return valoresPosibles[i + 3].diametro_canio;
              } else {
              return valoresPosibles[i + 4].diametro_canio;
            }
  }
  valoresPosibles = [];
}
