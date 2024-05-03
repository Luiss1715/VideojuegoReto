//intentare obtener los datos de los inputs en node js 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const compression = require('compression');
const expressStaticGzip = require("express-static-gzip");

//para cargar las imagenes 
app.use(express.static(__dirname+'/Imgs'));


// Configurar el middleware body-parser para analizar solicitudes de formularios
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//juego
// Middleware para servir archivos .br
app.get('*.br', function (req, res, next) {
  res.set('Content-Encoding', 'br');
  next();
});


//este no es necesario
app.use("/", expressStaticGzip(__dirname, {
  enableBrotli: true,
  orderPreference: ['br', 'gzip']
}));

//para cargar las imagenes 
app.use(express.static(__dirname+'/Imgs'));

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));
app.use('/TemplateData', express.static(path.join(__dirname, 'TemplateData')));

app.use('/css', express.static(path.join(__dirname, 'css'), {
  setHeaders: function (res, path, stat) {
    res.set('Content-Type', 'text/css');
  }
}));


app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname + 'VerqorVideojuegoRespaldo')));
//Define ruta de acceso para BuildWebGl
app.use(express.static(path.join(__dirname + 'BuildWebGL')));

//fin JUEGO

// Definir una ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Definir una ruta para servir el archivo HTML
app.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'registro.html'));
});

// Definir ruta para servir script1.js
app.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.js'));
});

// Definir una ruta para servir el archivo HTML
app.get('/registroUsuario.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'registroUsuario.html'));
});

// Definir ruta para servir script1.js
app.get('/newUser.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'newUser.js'));
});

// Definir una ruta para servir el archivo HTML
app.get('/actualizarDatos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'actualizarDatos.html'));
});

// Definir ruta para servir actualizarDatos.js
app.get('/actualizarDatos.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'actualizarDatos.js'));
});

// Definir ruta para servir script2.js
app.get('/typing.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'typing.js'));
});

// Definir ruta para servir script2.js
app.get('/register.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.js'));
});


// Definir ruta para servir styles.css
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

// Definir ruta para servir styles.css
app.get('/forms.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'forms.css'));
});

// Definir ruta para servir styles.css
app.get('/welcome.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.get('/welcome.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.js'));
});

app.get('/welcomeStyle.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcomeStyle.css'));
});

app.get('/actualizarDatos.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'actualizarDatos.css'));
});

app.get('/graficas.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'graficas.html'));
});

app.get('/graficas.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'graficas.css'));
});
app.get('/graficas.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'graficas.js'));
});
// Crear la conexión fuera de la ruta
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Patapon341.',
  database: 'videojuegofinal'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.post('/login', (req, res) => {
  const email = req.body.user;
  const hashedPassword = crypto.createHash('sha256').update(req.body.pwd).digest('hex');
  const query = 'SELECT usuario FROM cliente WHERE Email = ? AND contraseña = ?';
  connection.query(query, [email, hashedPassword], (error, results) => {
      if (error) {
          console.error('Error al verificar el correo electrónico en la base de datos:', error);
          res.status(500).json({ error: 'Error al verificar el correo electrónico' });
          return;
      }
      console.log('Resultados de la consulta: ', results);
      const user = results.length > 0 ? results[0].usuario : null;
      console.log("valor user: ",user);
      // Verificar si el usuario es valido
      if (user) {
        console.log("si existe user");
        // Establecer la cookie con el nombre de usuario como userId
        //res.cookie('userId', user, { maxAge: 900000, httpOnly: true }); // La cookie expirará en 15 minutos
    }
    // Enviar la respuesta al cliente
    res.json({ user: user });
  });
});

// verificacion de que existe un usuario
app.post('/registro', (req, res) => {
  const email = req.body.email;
  // Realizar una consulta en la base de datos para verificar si el correo electrónico existe
  const query = 'SELECT COUNT(*) AS count FROM cliente WHERE Email = ?';
  connection.query(query, [email], (error, results) => {
      if (error) {
          console.error('Error al verificar el correo electrónico en la base de datos:', error);
          res.status(500).json({ error: 'Error al verificar el correo electrónico' });
          return;
      }
      console.log('Resultados de la consulta: ', results);

      // Verificar si el correo electrónico existe
      const count = results[0].count;
      const exists = count > 0;

      // Enviar la respuesta al cliente
      res.json({ exists });
      //res.cookie('userId', userId, { maxAge: 900000, httpOnly: true }); // La cookie expirará en 15 minutos
  });
});


//de registro de usuarios
app.post('/registroUsuario', (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  const usuario = req.body.usuario;
  const password = req.body.password;
  //const fechadeNacimiento = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const hashedPassword = crypto.createHash('sha256').update(req.body.pwd).digest('hex');
  const datosAInsertar = {
  Email: email,
  usuario: usuario,
  nombre: nombre,
  contraseña: hashedPassword,
  //fechaNacimiento: fechadeNacimiento,
  Region: 'Ciudad de Mexico',
  Pais: 'Mexico',
  };
  connection.query('INSERT INTO cliente SET ?', datosAInsertar,(error, resultados, campos) => {
  if (error) {
    console.error('Error al realizar la consulta: ', error);
    return;
  }
  console.log('Resultados de la consulta: ', resultados);
  res.status(200).send('Registro exitoso');
  });

});


app.post('/actualizarDatos', async (req, res) => {
  const { fechadeNacimiento, telefono, rol, user, region} = req.body;
  try {
    console.log("region: ", region);
    connection.query(
      'UPDATE cliente SET fechaNacimiento = ?, telefono = ?, Rol = ?, region = ? WHERE usuario = ?',
      [fechadeNacimiento, telefono, rol, region, user],
      (error, result) => {
        if (error) {
          console.error('Error al actualizar los datos:', error);
          res.status(500).json({ message: 'Hubo un error al actualizar los datos.' });
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Datos actualizados correctamente.' });
          } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
          }
        }
      }
    );
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    res.status(500).json({ message: 'Hubo un error al actualizar los datos.' });
  }
});

app.get('/ClientesRegion', (req, res) => {
  const query = `
    SELECT region, COUNT(*) as cantidad_clientes
    FROM cliente
    GROUP BY region;
  `;
  // Ejecutar la consulta SQL
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    // Enviar los resultados al cliente
    if (results.length > 0) {
      const data = results.map(result => ({
        region: result.region,
        cantidad_clientes: result.cantidad_clientes
      }));
      console.log("datos: ", data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'No se encontraron datos' });
    }
  });
});

app.get('/Financiamentos', (req, res) => {
  const query = `
    SELECT financiamento, COUNT(*) as financiamentoCount
    FROM jugador
    GROUP BY financiamento;
  `;
  // Ejecutar la consulta SQL
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta finan:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    // Enviar los resultados al cliente
    if (results.length > 0) {
      const data = results.map(result => ({
        financiamento: result.financiamento,
        contador: result.financiamentoCount
      }));
      console.log("datos finan: ", data);
      res.json(data);
    } else {
      res.status(404).json({ error: 'No se encontraron datos finan' });
    }
  });
});


app.get('/porcentajePreguntasCorrectas', (req, res) => {
  const query = `
    SELECT
      SUM(preguntasCorrectas) AS correctas,
      SUM(preguntasIncorrectas) AS incorrectas
    FROM jugador;
  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    if (results.length > 0) {
      const correctas = results[0].correctas;
      const incorrectas = results[0].incorrectas;
      const total = correctas + incorrectas;
     
      const porcentajeCorrectas = total > 0 ? (correctas / total * 100).toFixed(2) : 0;
      console.log("total: ", porcentajeCorrectas);
      res.json({ porcentajeCorrectas: porcentajeCorrectas });
    } else {
      res.status(404).json({ error: 'No se encontraron datos' });
    }
  });
});

app.get('/porcentajeWins', (req, res) => {
  const query = `
    SELECT
      SUM(Wins) AS wins,
      SUM(loses) AS loses
    FROM jugador;
  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    if (results.length > 0) {
      const correctas = results[0].wins;
      const incorrectas = results[0].loses;
      const total = correctas + incorrectas;
     
      const porcentajeCorrectas = total > 0 ? (correctas / total * 100).toFixed(2) : 0;
      console.log("total: ", porcentajeCorrectas);
      res.json({ porcentajeCorrectas: porcentajeCorrectas });
    } else {
      res.status(404).json({ error: 'No se encontraron datos' });
    }
  });
});

// Ruta para obtener los tipos de cultivos y su frecuencia
app.get('/tiposCultivos', (req, res) => {
  const query = `
    SELECT cultivo, COUNT(*) as cantidad
    FROM jugador
    GROUP BY cultivo;
  `;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    if (results.length > 0) {
      const data = results.map(result => ({
        cultivo: result.cultivo,
        cantidad: result.cantidad
      }));
      res.json(data);
    } else {
      res.status(404).json({ error: 'No se encontraron datos' });
    }
  });
});


// Establece la ruta de la solicitud para obtener la edad promedio
app.get('/edadPromedioClientes', (req, res) => {
  const region = req.query.region;
  // Establece la consulta SQL para obtener las fechas de nacimiento no nulas y que estén en la región especificada
  const query = `
    SELECT fechaNacimiento
    FROM cliente
    WHERE fechaNacimiento IS NOT NULL
    AND region = ?
  `;

  // Ejecuta la consulta SQL con la región como parámetro
  connection.query(query, [region], (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    // Calcula la edad promedio
    const totalClientes = results.length;
    console.log("clientes: ",totalClientes)
    let sumaEdades = 0;
    for (let i = 0; i < totalClientes; i++) {
      const fechaNacimiento = results[i].fechaNacimiento;
      const edad = calcularEdad(fechaNacimiento);
      sumaEdades += edad;
    }
    
    const edadPromedio = totalClientes > 0 ? Math.floor(sumaEdades / totalClientes) : 0;
    console.log("edad promedio: ",edadPromedio)
    // Envía la edad promedio al cliente
    res.json({ edadPromedio: edadPromedio });
  });
});

// Función para calcular la edad basada en la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  console.log(edad)
  return edad;
}


// Función asíncrona para obtener los datos del usuario de la base de datos
async function obtenerDatosUsuario(userID) {
  return new Promise((resolve, reject) => {
      // Consulta SQL para obtener los datos del usuario
      const sql = 'SELECT fechaNacimiento, telefono, Rol, region FROM cliente WHERE usuario = ?';
      // Ejecutar la consulta SQL
      connection.query(sql, [userID], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results[0]); // Devuelve el primer resultado (suponiendo que el usuario es único)
          }
      });
  });
}

// Ruta para manejar la solicitud de datos del usuario
app.get('/datosUsuario', async (req, res) => {
  try {
      // Obtener los datos del usuario de la base de datos de forma asíncrona
      const userId = req.query.usuario; // Aquí se obtiene el userId de los parámetros de la consulta
      console.log("user: ",userId);
      const usuario = await obtenerDatosUsuario(userId);
      // Envía los datos del usuario como respuesta
      console.log("region: ",usuario)
      res.json(usuario);
  } catch (error) {
      // Manejar cualquier error que ocurra
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});


app.post('/servidor/recibeDinero', (req, res) => {
  // Datos recibidos del cliente
  const datosDinero = req.body.dinero;
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      // Construir la consulta SQL para actualizar los datos en la tabla cliente
      const queryActualizar = 'UPDATE jugador SET dinero = ? WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [datosDinero, idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla cliente: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla cliente');
              return;
          }
          console.log('Resultados de la consulta: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});


app.post('/servidor/recibeFinanciamento', (req, res) => {
  // Datos recibidos del cliente
  const financiamento = req.body.financiamiento;
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      // Construir la consulta SQL para actualizar los datos en la tabla cliente
      const queryActualizar = 'UPDATE jugador SET financiamento = ? WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [financiamento, idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla cliente: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla cliente');
              return;
          }
          console.log('Resultados de la consulta: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});


app.post('/servidor/recibePreguntas', (req, res) => {
  // Datos recibidos del cliente
  const preguntasCorrectas = req.body.preguntasCorrectas;
  const preguntasIncorrectas = req.body.preguntasIncorrectas;
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      // Construir la consulta SQL para actualizar los datos en la tabla cliente
      const queryActualizar = 'UPDATE jugador SET preguntasCorrectas = ?, preguntasIncorrectas = ? WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [preguntasCorrectas, preguntasIncorrectas, idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla cliente: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla cliente');
              return;
          }
          console.log('Resultados de la consulta: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});



app.post('/servidor/recibeCultivos', (req, res) => {
  // Datos recibidos del cliente
  const cultivo = req.body.cultivo;
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      // Construir la consulta SQL para actualizar los datos en la tabla cliente
      const queryActualizar = 'UPDATE jugador SET cultivo = ? WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [cultivo, idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla jugador: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla jugador');
              return;
          }
          console.log('Resultados de la consulta cultivo: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});

app.post('/servidor/recibePerdida', (req, res) => {
  // Datos recibidos del cliente
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      const queryActualizar = 'UPDATE jugador SET loses = CASE WHEN loses IS NULL THEN 1 ELSE loses + 1 END WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla jugador: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla jugador');
              return;
          }
          console.log('Resultados de la consulta: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});

app.post('/servidor/recibeGanada', (req, res) => {
  // Datos recibidos del cliente
  const user = req.body.user;

  // Realizar una consulta SQL para obtener el idCliente según el usuario
  const queryUsuario = 'SELECT idCliente FROM cliente WHERE usuario = ?';

  connection.query(queryUsuario, [user], (errorUsuario, resultadosUsuario, camposUsuario) => {
      if (errorUsuario) {
          console.error('Error al obtener el idCliente: ', errorUsuario);
          res.status(500).send('Error al obtener el idCliente');
          return;
      }

      if (resultadosUsuario.length === 0) {
          console.error('No se encontró el usuario en la base de datos');
          res.status(404).send('Usuario no encontrado');
          return;
      }

      // Obtener el idCliente del resultado de la consulta
      const idCliente = resultadosUsuario[0].idCliente;

      const queryActualizar = 'UPDATE jugador SET Wins = CASE WHEN Wins IS NULL THEN 1 ELSE Wins + 1 END WHERE idCliente = ?';

      // Ejecutar la consulta SQL con los datos proporcionados
      connection.query(queryActualizar, [idCliente], (errorActualizar, resultadosActualizar, camposActualizar) => {
          if (errorActualizar) {
              console.error('Error al realizar la actualización en la tabla jugador: ', errorActualizar);
              res.status(500).send('Error al realizar la actualización en la tabla jugador');
              return;
          }
          console.log('Resultados de la consulta: ', resultadosActualizar);
          res.status(200).send('Actualización exitosa');
      });
  });
});

//FIJOS  
// Agrega esta nueva ruta en tu archivo servidor.js
app.post('/saveUser', (req, res) => {
    const username = req.body.username;  // Asegúrate de enviar 'username' desde el cliente
    fs.writeFile('username.txt', `Nombre de Usuario: ${username}`, (err) => {
        if (err) {
            console.error('Hubo un error al escribir el archivo:', err);
            return res.status(500).send('Error al guardar el nombre de usuario');
        }
        res.send('Nombre de usuario guardado con éxito');
    });
});


//DIA 26
const fileName = 'username.txt';
// Función para leer el archivo y obtener el valor después del ":"
function leerArchivo(callback) {
  fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer el archivo:', err);
          callback(err, null);
          return;
      }
      // Dividir el contenido por líneas
      const lineas = data.split('\n');

      // Iterar sobre cada línea
      lineas.forEach(linea => {
          // Dividir cada línea por el caracter ":"
          const partes = linea.split(':');

          // Si hay al menos dos partes (nombre de usuario y valor), pasar el valor después del ":" al callback
          if (partes.length >= 2) {
              const valor = partes[1].trim(); // Eliminar espacios alrededor
              callback(null, valor);
          }
      });
  });
}


// Ruta para enviar el nombre de usuario desde el archivo
app.get('/get-username', (req, res) => {
  leerArchivo((err, data) => {
      if (err) {
          res.status(500).send("Error al leer el archivo");
      } else {
          res.send(data);
      }
  });
});


// Iniciar el servidor en el puerto 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

