import DomBuilder from "../js/DomBuilder_dos.js";

//NUEVO
const domBuilder = new DomBuilder();
const parent =$('#cards')
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
        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

//empujamos los objetos al carrito. 
const setCarrito = objeto => {

    
    const producto = {

     
        id: $('.btn-secondary').data(objeto.id)
    }
    console.log(producto)


}



