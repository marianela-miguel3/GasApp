let idTramo=document.getElementById(`idTramo`);
let comienzoTramo=document.getElementById(`comienzoTramo`);
let finTramo=document.getElementById(`finTramo`);
let longitudReal=document.getElementById(`longitudReal`);
let longitudCalculo=document.getElementById(`longitudCalculo`);
let artefacto=document.getElementById(`artefacto`);
let calorias=document.getElementById(`calorias`);
let container=document.getElementById(`container`);
let agregarTramo=document.getElementById(`agregarTramo`);
let tramos=[];

agregarTramo.addEventListener('click',()=>{
    let tramo={
        // "idTramo":idTramo.value,
        "nombre_tramo": `${comienzoTramo.value} ${parseInt(finTramo.value)}`,
        "longitud_real": longitudReal.value,
        "longitud_de_calculo":longitudCalculo.value,
        "metros_cubicos":(calorias.value/9300).toFixed(2)
    };
    tramos.push(tramo);
    crearTramo(tramo);
    actualizarTramo();
});


    async function crearTramo(tramo){
    let response= await fetch("/tramos",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(tramo)
   });
   let r=await response.json();
   console.log(r);
   console.log(comienzoTramo);
  }

  async function actualizarTramo() {
    html = '';
    for (let i = 0; i < tramos.length; i++) {
      html += `
                 <tr>
                     <td>${artefacto.value}</td>
                     <td>${tramos[i].nombre_tramo}</td>
                     <td>${tramos[i].longitud_real}</td>
                     <td>${tramos[i].longitud_de_calculo}</td>
                     <td>${tramos[i].metros_cubicos}</td>
                     </tr>`;
    }
    container.innerHTML = html;
}

