let userID = 25801;
let cartProducts = [];

/* Desafiate: concatenar el objeto al array.
Si hay un carrito en LS, lo bajo con getItem.
Si no, bajo el carrito de la api.*/

function showCartInfo(array) {
    let cartContent = "";
    for (let i = 0; i < array.articles.length; i++) {
        let cartArticle = array.articles[i];

        cartContent += `<tr>
          <th scope="row"><img src="${cartArticle.image}" width=70></img></th>
          <td>${cartArticle.name}</td>
          <td>${cartArticle.currency} <span id="precio">${cartArticle.unitCost}</span></td> 
          <td><input type="number" min="1" value="1" class="input-cantidad" id="valor-cantidad"></td>
          <td>${cartArticle.currency} <span id="subtotal" class="subtotal"></span></td>
        </tr>`

        document.getElementById("lista-carrito").innerHTML = cartContent
    }
}

function showSubtotal() {
    let cantidad = parseInt(document.getElementById("valor-cantidad").value);
    let costo = parseInt(document.getElementById("precio").innerHTML);
    let subtotal = cantidad * costo;
    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("subtotal-general").innerHTML = "USD " + subtotal;
}

function showCostos() {
    let subtotalG = parseInt(document.getElementById("subtotal").innerHTML);
    let envioElegido = parseInt(document.querySelector('input[name="envio"]:checked').value);
    let costo = (subtotalG * envioElegido) / 100;
    let total = costo + subtotalG;

    validarTipoEnvio();
    
    document.getElementById("costo-envio").innerHTML = "USD " + costo;
    document.getElementById("total").innerHTML = "USD " + total;
}

function validarTipoEnvio() {
    let envio = document.querySelector('input[name="envio"]:checked');

    if (envio === null) {
        document.getElementById("tabla-costos").style.display = "inline"
        document.getElementById("tipo-envio").classList.add("is-invalid")
    } else {
        document.getElementById("tabla-costos").style.display = "none";
        document.getElementById("tipo-envio").classList.remove("is-invalid");
        return true
    }
}

/*  Toma los inputs. Arma un array. Se recorre los inputs.
    Si alguno está vacío, se muestra su feedback.
    Si alguno está lleno, se remueve su feedback (si el feedback nunca apareció, igual se remueve: con el motivo de que permita
    el funcionamiento en los casos en los que el input cambia de valor). */

function validarDireccion() {
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");
    let camposEvaluados = [calle,numero,esquina]

    for (let a = 0; a < camposEvaluados.length; a++) {
        let campoEvaluado = camposEvaluados[a];

        if (campoEvaluado.value === "") {
            document.getElementById("feedback-" + campoEvaluado.id).style.display = "inline";
            document.getElementById(campoEvaluado.id).classList.add("is-invalid");
        }

        if (campoEvaluado.value != ""){
            document.getElementById("feedback-" + campoEvaluado.id).style.display = "none";
            document.getElementById(campoEvaluado.id).classList.remove("is-invalid");
            
        }
    }

    if (calle && numero && esquina != "") {
        return true
    }
}

let eligeCredito = document.getElementById("creditcard");
let eligeTransfer = document.getElementById("transferencia");
let inputCuentaNum = document.getElementById("cuenta-num");
let inputCardNum = document.getElementById("card-num");
let inputCodigo = document.getElementById("codigo");
let inputVence = document.getElementById("vencimiento");

function seleccionarFormaPago() {
    if (eligeCredito.checked) {
        inputCuentaNum.setAttribute('disabled', true)
    } else {
        inputCuentaNum.removeAttribute('disabled')
    }

    if (eligeTransfer.checked) {
        inputCardNum.setAttribute('disabled', true)
        inputCodigo.setAttribute('disabled', true)
        inputVence.setAttribute('disabled', true)
    } else {
        inputCardNum.removeAttribute('disabled')
        inputCodigo.removeAttribute('disabled')
        inputVence.removeAttribute('disabled')
    }
}

function validarFormaPago() {
    if (!eligeCredito.checked && !eligeTransfer.checked) {
        document.getElementById("feedback-pago-main").style.display = "inline"
    } else {
        document.getElementById("feedback-pago-main").style.display = "none"
    }

    if (eligeCredito.checked) {
        let inputsEvaluados = [inputCardNum, inputCodigo, inputVence];
        for (let e = 0; e < inputsEvaluados.length; e++) {
            let inputEvaluado = inputsEvaluados[e];

            if (inputEvaluado.value === "") {
                document.getElementById("feedback-" + inputEvaluado.id).style.display = "inline";
                document.getElementById(inputEvaluado.id).classList.add("is-invalid");
                document.getElementById("feedback-pago-main").style.display = "inline";
            } else {
                document.getElementById("feedback-" + inputEvaluado.id).style.display = "none";
                document.getElementById(inputEvaluado.id).classList.remove("is-invalid");
                document.getElementById("feedback-pago-main").style.display = "none";
                return true
            }
        }
    } else if (eligeTransfer.checked) {
        if (inputCuentaNum.value === "") {
            document.getElementById("feedback-cuenta-num").style.display = "inline";
            document.getElementById("cuenta-num").classList.add("is-invalid");
            document.getElementById("feedback-pago-main").style.display = "inline";
        } else {
            document.getElementById("feedback-cuenta-num").style.display = "none";
            document.getElementById("cuenta-num").classList.remove("is-invalid");
            document.getElementById("feedback-pago-main").style.display = "none";
            return true
        }
    }
}

function validar() {
   validarTipoEnvio();
   validarDireccion();
   validarFormaPago();
   
    if (validarTipoEnvio() && validarDireccion() && validarFormaPago() === true) {
        document.getElementById("exito").classList.add("show");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProducts = resultObj.data;
            showCartInfo(cartProducts);
            showSubtotal();
        }
        
        //MUESTRA SUBTOTAL Y COSTOS CUANDO LA CANTIDAD DE PRODUCTOS CAMBIA.
        document.getElementById("valor-cantidad").addEventListener("change", () => {
            showSubtotal();
            showCostos();
        });

        //VALIDACIÓN GENERAL.
        document.getElementById("fincompra").addEventListener("click", () => {
            validar();
           
        });

        //VALIDA FORMA DE PAGO.
        document.getElementById("creditcard").addEventListener("change", () => {
            seleccionarFormaPago()
        });
        document.getElementById("transferencia").addEventListener("change", () => {
            seleccionarFormaPago()
        });
        document.getElementById("cerrar-modal").addEventListener("click", () => {
            validarFormaPago()
        });

        //Recarga la página al finalizar la compra.
        document.getElementById("cerrar-aviso").addEventListener("click", () => {
            location.reload();
        })
        
    });


    //Muestra el usuario en el <nav>
    let email = localStorage.getItem("email");
    if (email != null) {
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
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