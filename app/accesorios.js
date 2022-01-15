let cargando=document.getElementById(`cargando`);
let container=document.getElementById(`container`);
let accesorios=[];
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