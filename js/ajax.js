const items = $('#items')
const templateCard = $('#template-card').contains
const fragment = document.createDocumentFragment()


//PROBANDO AJAX
//GET Datos desde una URL Local
const URLJSON = "../api.json"

$("#post").append('<button id="btn1">Traer datos </button><br><br>');

$("#btn1").click( () => {
    $.get(URLJSON, (res,status) => {
        console.log("Status request is: " + status );
        console.dir(res);
        
        pintarCards(res)

    });
});

//PROBANDO PINTAR CARDS
const pintarCards = res => {

    res.forEach(dato => {
        $("#cards").prepend(`<div class="card" >
                            <img src='${dato.thumbnailUrl}'>
                            <h3>${dato.title}</h3>
                            <p> ${dato.precio}</p>
                           </div>`);
    })
}



//PROBANDO AJAX
//Enviamos datos por Post
const URLJSON_post = "https://jsonplaceholder.typicode.com/posts"
const datos =  {id:1, pedido: "3 Rojel, 4 ", total: 4000}
                
$("#post").append('<button id="btn2">Enviar Datos </button><br><br>');

$("#btn2").click( () => {
    $.ajax({
        method: "POST",
        url: URLJSON_post,
        data: datos,
        success: (res, status) => {
            console.log("Status request is: " + status );
            console.dir(res);
        
        } 
    });
});