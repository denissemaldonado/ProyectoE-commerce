let productid = localStorage.getItem("productid");
let productInfo = [];
let comentarios = [];

function showProductInfo(info) {
    let htmlContentToAppend = "";
    
    nombre = info.name;
    descripcion = info.description;
    precio = info.cost + " " + info.currency;
    ventas = info.soldCount;
    categoria = info.category;
    
    htmlContentToAppend += `
    <h1 class="prod-info-title"> ${nombre} </h1>
    <div> ${descripcion} </div><br>
    <div class="row"><h5> Precio: ${precio} </h5></div><br>
    <div class="row"><h5> Cantidad vendida: ${ventas} unidades </h5></div><br>
    <div class="row"><h5> Categoría: ${categoria} </h5></div><br>
    <div>`  

    for (let i = 0; i < info.images[0].length; i++){ 
        let imagen = info.images[i];
        htmlContentToAppend += `<img src="${imagen}" width="300px" class="img-thumbnail">`
    }    
    
    htmlContentToAppend += `</div><br>`
    document.getElementById("informacion").innerHTML = htmlContentToAppend
}

function showComments(comments){
    let htmlComentariosToAppend = "";

    for (let i = 0; i < comments.length; i++){
        let comentario = comments[i];
        
        let estrellas = ""
        for (let n = 0; n < comentario.score; n++){
            estrellas += `<span class="fa fa-star checked"></span>`
        }
        
        htmlComentariosToAppend += `
        <div> <strong> ${comentario.user} </strong> ${comentario.dateTime} ${estrellas} <br>
        ${comentario.description}
        </div><br>`
    }
    document.getElementById("comentarios").innerHTML = htmlComentariosToAppend
}

function comentar(){
    
    let opinionTexto = "";
    opinionTexto = document.getElementById("opinion").value

    let score = 0;
    score = document.getElementById("puntuacion").value
    
    if (opinionTexto != 0){
        let nuevoComentario = {
        "product": productid ,
        "score": score ,
        "description": opinionTexto ,
        "user": localStorage.getItem("email") ,
        }
        comentarios.push(nuevoComentario)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCT_INFO_URL + productid + EXT_TYPE).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data 
            showProductInfo(productInfo)
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productid + EXT_TYPE).then(function(resultObj) {
        if (resultObj.status === "ok"){
            comentarios = resultObj.data
            showComments(comentarios)
        }
    })

    document.getElementById("enviar").addEventListener("click", () => {
        comentar()
        showComments(comentarios)
        document.getElementById("opinion").value = null
    })
})