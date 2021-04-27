/* "e" representa el evento.y uno de sus atributos
es el "target", que viene a ser el elemento que 
recibió el evento. (En este caso el botón) */

//La propiedad "parentElement" devuelve el elemento padre del elemento especificado.

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

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

//El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        // De Json a objeto
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()

    }
})

//con "e" capturamos el "elemento" que queremos modificar. 
cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

//Template Card con fragment para evitar reflow
/*El método Node.cloneNode() devuelve un duplicado del 
nodo en el que este método fue llamado.*/

const pintarCards = data => {
    console.log(data);
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute('src',producto.thumbnailUrl)
        templateCard.querySelector('.btn-secondary').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
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
    carrito[producto.id] = {...producto}
    pintarCarrito()

}

const pintarCarrito = () => {
 
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-outline-success').dataset.id = producto.id
        templateCarrito.querySelector('.btn-outline-warning').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()

    //Convertimos un objeto o valor de JavaScript en una cadena JSON,
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = 
         `<th scope="row" colspan="5">Carrito vacío </th>`
        return
    }

    //reduce toma primero una fucion de flecha
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}

        pintarCarrito()
    })
}

// Btn  "+ y - "
const  btnAccion = e => {
    console.log(e.target)
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