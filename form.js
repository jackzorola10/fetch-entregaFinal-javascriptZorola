let aplausoFinalValue =  parseInt(localStorage.getItem('aplausos'));
console.log("aplausoFinalValue = " + aplausoFinalValue);
let bandFinalValue =  localStorage.getItem('mainBandName');
console.log("bandFinalValue =" + bandFinalValue);

(function() {
    emailjs.init('0gK78jCHQ53N_M5s2');
})(); 

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        this.artist.value = bandFinalValue;
        this.aplausos.value = aplausoFinalValue;
        // these IDs from the previous steps
        emailjs.sendForm('service_23bpzq2', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}