

// Variables Array of strings to type out en el Archivo HTML1 
var strings = ["Verqor Yields es un videojuego desarrollado por estudiantes del Tecnológico de Monterrey para verqor con el fin de permitirte conocer más sobre el campo y la agricultura, así como los beneficios que ofrece verqor frente a prestamistas informales e instituciones bancarias tradicionales."];
var container = document.getElementById('text-container');
var cursor = document.querySelector('.cursor');
var textSpan = document.createElement('span');
container.appendChild(textSpan);
var stringIndex = 0;// Index del string escrito al momento
var charIndex = 0;// Index del char del string escrito al momento
var textSpan = document.createElement('span');// Create a separate span for the text
container.appendChild(textSpan);

function type() {
    console.log("prueba")
    if (stringIndex < strings.length) {
        if (charIndex < strings[stringIndex].length) {
            var textNode = document.createTextNode(strings[stringIndex].charAt(charIndex));
            textSpan.appendChild(textNode);
            charIndex++;
            setTimeout(type, 40); // velocidad de escritura
        } else {
            // Moverse al siguiente string
            stringIndex++;
            charIndex = 0;
            textSpan.appendChild(document.createElement('br')); // Add line break
            setTimeout(type, 300); // Adjust delay before typing next string here
        }
        textSpan.appendChild(cursor);
    }
}


// Start typing
setTimeout(type, 1000); // Adjust delay before starting typing here