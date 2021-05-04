/*FORMULARIO*/ 

// manipulamos el formulario  enviamos al log ej:

$('#formulario').submit(function(e){
    e.preventDefault()
    var name = $('#name').val();
    var email = $('#mail').val();
    var subject = $('#subject').val();
    var direccion= $('#direccion').val();
    var message = $('#message').val();
    console.log(name + "\n" + email + "\n" +subject + "\n" + direccion + "\n" + message)
})

//Efectos con jQuery
//Al apretar aparece y da las gracias

$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideDown("slow");
    });
  });
