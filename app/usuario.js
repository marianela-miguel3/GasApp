let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let contrasenia = document.getElementById("contrasenia");
let telefono = document.getElementById("telefono");
let domicilio = document.getElementById("domicilio");
let registrar = document.getElementById("registrarse");
let contenido = document.getElementById("cargando")
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

registrar.addEventListener("click", async () => {
  let usuario = {
    "nombre": nombre.value,
    "contrasenia": contrasenia.value,
    "domicilio": domicilio.value,
    "telefono": telefono.value,
    "email": email.value
  };

  if (usuarios.length == 0) {
    crearUsuario(usuario);
    usuarios.push(usuario);
    loadUsuario();
    window.location.href = "loginUsuario.html";
    return true;     
  } else if (usuarios.length > 0) {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email == email.value) {
        alert("La Direccion de correo electronico usada ya existe!");
        nombre.value = "";
        contrasenia.value = "";
        domicilio.value = "";
        telefono.value = "";
        email.value = "";
        return false;
      }
    }
    crearUsuario(usuario);
    usuarios.push(usuario);
    loadUsuario();
    window.location.href = "loginUsuario.html";
  }
});

async function crearUsuario(usuario) {

  let response = await fetch("/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario)
  });
  let r = await response.json();
  console.log(r);
  return r;
};



