let cargando=document.getElementById(`cargando`);
let mostrar=document.getElementById(`mostrar`);
let modificarListado=document.getElementById(`modificarListado`);
let error=document.getElementById(`error`);
let inputId=document.getElementById(`inputId`);
let inputCantidad=document.getElementById(`inputCantidad`);
let tramosAccesorios=[];
loadTramoAccesorio();
let tramosAccesoriosFinal=[];
let tmpListado = {};

// function listadoFinal(listado){
//   tramosAccesorios

// }

// if(tramosAccesorios[i])

  function actualizarTramoAccesorio() {
    // precargarArreglo(tramosAccesorios);
    html = '';
    for (let i = 0; i <tmpListado.length; i++) {
      html += `
                  <tr id="${tramosAccesorios[i]["accesorio"].idAccesorio}">>
                     <td>${tmpListado[i].idTramoAccesorio}</td>
                     <td>${tmpListado[i].accesorio.idAccesorio}</td>
                     <td>${tmpListado[i].accesorio.nombre_accesorio}</td>
                     <td>${tmpListado[i].cantidad}</td>
                     <td>${tmpListado[i].tramo_precio_accesorio}</td>
                     </tr>`;
    }
    mostrar.innerHTML = html;
  }

// let tmpListado = {}
function precargarArreglo(tramosAccesorios){
    for (let i=0; i< tramosAccesorios.length; i++)
        if ( !tmpListado.hasOwnProperty(tramosAccesorios[i].accesorio.idAccesorio) ){
            tmpListado[tramosAccesorios[i].accesorio.idAccesorio] = tramosAccesorios[i]
        }          
} 
  //id="${tramosAccesorios[i]["accesorio"].idAccesorio}">
  ///////para consultar aca necesitariamos mostrar en el listado final
  //////una lista de los nombres de los accesorios ademas del id
  
  async function loadTramoAccesorio() {
    cargando.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramoaccesorio`);
      if (response.ok) {
        tramosAccesorios = await response.json();
        precargarArreglo(tramosAccesorios);
        actualizarTramoAccesorio();
        cargando.innerHTML = '';
      } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      cargando.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }

  modificarListado.addEventListener('click',async ()=>{
    try{
        let tramoAccesorio={
            "idTramoAccesorio":parseInt(inputId.value),
            "cantidad":parseInt(inputCantidad.value),
        };
        let response=await fetch("/tramoaccesorio/",{
            method:`PUT`,
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(tramoAccesorio)
        });
        if(response.ok){
            loadTramoAccesorio();
            inputId.value="";
            inputCantidad.value="";
        }else{
          error.innerHTML="Error en lectura de servidor";
        }
    }catch(error){
      error.innerHTML="Error en conexion al servidor";
    }  
  });


  // function actualizarTramosAccesorios() {
  // let padre=document.createElement(`<tr>`);
  // let elemento=document.createElement(`<td>`);
  // let contenido=parseInt(cargarEquivalenteTotal());
  // padre.appendChild(elemento);
  // elemento.appendChild(contenido);
  // mostrarTA.innerHTML=elemento;
  // }