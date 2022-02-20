let loginEmail = document.getElementById("loginEmail"); //input email de ingreso
let loginContrasenia = document.getElementById("loginContrasenia"); //input contraseña de ingreso
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
            localStorage.setItem("nombre", usuarios[i].nombre);
            localStorage.setItem("idUsuario", usuarios[i].idUsuario);
            window.location.href = "accesorios.html";
            return true;
        }
        // else {
        //     alert("El usuario o la contraseña son incorrectos!");
        //     loginEmail.value = "";
        //     loginContrasenia.value = "";
        //     return false;
        // }
    };
    alert("El usuario o la contraseña son incorrectos!");
    loginEmail.value = "";
    loginContrasenia.value = "";
});

