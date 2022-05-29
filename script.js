async function render() {

// El concepto es de un board de canciones que las personas podrán apoyar con el presionar de un Enter a partir del resultado del test en la parte inferior. 

localStorage.clear();
const resp = await fetch('https://jackzorola10.github.io/fetch-entregaFinal-javascriptZorola/songs.json')
const data = await resp.json()

// Array inicial con las canciones presentadas al usuario. 

songs = [...data]

// Array de nombres de las bandas, este array esta matcheado contra las imagenes que tenemos en la carpeta. Para que le aparezca al usuario el nombre dependiendo de lo que le haya aparecido. 

let bandNames = []

for (let obj of songs) {
    bandNames = [...bandNames, obj.autor]   // Spread (⭐️)
}

let stringsOfArrayOfSongs = [] // Se llenará de un string hecho para poder depositarse con un innerHTML de manera comoda. 
 
// Funcion que transforma los arrays de objetos en las tablas para imprimirlas.

const printTableOfSongs = (arrayOfObj) => {
    console.log(arrayOfObj)
    stringsOfArrayOfSongs.splice(0, stringsOfArrayOfSongs.length);
    for (let i = 0; i < arrayOfObj.length; i++) {
        stringsOfArrayOfSongs.push(
        "<div class='d-flex flex-row d-inline justify-content-between'>" +
            "<p class='songTable d-inline'>" + arrayOfObj[i].id + ' - </p>' +
            "<p class='songTable d-inline'>" + arrayOfObj[i].name + '</p>' +
            "<p class='songTable d-inline'> by " + arrayOfObj[i].autor + '</p>' +
            "<p class='songTable d-inline'>" + arrayOfObj[i].genero + '</p>' + 
            "<p class='songTable d-inline'>" + "👏🏼" + arrayOfObj[i].aplausos + '</p>' +
        "</div>"
        );
    }
    console.log(stringsOfArrayOfSongs.length)
} 

printTableOfSongs(songs);
console.log(stringsOfArrayOfSongs);


// INICIA EL FLUJO DEL USUARIO

// ########################################################################################################################


    // Imprimimos la primer tabla que se ve hasta arriba para el usuario.
    let initialPlaylist = document.getElementById("PlaylistSelection");
        initialPlaylist.innerHTML = stringsOfArrayOfSongs.join("")

// ########################################################################################################################

//  Dependiendo de la selección en el input, el listener nos avisará y cambiaremos la tabla inferior para el usuario, imprimiendo una nueva. En esta sección por ahora solo capto el registro y activo la función printFilteredPlaylist() como segundo paso.
let songFilter = [];
const userGenre = document.getElementById("selectDeGenero");

userGenre.addEventListener('change', () => {                    // Evento utilizado.
    console.log("Genre obtained = " + event.target.value);
    songFilter = songs.filter(   (el) => el.genero.includes(event.target.value)  ); 

    console.log("songFilter value = " + songFilter);
    printTableOfSongs(songFilter);

    console.log(stringsOfArrayOfSongs);
    printFilteredPlaylist ();
})

// ########################################################################################################################

function printFilteredPlaylist () {
    genreFilteredPlaylist = document.getElementById("FinalPlaylist")
    stringify = stringsOfArrayOfSongs.join("");
    genreFilteredPlaylist.innerHTML = stringify;
}

// ########################################################################################################################

// En esta sección el usuario podra participar en un test, donde podrá jugar a ver "cual artista le toca", rotando entre una serie de imagenes de las bandas mencionadas en el primer array.

let bandImage = document.getElementById('imageForTest');
let bandEres = document.getElementById('eres');
let imgV = parseInt(0);
let bandInSpotlight;

bandImage.onmousemove = () => {
    imgV++        // Sugar Syntax (⭐️)
    console.log("mousemove")
    bandImage.src="images/band" + imgV + ".jpg"
    bandEres.innerText = "Eres: " + bandNames[imgV-1];
    bandInSpotlight = bandNames[imgV-1]
    
    imgV > bandNames.length-1 ? imgV = 0 : imgV    // Operador terniario! (⭐️)

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
        
            Toastify({ // Uso de librerias (⭐️)
                text: "👏🏼 for " + bandNames[imgV-1],
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
            }).showToast();
    
            const newArr = songs.map(obj => {
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
                    initialPlaylist = document.getElementById("PlaylistSelection");
                    stringify = stringsOfArrayOfSongs.join("");
                    initialPlaylist.innerHTML = stringify;
                    console.log("ENTER");

        }

    }
    
                event.key === "Enter" && confirmationToast() // Uso de operador logico AND (⭐️)
                event.preventDefault();
                
                event.key !== "Enter" && console.log("Not enter")
})

// ########################################################################################################################


}

render();


// TO SOLVE: Instalar bootstrap to make it presentable
// TO SOLVE: Make it so the filter is the only thing from which you can select in the section below
// Make connection with email post https://www.emailjs.com/

// El proyecto final debe incluir:
/* 
        Objetos y Arrays. Métodos de Arrays.
        Funciones y condicionales.
        Generación del DOM de forma dinámica. Eventos.
        Sintaxis avanzada.
        Al menos una librería de uso relevante para el proyecto.
        Manejo de promesas con fetch. 
        Carga de datos desde un JSON local o desde una API externa.
 */