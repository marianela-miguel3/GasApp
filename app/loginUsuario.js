let loginEmail = document.getElementById("loginEmail"); //input email de ingreso
let loginContrasenia = document.getElementById("loginContrasenia"); //input contraseña de ingreso
let contraseniaOlvidada = document.getElementById("contraOlvidada"); // texto ¿Olvidaste Tu Contraseña?
let modificar = document.getElementById("modificar"); // div modificar que esta en oculto
let nombreNuevo = document.getElementById("nombreNuevo"); // campo nombre para modificar
let domicilioNuevo = document.getElementById("domicilioNuevo"); // campo domicilio para modificar
let telefonoNuevo = document.getElementById("telefonoNuevo"); // campo telefono para modificar
let emailNuevo = document.getElementById("emailNuevo"); // campo email para modificar
let contraNueva = document.getElementById("contraNueva"); // campo contraseña para modificar
let modifiContrasenia = document.getElementById("modificarContrasenia"); // boton para enviar y modificar los datos
let ingresar = document.getElementById("ingresar");
let contenido = document.getElementById("contenido") // muestra errores
let usuarios = [];

loadUsuario();

async function loadUsuario() {
    try {
        let response = await fetch("/usuario");
        if (response.ok) {
            usuarios = await response.json();
            console.log(usuarios);

        } else {
            contenido.innerHTML = "Error en lectura del servidor";
        }
    } catch (error) {
        contenido.innerHTML = "Error en conexion con servidor";
    }
}

ingresar.addEventListener("click", async () => {
    for (let i = 0; i < usuarios.length; i++) {
        console.log(usuarios)
        if ((usuarios[i].email === loginEmail.value) && (usuarios[i].contrasenia === loginContrasenia.value)) {
            console.log(usuarios[i].email);
            console.log(usuarios[i].contrasenia);
            console.log("Entro en el if");
            window.location.href = "accesorios.html";
            return true;
        }
    };
    alert("El usuario o la contraseña son incorrectos!");
    loginEmail.value = "";
    loginContrasenia.value = "";
});


// modifiContrasenia.addEventListener("click", async () => {
//     try {
//         let usuario = {
//             "nombre":nombreNuevo.value,
//             "contrasenia":contraNueva.value,
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
// ----------------------------LOCAL STORANGE-------------------------

// ingresar.addEventListener("click", () =>{
//     let usuario = JSON.parse(localStorage.getItem("usuario"));
//         if( (usuario.email == loginEmail.value) && (usuario.contrasenia == loginContrasenia.value) ){
//             window.location.href = "accesorios.html";
//         }else{
//             alert("El Email o la contraseña son Incorrectos");
//         }

// });

contraseniaOlvidada.addEventListener('click', () => {
    modificar.classList.remove("modificar");
    modificar.classList.add("mostrarModificar");
});
