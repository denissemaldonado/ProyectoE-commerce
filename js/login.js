function login(){
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("contraseña").value;

    if (email === "" || contraseña === ""){
        alert ("Debe completar ambos campos.");
    }else{
        sessionStorage.setItem('email', email);
        location.href="index.html";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("ingresar").addEventListener('click', () => {
        login();
    })
})