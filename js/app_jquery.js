import DomBuilder_productos from "../js/DomBuilder_dos.js";

//NUEVO
const domBuilder = new DomBuilder_productos();
const parent =$('#cards')
const parent_carrito = $('#template-carrito')
const parent_footer = $('#template-footer')
const parent_table = $('#table')


let carrito = {}


parent.on('click',e => {
    addCarrito(e)
})

//PROBANDO AJAX
//GET Datos desde una URL Local
const urlLocal = "../api.json"

$(() => {
    $.get(urlLocal, function (data, status) {
        if (status === "success") {
           console.log("Status request is: " + status );
           //console.log(data)
            pintarCards(data)
        }else {
            console.log("Se rompio todo");
        }
    })
    });

//Pintamos Cards con Builder   
const pintarCards = data =>{
    domBuilder.renderProducts(data, parent)
}





const addCarrito = e => {
    console.log(e.target)
    if((e.target.classList.contains('btn-secondary'))){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

//Empujamos los objetos al carrito. 
const setCarrito = objeto => {

    
    const producto = {

        id: objeto.querySelector('.btn-secondary').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    //si el producto existe aumenta la cantidad
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    //Con los tres puntitos hacemos una copia de "producto".
    //creamos el index con su producto.id si existe se sobreescribe.  
    carrito[producto.id] = {...producto}

    pintarCarrito()
}

const pintarCarrito = () => {

    domBuilder.getCardHtml_carrito(carrito,parent_carrito)


    Object.values(carrito).forEach(producto => {
        //tengo que seguir pero hasta aca funciona perfecto

       

    })
}

