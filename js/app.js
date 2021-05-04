/* "e" representa el evento.y uno de sus atributos
es el "target", que viene a ser el elemento que 
recibió el evento. (En este caso el botón) */

// CSS colo ej:
//$('#color-azul').css({color:'bulue', background: 'salmon', padding:'20px'}) 

//La propiedad "parentElement" devuelve el elemento padre del elemento especificado.

const cards = $('#cards')
const items = $('#endregionitems')
const footer = $('#footer')
const templateCard = $('#template-card').content
const templateFooter = $('#template-footer').content
const templateCarrito = $('#template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}


//Probando 
$('formulario_2').submit(function(e){
    e.preventDefault()
    console.log('click')
})

//await tiene que estar siempre dentro de un async. 
const fetchData = async () => {
    try{
        const res = await fetch ('../api.json') //URL aqui. 
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    }catch (error){
        console.log(error)
    }
}

$( document ).ready(function() {
    fetchData()
    if(localStorage.getItem('carrito')){
        // De Json a objeto
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()

    }
})

//con "e" capturamos el "elemento" que queremos modificar. 
cards.on('click', e =>{
    addCarrito(e)
})

items.on('click', e =>{
    btnAccion(e)
})

//Template Card con fragment para evitar reflow
/*El método Node.cloneNode() devuelve un duplicado del 
nodo en el que este método fue llamado.*/

const pintarCards = data => {
    console.log(data);
    data.forEach(producto => {
        templateCard.$('h5').textContent = producto.title;
        templateCard.$('p').textContent = producto.precio;
        templateCard.$('img').setAttribute('src',producto.thumbnailUrl)
        templateCard.$('.btn-secondary').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.append(clone)
    })

    cards.append(fragment)
}

//aca llega el addEventListener...
const addCarrito = e => {

    //pregunto si el elemento contiene la clase que le pasamos
    if (e.target.classList.contains('btn-secondary')){
        setCarrito(e.target.parentElement)
    }
    //detenemos cualquier otro evento q se puede generar en el cards.addEventsListener
    e.stopPropagation()
}

//empujamos los objetos al carrito. 
const setCarrito = objeto => {

    const producto = {
        id: objeto.$('.btn-secondary').dataset.id,
        title: objeto.$('h5').textContent,
        precio: objeto.$('p').textContent,
        cantidad: 1
    }

    //si el producto existe aumenta la cantidad
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    //Con los tres puntitos hacemos una copia de "producto". 
    carrito[producto.id] = {...producto}
    pintarCarrito()

}

const pintarCarrito = () => {
 
    items.html = '' 
    Object.values(carrito).forEach(producto => {
        templateCarrito.$('th').textContent = producto.id
        templateCarrito.$('td:first')[0].textContent = producto.title
        templateCarrito.$('td:first')[1].textContent = producto.cantidad
        templateCarrito.$('.btn-outline-success').dataset.id = producto.id
        templateCarrito.$('.btn-outline-warning').dataset.id = producto.id
        templateCarrito.$('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.append(clone)
    })

    items.append(fragment)

    pintarFooter()

    //Convertimos un objeto o valor de JavaScript en una cadena JSON,
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.html = ''
    if(Object.keys(carrito).length === 0) {
        footer.html = 
         `<th scope="row" colspan="5">Carrito vacío </th>`
        return
    }

    //reduce toma primero una fucion de flecha
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    console.log(nPrecio)

    templateFooter.$('td:first')[0].textContent = nCantidad
    templateFooter.$('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.append(clone)
    footer.append(fragment)

    const btnVaciar = $('#vaciar-carrito')
    btnVaciar.on('click', () => {
        carrito = {}

        pintarCarrito()
    })
}

// Btn  "+ y - "
const  btnAccion = e => {
    //accion de aumentar cantidad "+"
    if(e.target.classList.contains('btn-outline-success')){ 
        console.log(carrito[e.target.dataset.id])
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    //accion de restar cantidad "-"
    if(e.target.classList.contains('btn-outline-warning')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad --
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()

    }
    e.stopPropagation()
}