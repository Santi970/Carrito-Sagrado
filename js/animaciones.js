

//Efectos con jQuery
//Al apretar aparece y da las gracias

$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideDown(2000);
      $("#panel").slideUp(2000);
    });
  });


 //Efecto bienvenida index
$("#efecto-index").prepend('<h3 id="h3-efindex" >Bienvenidos a Sagrada Pasteleria!!</h3>');
$("h3").fadeOut(4000); 



