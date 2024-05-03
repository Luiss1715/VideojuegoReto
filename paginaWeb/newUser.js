

const emailInput = document.getElementById("correo");
const usuarioInput = document.getElementById("usuario");
const nombreInput = document.getElementById("nombre");
const passwordInput = document.getElementById("password");
const passwordConfirmationInput = document.getElementById("passwordConfirmation");
const btnRegistrarmeInput = document.getElementById("btnRegistrarme");

btnRegistrarme.addEventListener("click", verifyCredentials);

function verifyCredentials() {
    let email = emailInput.value;
    let pwd = passwordInput.value;
    let usuario = usuarioInput.value;
    let nombre = nombreInput.value;
    let pwdConfirmation = passwordConfirmationInput.value;

    if(pwd!=pwdConfirmation){ //si las contraseñas no coinciden 
        console.log("contraseñas no coinciden")
        let errorElement = document.getElementById('PasswordMatch');
        errorElement.textContent = 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.';
        errorElement.style.display = 'block'; // Mostrar el elemento de mensaje de error
    }
    else{ //si si coinciden, ahora tenemos que verificar que el correo no coincida 
        //hacemos una peticion al servidor, para obtener una registro con el correo ingresado
        fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email }) // Enviar el correo electrónico al servidor para verificación
        })
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, maneja la respuesta del servidor
                return response.json();
            }
            throw new Error('Error al verificar el correo electrónico');
        })
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.exists) {
                // El correo electrónico ya existe, mostrar un mensaje de error
                let errorElement = document.getElementById('EmailExists');
                errorElement.textContent = 'El correo electrónico ya está registrado. Por favor, use otro correo electrónico.';
                errorElement.style.display = 'block';
            } else {
                let registroExitoso = document.getElementById('EmailDone');
    
                fetch('/registroUsuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, pwd: pwd, usuario:usuario,nombre:nombre }) // Enviar el correo electrónico y otraVariable al servidor para verificación
                })
                .then(response => {
                    if (response.ok)  { //no entra aqui
                        // Si la respuesta es exitosa, maneja la respuesta del servidor
                        registroExitoso.textContent = 'Registrado con éxito';
                        registroExitoso.style.display = 'block';
                        window.location.href = '/registro.html';

                    }
                    throw new Error('Error al registrar al usuario');
                })
            }
        })
        .catch(error => {
            // Manejar cualquier error de red o del servidor
            console.error('Error:', error.message);
        });
    }
    
}

