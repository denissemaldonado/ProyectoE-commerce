let userID = 25801;
let cartProducts = [];

function showCartInfo(array) {
    let cartContent = "";
    for (let i = 0; i < array.articles.length; i++) { 
        let cartArticle = array.articles[i];
        
        cartContent += `
        <tr>
          <th scope="row"><img src="${cartArticle.image}" width=70></img></th>
          <td>${cartArticle.name}</td>
          <td>${cartArticle.currency} <span id="precio">${cartArticle.unitCost}</span></td> 
          <td><input id="cantidad" type="number" min="1" value="1" class="input-cantidad"></td>
          <td>${cartArticle.currency} <span id="subtotal" class="subtotal"></span></td>
          <td class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></td>
        </tr>`
        
        document.getElementById("lista-carrito").innerHTML = cartContent
    } 
}

function showSubtotal() {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let costo = parseInt(document.getElementById("precio").innerHTML);
    let subtotal = cantidad*costo;

    document.getElementById("subtotal").innerHTML = subtotal;
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok") {
            cartProducts = resultObj.data;
            showCartInfo(cartProducts);
            showSubtotal();
            
            document.getElementById("cantidad").addEventListener("input", () => {
                showSubtotal()
            });
        }
    });

    //Muestra el usuario en el <nav>
    let email = localStorage.getItem("email");
    if (email != null){
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("nombreusuario").innerHTML = email;
    };
    
    //Funciones del <nav>
    document.getElementById("cerrar").addEventListener("click",() => {
        localStorage.clear();
        location.href="index.html";
    });

    document.getElementById("carrito").addEventListener("click", () => {
        window.location = "cart.html"
    });

    document.getElementById("perfil").addEventListener("click", () => {
        window.location = "my-profile.html"
    });
})
