let inputs = document.getElementsByClassName("form-control");

let inputName = document.getElementById("nombre1");
let inputSecName = document.getElementById("nombre2"); 
let inputLastName = document.getElementById("apellido1");
let inputSecLastName =  document.getElementById("apellido2");
let inputEmail = document.getElementById("ingreso-email");
let inputTel =  document.getElementById("telefono");

/*
Al iniciar, se consulta el LS.
Si hay algo, se muestra.
Si no, no pasa nada.
*/

function inicio() {
    for (let x = 0; x < inputs.length; x++){ 
        let input = inputs[x];
        input.value = null
    }
    
    let primNombreLS = localStorage.getItem("primer-nombre")
    if (primNombreLS != null) {
        inputName.value = primNombreLS
    }

    let segNombreLS = localStorage.getItem("segundo-nombre")
    if (segNombreLS != null) {
        inputSecName.value = segNombreLS
    } 

    let primApellidoLS = localStorage.getItem("primer-apellido")
    if (primApellidoLS != null) {
        inputLastName.value = primApellidoLS
    }

    let segApellidoLS = localStorage.getItem("segundo-apellido")
    if (segApellidoLS != null) {
        inputSecLastName.value = segApellidoLS
    }
    
    let mail = localStorage.getItem("email");
    if (mail != null) {
        inputEmail.value = mail
    }

    let telefonoLS = localStorage.getItem("telefono")
    if (telefonoLS != null) {
        inputTel.value = telefonoLS
    }    
}

/*
Si al clickear Guardar hay algún campo vacío, ese campo recibe un aspecto de alerta.
Al clickear de nuevo, con los campos completos, remueve las clases de alerta y
actualiza el valor en LS del campo correspondiente.
Si hay algo ingresado en los campos no obligatorios, también se guarda.
*/

function validar() {

    if (inputName.value === "") {
        document.getElementById("feedback-nombre").style.display = "inline";
        inputName.classList.add("is-invalid");
    } else {
        document.getElementById("feedback-nombre").style.display = "none";
        inputName.classList.remove("is-invalid");
        localStorage.setItem("primer-nombre", inputName.value)
    } 

    if (inputLastName.value === "") {
        document.getElementById("feedback-apellido").style.display = "inline";
        inputLastName.classList.add("is-invalid");
    } else {
        document.getElementById("feedback-apellido").style.display = "none";
        inputLastName.classList.remove("is-invalid");
        localStorage.setItem("primer-apellido", inputLastName.value)
    }

    if (inputEmail.value === "") {
        document.getElementById("feedback-email").style.display = "inline";
        inputEmail.classList.add("is-invalid");
    } else {
        document.getElementById("feedback-email").style.display = "none";
        inputEmail.classList.remove("is-invalid");
        localStorage.setItem("email", inputEmail.value)
    }

    localStorage.setItem("segundo-nombre", inputSecName.value);
    localStorage.setItem("segundo-apellido", inputSecLastName.value);
    localStorage.setItem("telefono", inputTel.value);
}

document.addEventListener("DOMContentLoaded", () => {
    inicio();

    document.getElementById("guardar").addEventListener("click", () => {
        validar()
    });

    //Muestra el usuario en el <nav>
    let email = localStorage.getItem("email");
    if (email != null) {
        document.getElementById("logout").style.display = "block";
        document.getElementById("nombreusuario").innerHTML = email;
    };

    //Funciones del <nav>
    document.getElementById("cerrar").addEventListener("click", () => {
        localStorage.clear();
        location.href = "index.html";
    });

    document.getElementById("carrito").addEventListener("click", () => {
        window.location = "cart.html"
    });

    document.getElementById("perfil").addEventListener("click", () => {
        window.location = "my-profile.html"
    });
})