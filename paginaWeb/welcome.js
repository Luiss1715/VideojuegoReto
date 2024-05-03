

if(getUserIdFromCookie() == "admin"){
  let mostrarGraficas = document.getElementById('mostrarGrafica');
  mostrarGraficas.style.display = 'block';

  let jugar=document.getElementById("jugar");
  jugar.style.display = 'none';

  let actualizarDatos=document.getElementById("actualizarDatos");
  actualizarDatos.style.display = 'none';
}

function mostrarEstadisticas(){
  window.location.href = "graficas.html"
}
function jugar() { //aqui nos dirigira al html del juego
  //alert('Listo para jugar!');
  //window.location.href = "graficas.html"
  window.location.href = "BuildWebGL/index.html"
}


function actualizarDatos() {
    const userId = getUserIdFromCookie();
    window.location.href = "actualizarDatos.html"
    let userName = document.getElementById('userName');
    userName.textContent = 'Bienvenido '+userId;
    userName.style.display = 'block';
  //userName
}

function mostrarUserId() {
    const userId = getUserIdFromCookie();
    if (userId) {
        let userName = document.getElementById('userName');
        userName.textContent = 'Bienvenido ' + userId;
        userName.style.display = 'block';
    }
}

// Obtener el valor de la cookie "userId"
function getUserIdFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Verificar si la cookie comienza con "userId="
      if (cookie.startsWith('userId=')) {
        // Retornar el valor de la cookie después del signo igual
        return cookie.substring('userId='.length);
      }
    }
    // Si no se encuentra la cookie "userId", retornar null
    return null;
  }
  


//Guardamos el user en un txt para poder obtenerlo desde C# 
function sendUsernameToServer() {
  const userId = getUserIdFromCookie();
  if (userId) {
      fetch('/saveUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userId })
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  } else {
      console.log('No se encontró el userId en las cookies.');
  }
}

// Llama a esta función cuando necesites enviar el nombre de usuario al servidor
sendUsernameToServer();




