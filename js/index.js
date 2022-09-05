document.addEventListener("DOMContentLoaded", function(){
    let email = localStorage.getItem("email");
    if (email != null){
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("nombreusuario").innerHTML = email;
    }
})

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function logOut(){
    localStorage.clear();
    location.href="index.html";
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("cerrar").addEventListener("click",() => {
        logOut();
    })
})