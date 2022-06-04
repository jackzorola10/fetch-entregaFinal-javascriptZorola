// ENTREGA FINAL 
// El concepto es de un board de canciones que las personas podrán apoyar con el presionar de un Enter a partir del resultado del test en la parte inferior. 
// Al finalizar los enviará a otro archivo de html donde podrán enviar su información a traves de un correo.
// Marque con un ⭐️ todos los lugares en los que use conceptos fundamentales del curso para encontrarlos mas facilmente. 

async function render() { // Toda la aplicación esta encerrada en una sola función, la cual la forza a correr de manera cronologica, esto, he de admitir no es la mejor opción de lo que me hubiese gustado hacer pero dado los tiempos es lo que tuve que hacer para forzar el fetch a funcionar. 

localStorage.clear(); 
const resp = await fetch('https://jackzorola10.github.io/fetch-entregaFinal-javascriptZorola/songs.json') // La aplicación utiliza un array de objetos, la cual yo acomode en un json que esta publico en Github. En este está un array inicial con las canciones presentadas al usuario. 
const data = await resp.json() // Fetch (⭐️)

songs = [...data] // Lo obtenido en el json, se implemntará dentro de este array. // Spread (⭐️)

// #################################################################

let bandNames = [] // Utilizando el array de canciónes extraeremos los nombres de los autores, estos se matchearan en orden contra unas imagenes que tenemos en nuestro proyecto para el QUIZ de mas abajo. 

for (let obj of songs) {
    bandNames = [...bandNames, obj.autor]   
} // For y llenado de arrays (⭐️)

// #################################################################

let stringsOfArrayOfSongs = [] // De manera que podamos imprimir la tabla que usaremos y que esta pueda ser actualizada, la aproximación que tome fue imprimir valores del array sobre un string. Cada string ingresará al "stringsOfArrayOfSongs" como una entrada y luego las uniremos para ser impresas en el html.
 
const printTableOfSongs = (arrayOfObj) => { // Funcion que transforma los arrays de objetos en las tablas para imprimirlas.
    console.log(arrayOfObj)
    stringsOfArrayOfSongs.splice(0, stringsOfArrayOfSongs.length);  // Splice (⭐️)
    for (let i = 0; i < arrayOfObj.length; i++) {
        stringsOfArrayOfSongs.push( // Push (⭐️)
        "<tr>" +
            "<th scope='row'>" + arrayOfObj[i].id + '</th>' +
            "<td><strong>" + arrayOfObj[i].name + '</strong></td>' +
            "<td>" + arrayOfObj[i].autor + '</td>' +
            "<td class='text-muted'>" + arrayOfObj[i].genero + '</td>' + 
            "<td>" + "👏🏼" + arrayOfObj[i].aplausos + '</td>' +
        "</tr>"
        );
    }
} 

printTableOfSongs(songs); // invocamos la función creada justo acá arriba.
console.log(stringsOfArrayOfSongs);

// INICIA EL FLUJO DEL USUARIO 👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼👇🏼

// ########################################################################################################################

const printFilteredPlaylist = (htmlID) => { // Arrow function que recibe un ID y dentro de este escupe el ultimo stringsOfArrayOfSongs. Generando una nueva tabla de canciones.
    let genreFilteredPlaylist = document.getElementById(htmlID)
    genreFilteredPlaylist.innerHTML = stringsOfArrayOfSongs.join(""); // Writing in DOM (⭐️)
}
    // Imprimimos la primer tabla que se ve hasta arriba para el usuario. 
    printFilteredPlaylist("PlaylistSelection");  

// ########################################################################################################################

// Le permitimos al usuario filtrar la tabla en la parte superior. Esto, aunque honestamente no es super valioso para el flujo general, era necesario para probar el entendimiento de los filtrados de los arrays, el uso d arrow functions y probar las mismas funciones creadas arriba, para su mayor abstracción.

let songFilter = [];
const userGenre = document.getElementById("selectDeGenero");

userGenre.addEventListener('change', () => {                    // Event Listener utilizado (⭐️).
    console.log("Genre obtained = " + event.target.value); // El usuario selecciona un genero del dropdown.
    songFilter = songs.filter(   (el) => el.genero.includes(event.target.value)  );  // Esa selección se usa para filtrar nuestro array de objetos principal "songs"
    console.log("songFilter value = " + songFilter);

    printTableOfSongs(songFilter); //  Creamos un nuevo array que se carga en stringsOfArrayOfSongs
    printFilteredPlaylist("FinalPlaylist"); // Extraemos dentro de que ID queremos enviar la ultima tabla de canciones de stringsOfArrayOfSongs y la imprimimos.
}) 

// ########################################################################################################################

// En esta sección el usuario podra participar en un test, donde podrá jugar a ver "cual artista le toca", rotando entre una serie de imagenes de las bandas mencionadas en el primer array, a traves de una detección de eventos. 

let bandImage = document.getElementById('imageForTest'); 
let bandEres = document.getElementById('eres');
let imgV = parseInt(0); // Dado que nuestras imagenes estan en un orden especifico, todas tienen un nombre similar, variando solo por el numero al final. Ej: "images/band1.jpg" Podemos rotar a traves de ellas, teniendo el largo del array como limite.

bandImage.onmousemove = () => {
    imgV++        // Sugar Syntax (⭐️)
    console.log("mousemove")
    bandImage.src="images/band" + imgV + ".jpg" // Cambia el nombre del archivo para que así se altere el source de la imagen, cambiandola.
    bandEres.innerText = "Eres: " + bandNames[imgV-1]; // Se le informa al usuario que artista es. 
    localStorage.setItem('mainBandName', bandNames[imgV-1]); // Se carga el ultimo resultado al local storage // Local Storage (⭐️)
    imgV > bandNames.length-1 ? imgV = 0 : imgV // Una ves que las imagenes llegan a su limite, regresa al inicio   // Operador terniario! (⭐️)

};

// ########################################################################################################################

// En esta sección adquirimos el evento del ENTER y cada que esto ocurra escribimos un array nuevo el cual se imprime en la tabla superior, con la diferencia en que dependiendo del artista que le haya tocado en el array sumaremos "aplausos" a este artista. 

let enterValidation = document.getElementById("all");

enterValidation.addEventListener("keypress", (event) => {
    function confirmationToast() {
        if (imgV === 0 ) {
            return
        } else {
            let bandNameFilter = bandNames[imgV-1];
            console.log("bandNameFilter is " + bandNameFilter);
        
            Toastify({ // Le informamos al usuario a traves de hacer aparecer una pequeña notificación en la parte inferor // Uso de librerias (⭐️)
                text: "👏🏼 for " + bandNames[imgV-1],
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
            }).showToast();
    
            const newArr = songs.map(obj => { // Se imprime el nuevo array, cambiando solo los aplausos. // map (⭐️)
                if (obj.autor === bandNameFilter) { 
                    return {
                      id: obj.id,
                      name: obj.name,
                      autor: obj.autor,
                      genero: obj.genero,
                      aplausos: parseInt(obj.aplausos++)};
                  }
                  return obj;  
              });
    
                    printTableOfSongs(newArr);
                    printFilteredPlaylist("PlaylistSelection")                    
                    localStorage.setItem('aplausos', songs[imgV-1].aplausos); 

                    console.log("ENTER");
        }
    }
                event.key === "Enter" && confirmationToast() // Uso de operador logico AND (⭐️)
                event.preventDefault();
                
                event.key !== "Enter" && console.log("Not enter");
})

}

render();

// 