
const usuario = document.getElementById("email");
const password = document.getElementById("password");
const btnAccede = document.getElementById("btnAccede");

btnAccede.addEventListener("click", getCredentials);

function getCredentials() {
    let user = usuario.value;
    let pwd = password.value;

    console.log(user);
    console.log(pwd);

    sendCredentials(user,pwd);


}

//funcion asincrona para el inicio de sesion
async function sendCredentials(user, pwd) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user, pwd: pwd })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.user) { //si es diferente de null
                // Establecer la cookie con el nombre de usuario como userId
                document.cookie = `userId=${data.user}; max-age=900000; path=/`; // La cookie expirará en 15 minutos
                // Redirigir al usuario a la página principal si las credenciales son correctas
                let errorElement = document.getElementById('EmailExists');
                //errorElement.textContent = 'Inicio de sesion Exitoso '+data.user;
                //errorElement.style.display = 'block';
                window.location.href = 'welcome.html'; //lo dirigimos a la otra pagina
            } else {
                // Mostrar un mensaje de error si las credenciales son incorrectas
                alert("Usuario o contraseña incorrecta");
            }
        } else {
            // La solicitud no fue exitosa
            console.error("Error en la solicitud:", response.status);
            // Manejar el error de la solicitud si es necesario
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        // Manejar cualquier otro error si es necesario
    }
}