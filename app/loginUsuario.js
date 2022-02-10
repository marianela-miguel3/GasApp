let loginEmail = document.getElementById("loginEmail"); //input email de ingreso
let loginContraseña = document.getElementById("loginContraseña"); //input contraseña de ingreso
let contraseñaOlvidada = document.getElementById("contraOlvidada"); // texto ¿Olvidaste Tu Contraseña?
let modificar = document.getElementById("modificar"); // div modificar que esta en oculto
let nombreNuevo = document.getElementById("nombreNuevo"); // campo nombre para modificar
let domicilioNuevo = document.getElementById("domicilioNuevo"); // campo domicilio para modificar
let telefonoNuevo = document.getElementById("telefonoNuevo"); // campo telefono para modificar
let emailNuevo = document.getElementById("emailNuevo"); // campo email para modificar
let contraNueva = document.getElementById("contraNueva"); // campo contraseña para modificar
let modifiContraseña = document.getElementById("modificarContraseña"); // boton para enviar y modificar los datos
let ingresar = document.getElementById("ingresar");
let contenido = document.getElementById("contenido") // muestra errores
let usuarios=[];

// loadUsuario();

// async function loadUsuario() {
//     try {
//         let response = await fetch("/usuario");
//         if(response.ok) {
//             usuarios = await response.json();
//             console.log(usuarios);

//         }else{
//             contenido.innerHTML="Error en lectura del servidor";
//         }
//     } catch (error) {
//         contenido.innerHTML="Error en conexion con servidor";
//     }
// }      

ingresar.addEventListener("click", () =>{
    let usuario = JSON.parse(localStorage.getItem("usuario"));
        if( (usuario.email == loginEmail.value) && (usuario.contraseña == loginContraseña.value) ){
            window.location.href = "accesorios.html";
        }else{
            alert("El Email o la contraseña son Incorrectos");
        }
    
});

// modifiContraseña.addEventListener("click", async () => {
//     try {
//         let usuario = {
//             "nombre":nombreNuevo.value,
//             "contraseña":contraNueva.value,
//             "domicilio":domicilioNuevo.value,
//             "telefono":telefonoNuevo.value,
//             "email":emailNuevo.value,
//         }
//         let response = await fetch(`/usuario/${emailNuevo.value}`, {
//                 method: "PUT",
//                 headers: {"Content-Type" : "application/json"
//             },
//             body:JSON.stringify(usuario)
//         });
//         if(response.ok) {
//             loadUsuario();
//         }else{
//             contenido.innerHTML="Error en lectura del servidor";
//         }
//     } catch (error) {
//         contenido.innerHTML="Error en conexion con servidor";
//     }
// });

contraseñaOlvidada.addEventListener('click', ()=>{
    modificar.classList.remove("modificar");
    modificar.classList.add("mostrarModificar");
});
