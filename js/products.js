let productsArray = [];
let catID = localStorage.getItem("catID");
let resultados = [];

function setProductId(productid){
    localStorage.setItem("productid", productid)
    window.location = "product-info.html"
}

//Muestra los productos del array dado.
function showProductsList(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div onclick="setProductId(${product.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>`+ product.name + " - " + product.currency + " " + product.cost +`</h4> 
                            <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        </div>`
        document.getElementById("lista-productos").innerHTML = htmlContentToAppend; 
    }
}

//Recibe un array de productos y los filtra por rango de precio.
function filterByPrice(){
    let minimo = parseInt(document.getElementById("rangeFilterCostMin").value);
    let maximo = parseInt(document.getElementById("rangeFilterCostMax").value);

    let productosFiltrados = productsArray.filter(producto => producto.cost >= minimo && producto.cost <= maximo);

    productosFiltrados.sort((ant,sig)=>ant.cost-sig.cost);
    showProductsList(productosFiltrados);
}

//Limpia el filtro.
function clearFilter(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
    showProductsList(productsArray);
}

//Ordena los productos de forma ascendente según su precio.
function sortAsc(){
    let sortedAsc = productsArray.sort((ant,sig) => ant.cost - sig.cost)
    showProductsList(sortedAsc)
}

//Ordena los productos de forma descendente según su precio.
function sortDesc(){
    let sortedDesc = productsArray.sort((ant,sig) => sig.cost - ant.cost)
    showProductsList(sortedDesc)
}

//Ordena los productos de forma descendente según su cantidad vendida.
function sortDescRel(){
    let sortedDescRel = productsArray.sort((ant,sig) => sig.soldCount - ant.soldCount)
    showProductsList(sortedDescRel)
}

function buscarProductos() {
    let busqueda = document.getElementById("buscar").value;

    resultados = productsArray.filter(producto => producto.name.toLowerCase().indexOf(busqueda.toLowerCase())>-1 ||
    producto.description.toLowerCase().indexOf(busqueda.toLowerCase())>-1);
    showProductsList(resultados);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products;
            categoriesArray = resultObj.data;
            showProductsList(productsArray);
            document.getElementById("cat-nombre").innerHTML = categoriesArray.catName;
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAsc()
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortDesc()
    });

    document.getElementById("sortDescByRel").addEventListener("click", function(){
        sortDescRel()
    });

    document.getElementById("aplicar-filtro").addEventListener("click", function(){
        filterByPrice();
    });
    
    document.getElementById("limpiar-filtro").addEventListener("click", function(){
        clearFilter();
    });

    //Muestra el usuario en el <nav>
    let email = localStorage.getItem("email")
    if (email != null){
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("nombreusuario").innerHTML = email;
    };
    
    //Funciones del <nav>
    document.getElementById("carrito").addEventListener("click", () => {
        window.location = "cart.html"
    });

    document.getElementById("perfil").addEventListener("click", () => {
        window.location = "my-profile.html"
    });
    
    document.getElementById("cerrar").addEventListener("click",() => {
        localStorage.clear();
        location.href="index.html";
    });

    document.getElementById("buscar").addEventListener("keyup", () => {
        buscarProductos()
    })
})