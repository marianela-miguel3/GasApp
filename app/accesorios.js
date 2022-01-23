let idTramo=document.getElementById(`idTramo`);//input
let comienzoTramo=document.getElementById(`comienzoTramo`);//input
let finTramo=document.getElementById(`finTramo`);//input
let longitudReal=document.getElementById(`longitudReal`);//input
let longitudCalculo=document.getElementById(`longitudCalculo`);//input
let calorias=document.getElementById(`calorias`);//input
//let cargando=document.getElementById(`cargando`);//
let cargando2=document.getElementById(`cargando2`);//mensaje de carga los accesorios
//hasta aca
let mostrarError=document.getElementById(`mostrarError`);//mensaje de carga de tramosacessorios
let container=document.getElementById(`container`);//muestra los accesorios[]
let recarga=document.getElementById(`recarga`);//mensaje de carga de tramos
// let idTramo=document.getElementById(`idTramo`);
let accesorio=document.getElementById(`accesorio`);//input
let cantidad=document.getElementById(`cantidad`);//input
// let sumaEquivalente=document.getElementById(`sumaEquivalente`);//??
let precio=document.getElementById(`precio`);
let cargar=document.getElementById(`cargar`);//boton cargar los accesorios
let mostrar=document.getElementById(`mostrar`);//muestra los tramosaccesorios
let cargarTramo=document.getElementById(`cargarTramo`);//boton para agregar un tramo
let mostrarTA=document.getElementById(`mostrarTA`);//mostrar los tramos
let accesorios=[];
let tramosAccesorios=[];
let tramos=[];
let tramosAccesoriosCargados=[];

// loadTramoAccesorio();
loadAccesorio()
 
async function loadAccesorio() {
    cargando2.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/accesorios`);
      if (response.ok) {
        accesorios = await response.json();
        // console.log(accesorios);
        // accesorios = t;
        actualizarListado();
        cargando2.innerHTML = '';
      } else cargando2.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      cargando2.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }

  function actualizarListado() {
    html = '';
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

  async function loadTramoAccesorio() {//LOAD TRAMOACCESORIO
    //mostrarError.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramoaccesorio`);//me los busca
      if (response.ok) {
        tramosAccesorios = await response.json();//me los guarda en tramosAccesorios
        //console.log(tramosAccesorios);
         actualizarTramoAccesorio();
      } else mostrarError.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      mostrarError.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }

//para ir cargando los tramos-accesorios
 function cargarEquivalente(){
for (let i=0; i<accesorios.length; i++){
  if(accesorios[i].idAccesorio==accesorio.value){
      return accesorios[i].equivalente;
  }
}
}
function cargarPrecio(){
  for (let i=0; i<accesorios.length; i++){
    if(accesorios[i].idAccesorio==accesorio.value){
        return accesorios[i].precio;
    }
  }
  }
  cargar.addEventListener('click',()=>{
    let tramoAccesorio={
        // "idTramo": parseInt(idTramo.value),
        "idAccesorio": parseInt(accesorio.value),
        "cantidad":parseInt(cantidad.value),
        "equivalenteTramo":parseFloat(cargarEquivalente()*cantidad.value).toFixed(2),
        "tramo_precio_accesorio":cargarPrecio()*cantidad.value
    };
    crearTramoAccesorio(tramoAccesorio);
    tramosAccesoriosCargados.push(tramoAccesorio);
    actualizarTramoAccesorioCargado();
});


    async function crearTramoAccesorio(tramoAccesorio){
    let response= await fetch(`/tramoaccesorio`,{

      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(tramoAccesorio)
   });
   let r=await response.json();
  //  console.log(r)
  }

  async function actualizarTramoAccesorioCargado() {
    html = '';
    for (let i = 0; i <tramosAccesoriosCargados.length; i++) {
      html += `
                 <tr>
                     <td>${tramosAccesoriosCargados[i].idTramoAccesorio}</td>
                     <td>${tramosAccesoriosCargados[i].idAccesorio}</td>
                     <td>${tramosAccesoriosCargados[i].cantidad}</td>
                     <td>${tramosAccesoriosCargados[i].equivalenteTramo}</td>
                     <td>${tramosAccesoriosCargados[i].tramo_precio_accesorio}</td>
                     </tr>`;
    }
    mostrar.innerHTML = html;
  }

  // async function actualizarTramoAccesorio() {
  //   html = '';
  //   for (let i = 0; i <tramosAccesorios.length; i++) {
  //     html += `
  //                <tr>
  //                    <td>${tramosAccesorios[i].idTramoAccesorio}</td>
  //                    <td>${tramosAccesorios[i].idAccesorio}</td>
  //                    <td>${tramosAccesorios[i].cantidad}</td>
  //                    <td>${tramosAccesorios[i].equivalenteTramo}</td>
  //                    <td>${tramosAccesorios[i].tramo_precio_accesorio}</td>
  //                    </tr>`;
  //   }
  //   mostrar.innerHTML = html;
  // }

  cargarTramo.addEventListener('click',()=>{
    let tramo={
      "nombre_tramo": `${comienzoTramo.value} ${finTramo.value}`,
      "longitud_real": longitudReal.value,
      "longitud_de_calculo":longitudCalculo.value,
      "equivalente_total":calcularEquivalenteTotal(),
      "total":(calcularEquivalenteTotal() + parseInt(longitudCalculo.value)),
      "metros_cubicos":(calorias.value/9300).toFixed(2)
  };
  tramos.push(tramo);
  crearTramo(tramo);
  actualizarTramo();
  tramosAccesoriosCargados=[];
  idTramo.value=" ";
});


async function calcularEquivalenteTotal(){
  let total=0;
      for(let i=0;i<tramosAccesoriosCargados.length;i++){
        total+=tramosAccesoriosCargados[i].equivalenteTramo;
        }
        console.log(total);
      return total;
} 


async function crearTramo(tramo){
let response= await fetch("/tramos",{
  method: "POST",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify(tramo)
});
let r=await response.json();
}

  // async function loadTramoAccesorio() {
  //   cargando.innerHTML = `<h1>Loading.....</h1>`;
  //   try {
  //     let response = await fetch(`/tramoaccesorio`);
  //     if (response.ok) {
  //       tramosAccesorios = await response.json();
  //       // console.log(tramosAccesorios);
  //       cargando.innerHTML = '';
  //     } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
  //   } catch (err) {
  //     cargando.innerHTML = `<h1> ${err.message} </h1>`;
  //   }
  // }

  async function loadTramo() {
    recarga.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramos`);
      if (response.ok) {
        tramos = await response.json();
        actualizarTramo();
        recarga.innerHTML = '';
      } else recarga.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      recarga.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }

  async function actualizarTramo() {
    html = ``;
    for (let i = 0; i < tramos.length; i++) {
      html += `
                 <tr>
                     <td>${tramos[i].idTramo}</td>
                     <td>${tramos[i].nombre_tramo}</td>
                     <td>${tramos[i].longitud_real}</td>
                     <td>${tramos[i].longitud_de_calculo}</td>
                     <td>${tramos[i].equivalente_total}</td>
                     <td>${tramos[i].total}</td>
                     <td>${tramos[i].metros_cubicos}</td>
                     </tr>`;
    }
    mostrarTA.innerHTML = html;
    // container.insertColumn(-1).innerHTML = '<tr><td>'+artefacto.value+'</td>'
}