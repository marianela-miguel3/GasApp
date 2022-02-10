let botonComenzar = document.getElementById("botonComenzar");

botonComenzar.addEventListener("click", () =>{
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if(!usuario){
        window.location.href = "usuario.html";
    }else{
        window.location.href = "loginUsuario.html";
    }
});
