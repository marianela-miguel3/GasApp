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
let calcularEquivalente=document.getElementById(`calcularEquivalente`);
let tramosAccesorios=[];
load();
loadTramoAccesorio();

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

  async function loadTramoAccesorio() {
    // mostrar.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramoaccesorio`);
      if (response.ok) {
        tramosAccesorios = await response.json();
        actualizarTramoAccesorio();
        // cargarEquivalenteTotal();
        // cargando.innerHTML = '';
      } else mostrar.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      mostrar.innerHTML = `<h1> ${err.message} </h1>`;
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
        "idTramo": parseInt(idTramo.value),
        "idAccesorio": parseInt(accesorio.value),
        "cantidad":parseInt(cantidad.value),
        "equivalenteTramo":(cargarEquivalente()*cantidad.value).toFixed(2),
        "tramo_precio_accesorio":cargarPrecio()*cantidad.value
    };
    crearTramoAccesorio(tramoAccesorio);
    tramosAccesorios.push(tramoAccesorio);
    actualizarTramoAccesorio();
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
   console.log(r)
  }

  function actualizarTramoAccesorio() {
    html = '';
    for (let i = 0; i < tramosAccesorios.length; i++) {
      html += `
                 <tr>
                     <td>${tramosAccesorios[i].idTramoAccesorio}</td>
                     <td>${tramosAccesorios[i].idTramo}</td>
                     <td>${tramosAccesorios[i].idAccesorio}</td>
                     <td>${tramosAccesorios[i].cantidad}</td>
                     <td>${tramosAccesorios[i].equivalenteTramo}</td>
                     <td>${tramosAccesorios[i].tramo_precio_accesorio}</td>
                     </tr>`;
    }
    mostrar.innerHTML = html;
  }

  calcularEquivalente.addEventListener('click',()=>{
    let mostrarCalculo=document.getElementById(`mostrarCalculo`);
      let total=0;
      for(let i=0; i<tramosAccesorios.length; i++){
        if(tramosAccesorios[i].idTramo==idTramo.value){
          total+=tramosAccesorios[i].equivalenteTramo;
        }
        mostrarCalculo.innerHTML=parseInt(total);
      }
  });