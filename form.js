// En esta segunda sección lo que intentamos hacer era enfatizar aun mas el uso de algunas lecciones.
// Particularmente el enviado de información a un API y la extracción de datos del local storage.


// Recordemos que en la seccio4n anterior extrajimos dos puntos importantes, el artista del cual fue seleccionado en el QUIZ del usuario y los aplausos que este haya recibido por el mismo. 
// Obtenemos ambos a continuación.

let aplausoFinalValue =  parseInt(localStorage.getItem('aplausos'));
console.log("aplausoFinalValue = " + aplausoFinalValue);

let bandFinalValue =  localStorage.getItem('mainBandName');
console.log("bandFinalValue =" + bandFinalValue);

// #################################################################
// Colocamos la llave publica requerida por emailjs.

(function() {
    emailjs.init('0gK78jCHQ53N_M5s2');
})(); 

// #################################################################

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) { 
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        this.artist.value = bandFinalValue; 
        this.aplausos.value = aplausoFinalValue;
        // Aquí abajo se definen los IDs a usar, tanto del servicio como del email a enviar. 
        emailjs.sendForm('service_23bpzq2', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}