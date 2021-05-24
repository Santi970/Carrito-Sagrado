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

    let formu = {name, email, subject, direccion, message}
    localStorage.setItem("formu", JSON.stringify(formu))

})


  let getStorage = JSON.parse(localStorage.getItem('formu'))

  let InputName = document.getElementById("name");
  InputName.value = getStorage.name

  let InputEmail = document.getElementById("mail");
  InputEmail.value = getStorage.email 
  
  let InputSubject = document.getElementById("subject");
  InputSubject.value = getStorage.subject 

  let InputDireccion = document.getElementById("direccion");
  InputDireccion.value = getStorage.direccion 
  
  let InputMessage = document.getElementById("message");
  InputMessage.value = getStorage.message 