//EN TEORIA NO LO VAMOS A USAR MAS//

// let idTramo=document.getElementById(`idTramo`);
// let comienzoTramo=document.getElementById(`comienzoTramo`);
// let finTramo=document.getElementById(`finTramo`);
// let longitudReal=document.getElementById(`longitudReal`);
// let longitudCalculo=document.getElementById(`longitudCalculo`);
// let calorias=document.getElementById(`calorias`);
// let container=document.getElementById(`container`);
// let agregarTramo=document.getElementById(`agregarTramo`);
// let artefacto=document.getElementById(`artefacto`);
// let eliminarTramo=document.getElementById(`eliminarTramo`)
// let idTramoAEliminar=document.getElementById(`idTramoAEliminar`);
// let error=document.getElementById(`error`);
// let cargando=document.getElementById(`cargando`);
// let tramos=[];
// loadTramo();


// async function loadTramo() {
//   cargando.innerHTML = `<h1>Loading.....</h1>`;
//   try {
//     let response = await fetch(`/tramos`);
//     if (response.ok) {
//       tramos = await response.json();
//       actualizarTramo();
//       cargando.innerHTML = '';
//     } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
//   } catch (err) {
//     cargando.innerHTML = `<h1> ${err.message} </h1>`;
//   }
// }
// agregarTramo.addEventListener('click',()=>{
//     let tramo={
//         // "idTramo":idTramo.value,
//         // "artefacto":artefacto.value,
//         "nombre_tramo": `${comienzoTramo.value} ${finTramo.value}`,
//         "longitud_real": longitudReal.value,
//         "longitud_de_calculo":longitudCalculo.value,
//         "metros_cubicos":(calorias.value/9300).toFixed(2)
//     };
//     tramos.push(tramo);
//     crearTramo(tramo);
//     actualizarTramo();
// });


//     async function crearTramo(tramo){
//     let response= await fetch("/tramos",{
//       method: "POST",
//       headers:{
//         "Content-Type":"application/json",
//       },
//       body:JSON.stringify(tramo)
//    });
//    let r=await response.json();
//   }

//   async function actualizarTramo() {
//     html = ``;
//     for (let i = 0; i < tramos.length; i++) {
//       html += `
//                  <tr>
//                      <td>${tramos[i].idTramo}</td>
//                      <td>${tramos[i].nombre_tramo}</td>
//                      <td>${tramos[i].longitud_real}</td>
//                      <td>${tramos[i].longitud_de_calculo}</td>
//                      <td>${tramos[i].metros_cubicos}</td>
//                      <td>${artefacto.value}</td>
//                      </tr>`;
//     }
//     container.innerHTML = html;
//     // container.insertColumn(-1).innerHTML = '<tr><td>'+artefacto.value+'</td>'
// }

// eliminarTramo.addEventListener('click', async ()=>{
//  try{
//   let response=await fetch(`/tramos/${idTramoAEliminar.value}`,{
//     method:`DELETE`,
//     headers:{
//         "Content-Type":"aplicattion/json"
//     }
// });
//       if(response.ok){
//       loadTramo()
//       idTramoAEliminar.value="";
//     }else{
//       error.innerHTML="Error en la lectura del servidor";
//     }
//     }catch(error){
//     error.innerHTML="Error en la conexion del servidor";
//     }
// });


