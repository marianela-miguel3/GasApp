let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let contraseña = document.getElementById("contraseña");
let telefono = document.getElementById("telefono");
let domicilio = document.getElementById("domicilio");
let registrar = document.getElementById("registrarse");
let usuarios=[];

registrar.addEventListener('click',()=>{
    let usuario = {
        "nombre":nombre.value,
        "contraseña":contraseña.value,
        "domicilio":domicilio.value,
        "telefono":telefono.value,
        "email":email.value
    };
    crearUsuario(usuario);
    usuarios.push(usuario);
});

async function crearUsuario(usuario){
    let response= await fetch(`/usuario`,{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(usuario)
   });
   let r = await response.json();
   console.log(r);
}
