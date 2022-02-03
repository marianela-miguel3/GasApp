let cargando=document.getElementById(`cargando`);
let mostrar=document.getElementById(`mostrar`);
let modificarListado=document.getElementById(`modificarListado`);
let error=document.getElementById(`error`);
let inputId=document.getElementById(`inputId`);
let inputCantidad=document.getElementById(`inputCantidad`);
let tramosAccesorios=[];
loadTramoAccesorio();
let tramosAccesoriosFinal=[];
// let tmpListado = {};
// let tmpListado = [];

  function actualizarTramoAccesorio() {
    html = '';
    for (let i = 0; i <tmpListado.length; i++) {
      html += `
                  <tr>
                     <td>${tmpListado[i].accesorio.idTramoAccesorio}</td>
                     <td>${tmpListado[i].accesorio.idAccesorio}</td>
                     <td>${tmpListado[i].accesorio.nombre_accesorio}</td>
                     <td>${tmpListado[i].cantidad}</td>
                     <td>${tmpListado[i].tramo_precio_accesorio}</td>
                     </tr>`;
    }
    mostrar.innerHTML = html;
  }

// let tmpListado = {}
// function precargarArreglo(){
//     for (let t=0; t<tramosAccesorios.length; t++){
//       // console.log(tramosAccesorios);
//       let accesorio=tramosAccesorios[t].accesorio;//deberia ir con s
//         // console.log(accesorios);
//          for (let i=0;i<accesorio.length;i++){
//              let accesorioRecorrido=accesorio[t];
//              console.log(accesorioRecorrido);
//               //  if ( !tmpListado.hasOwnProperty(accesorioRecorrido.idAccesorio) ){
//                 if ( !tmpListado.hasOwnProperty(accesorio[accesorioRecorrido]) ){
//                   // tmpListado[accesorioRecorrido.idAccesorio]= {
//                     tmpListado = {
//                     "idTramoAccesorio":tramosAccesorios[t].idTramoAccesorio,
//                     "idAccesorio":accesorioRecorrido.idAccesorio,
//                     "nombre_accesorio":tramosAccesorios[t].nombre_accesorio,
//                     "cantidad":tramosAccesorios[t].cantidad,
//                     "tramo_precio_accesorio":tramosAccesorios[t].precio
//                   }
//                   // arregloX.push(tmpListado);
//                 }
//                 console.log(accesorioRecorrido);
//       }
//     }
//     console.log(tmpListado);
// }          

function precargarArreglo(){
  let tmpListado=[];
    for (let t=0; t<tramosAccesorios.length; t++){
      // console.log(tramosAccesorios);
      let accesorios=tramosAccesorios[t].accesorio;
        // console.log(accesorios);
         for (let i=0;i<accesorios.length;i++){
            //  let accesorioRecorrido=accesorios[t];
               if ( !accesorios[i].idAccesorio) {
                  tramoAccesorio= {
                    "idTramoAccesorio":tramosAccesorios[t].idTramoAccesorio,
                    "idAccesorio":accesorios[i].idAccesorio,
                    "nombre_accesorio":accesorios[i].nombre_accesorio,
                    "cantidad":accesorios[i].cantidad,
                    "tramo_precio_accesorio":accesorios[i].precio
                  }
                  tmpListado.push(tramoAccesorio);
        }
      }
      console.log(tmpListado);
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
        precargarArreglo();
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