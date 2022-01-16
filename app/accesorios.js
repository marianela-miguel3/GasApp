let cargando=document.getElementById(`cargando`);
let container=document.getElementById(`container`);
let accesorios=[];
let idTramo=document.getElementById(`idTramo`);
let accesorio=document.getElementById(`accesorio`);
let cantidad=document.getElementById(`cantidad`);
let sumaEquivalente=document.getElementById(`sumaEquivalente`);
let precio=document.getElementById(`precio`);
let cargar=document.getElementById(`cargar`);
let mostrar=document.getElementById(`mostrar`);
let tramosAccesorios=[];
load();

async function load() {
    cargando.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/accesorios`);
      if (response.ok) {
        accesorios = await response.json();
        console.log(accesorios);
        // accesorios = t;
        actualizarListado();
        cargando.innerHTML = '';
      } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      cargando.innerHTML = `<h1> ${err.message} </h1>`;
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
    console.log(accesorios);
    let tramoAccesorio={
        // "idTramo":idTramo.value,
        "idTramo": idTramo.value,
        "idAccesorio": accesorio.value,
        "cantidad":cantidad.value,
        "equivalenteTramo":(cargarEquivalente()*cantidad.value).toFixed(2),
        "tramo_precio_accesorio":cargarPrecio()*cantidad.value
    };
    tramosAccesorios.push(tramoAccesorio);
    crearTramoAccesorio(tramoAccesorio);
    actualizarTramoAccesorio();
});


    async function crearTramoAccesorio(tramoAccesorio){
    let response= await fetch("/tramoAccesorio",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(tramoAccesorio)
   });
   let r=await response.json();
  }

  function actualizarTramoAccesorio() {
    html = '';
    for (let i = 0; i < tramosAccesorios.length; i++) {
      html += `
                 <tr>
                     <td>${tramosAccesorios[i].idAccesorio}</td>
                     <td>${tramosAccesorios[i].cantidad}</td>
                     <td>${tramosAccesorios[i].equivalenteTramo}</td>
                     <td>${tramosAccesorios[i].tramo_precio_accesorio}</td>
                     </tr>`;
    }
    mostrar.innerHTML = html;
  }