let cargando=document.getElementById(`cargando`);
let mostrarTA=document.getElementById(`mostrarTA`)
let mostrarEquivalente=document.getElementById(`mostrarEquivalente`);
let tramos=[];
let tramosAccesorios=[];
loadTramo();
loadTramoAccesorio();

async function loadTramo() {
    cargando.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramos`);
      if (response.ok) {
        tramos = await response.json();
        actualizarTramos();
        cargando.innerHTML = '';
      } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      cargando.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }
  function actualizarTramos() {
    html = '';
    for (let i = 0; i < tramos.length; i++) {
      html += `<tr>
                     <td>${tramos[i].nombre_tramo}</td>
                     <td>${tramos[i].longitud_real}</td>
                     <td>${tramos[i].longitud_de_calculo}</td>
                     <td>${tramos[i].metros_cubicos}</td>
                     </tr>`;
    }
    mostrarTA.innerHTML = html;
  }
  async function loadTramoAccesorio() {
    cargando.innerHTML = `<h1>Loading.....</h1>`;
    try {
      let response = await fetch(`/tramoAccesorio`);
      if (response.ok) {
        tramosAccesorios = await response.json();
        cargando.innerHTML = '';
      } else cargando.innerHTML = `<h1>Error=Failed URL</h1>`;
    } catch (err) {
      cargando.innerHTML = `<h1> ${err.message} </h1>`;
    }
  }

  function cargarEquivalenteTotal(){
      let total=0;
      for(let i=0; i<tramosAccesorios.length; i++){
          total+=tramosAccesorios[i].equivalenteTramo;
      }
      return total;
  }

  calcularEquivalente.addEventListener('click',()=>{
   mostrarEquivalente.innerHTML=cargarEquivalenteTotal();
});

//   function actualizarTramosAccesorios() {
//   let padre=document.createElement("tr");
//   let elemento=document.createElement("td");
//   let contenido=document.createTextNode(cargarEquivalenteTotal());
//   padre.appendChild(elemento);
//   mostrarTA.appendChild(padre);
//   elemento.appendChild(contenido);
//   }