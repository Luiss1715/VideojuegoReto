

const telefonoInput = document.getElementById("telefono");
const fechadeNacimientoInput = document.getElementById("fechaNacimiento");
const rolInput = document.getElementById("rol");
const regionInput = document.getElementById("region");
const btnActualizar = document.getElementById("btnActualizar")
btnActualizar.addEventListener("click", verifyCredentials);


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

// Obtener el identificador de usuario del cookie (esto es solo un ejemplo, debes tener tu propia lógica para obtener el identificador de usuario)
const userId = getUserIdFromCookie();
// Realizar la solicitud para obtener los datos del usuario
fetch(`datosUsuario?usuario=${userId}`)
  .then(response => response.json())
  .then(data => {
    telefonoInput.value = data.telefono;
    const fechaNacimiento = new Date(data.fechaNacimiento);
// Formatear la fecha en el formato "yyyy-MM-dd"
    const formattedFechaNacimiento = fechaNacimiento.getFullYear() + '-' + 
    ('0' + (fechaNacimiento.getMonth() + 1)).slice(-2) + '-' + 
    ('0' + fechaNacimiento.getDate()).slice(-2);
    fechadeNacimientoInput.value = formattedFechaNacimiento;
    rolInput.value = data.Rol;
    regionInput.value = data.region;
  })
  .catch(error => {
    console.error('Error al obtener los datos del usuario:', error);
    // Código para manejar el error
  });
  

function verifyCredentials() {
    event.preventDefault();
    let telefono = telefonoInput.value;
    let fechadeNacimiento = fechadeNacimientoInput.value;
    let rol = rolInput.value;
    let region = regionInput.value;
    const user = getUserIdFromCookie();
    console.log("telefono: ",telefonoInput.value);
    console.log("fecha: ",fechadeNacimientoInput.value);
    console.log("user: ",user);
    console.log("boton presionado")
    const data = {fechadeNacimiento, telefono, rol, user, region};

        //hacemos una peticion al servidor, para actualizar los datos
        fetch('/actualizarDatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Enviar el correo electrónico al servidor para verificación
        })
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, maneja la respuesta del servidor
                return response.json();
            }
            // Si la respuesta no es exitosa, lanzamos un error
            throw new Error('Error al actualizar los datos');
        })
        .then(data => {
            // Maneja la respuesta del servidor cuando es exitosa
            console.log('Success:', data);
            alert('Datos actualizados correctamente.');
            window.location.href = 'welcome.html';
        })
        .catch(error => {
            // Maneja el error cuando ocurre algún problema con la petición
            console.error('Error:', error);
            alert('Hubo un error al actualizar los datos.');
        });
}