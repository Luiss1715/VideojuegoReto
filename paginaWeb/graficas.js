




fetch('/ClientesRegion')
  .then(response => response.json())
  .then(data => {
    const regions = data.map(item => item.region);
    const cantidadClientes = data.map(item => item.cantidad_clientes);

    // Crear datos para el gráfico de anillos
    const dataChart = {
      labels: regions,
      datasets: [{
        data: cantidadClientes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ]
      }]
    };

    // Configuración del gráfico de anillos
    const config = {
      type: 'doughnut',
      data: dataChart,
      options: {
        responsive: true,
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Clientes por región'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    // Dibujar el gráfico de anillos en el canvas
    var donutChart = new Chart(
      document.getElementById('donutChart'),
      config
    );

    
  

    const canvas = document.getElementById('donutChart');

    canvas.addEventListener('mousemove', function(event) {
        const activePoints = donutChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activePoints.length > 0) {
            // Si hay un segmento activo bajo el mouse
            const firstPoint = activePoints[0];
            const label = donutChart.data.labels[firstPoint.index];
            const value = donutChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
    
            // Hacer una solicitud al servidor para obtener la edad promedio de los clientes en esa región
            fetch(`/edadPromedioClientes?region=${label}`)
                .then(response => response.json())
                .then(data => {
                    // Mostrar la edad promedio en el elemento HTML
                    document.getElementById('edadPromedio').textContent = 'Edad promedio de los clientes en ' + label + ': ' + data.edadPromedio.toFixed(2) + " años";
                })
                .catch(error => console.error('Error al obtener la edad promedio:', error));
        }
    });


  })

  
  .catch(error => console.error('Error al obtener los datos:', error));


  // Realizar una solicitud GET a la ruta '/Financiamentos'
fetch('/Financiamentos')
.then(response => response.json())
.then(data => {
  // Procesar los datos obtenidos
  const labels = data.map(item => item.financiamento);
  const counts = data.map(item => item.contador);

  // Crear el gráfico de barras
  var ctx = document.getElementById('barChart').getContext('2d');
  var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cantidad de Financiamientos',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
});



// Solicitud para obtener el porcentaje de preguntas correctas
fetch('/porcentajePreguntasCorrectas')
  .then(response => response.json())
  .then(data => {
    const porcentajeCorrectas = data.porcentajeCorrectas;
    
 // Calcular el porcentaje de preguntas incorrectas
  const porcentajeIncorrectas = 100 - porcentajeCorrectas;

  // Datos para el gráfico tipo donut
  const dataChart = {
    labels: ['Porcentaje de Preguntas Correctas', 'Porcentaje de Preguntas Incorrectas'],
    datasets: [{
      data: [porcentajeCorrectas, porcentajeIncorrectas],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'], // Primer color para el porcentaje correcto y segundo para el porcentaje incorrecto
      borderWidth: 0
    }]
  };

  // Configuración del gráfico tipo donut
  const config = {
    type: 'doughnut',
    data: dataChart,
    options: {
      responsive: true,
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Porcentaje de Preguntas'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      tooltips: {
        enabled: true // Deshabilita las etiquetas emergentes (tooltips) si lo deseas
      }
    }

  
  };

    // Dibujar el gráfico en el canvas
    new Chart(document.getElementById('gaugeChart'), config); // Asegúrate de tener un <canvas id="gaugeChart"></canvas> en tu HTML
  })
  .catch(error => console.error('Error al obtener los datos:', error));



  
// Solicitud para obtener el porcentaje de preguntas correctas
fetch('/porcentajeWins')
.then(response => response.json())
.then(data => {
  const porcentajeCorrectas = data.porcentajeCorrectas;
  
// Calcular el porcentaje de preguntas incorrectas
const porcentajeIncorrectas = 100 - porcentajeCorrectas;

// Datos para el gráfico tipo donut
const dataChart = {
  labels: ['Porcentaje de Wins usuarios activos', 'Porcentaje de Loses usuarios activos'],
  datasets: [{
    data: [porcentajeCorrectas, porcentajeIncorrectas],
    backgroundColor: ['rgba(0, 128, 0, 0.9)', 'rgba(255, 165, 0, 0.9)'],
    borderWidth: 0
  }]
};

// Configuración del gráfico tipo donut
const config = {
  type: 'doughnut',
  data: dataChart,
  options: {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Porcentaje de Wins'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    tooltips: {
      enabled: true // Deshabilita las etiquetas emergentes (tooltips) si lo deseas
    }
  }


};

  // Dibujar el gráfico en el canvas
  new Chart(document.getElementById('WinsChart'), config); // Asegúrate de tener un <canvas id="gaugeChart"></canvas> en tu HTML
})
.catch(error => console.error('Error al obtener los datos:', error));



//prueba
 // Realizar una solicitud GET a la ruta '/Financiamentos'
 fetch('/tiposCultivos')
 .then(response => response.json())
 .then(data => {
   // Procesar los datos obtenidos
    const labels = data.map(item => item.cultivo);
    const counts = data.map(item => item.cantidad);
 
   // Crear el gráfico de barras
   var ctx = document.getElementById('barChartCultivos').getContext('2d');
   var barChart = new Chart(ctx, {
     type: 'bar',
     data: {
       labels: labels,
       datasets: [{
         label: 'Cantidad de Cultivos',
         data: counts,
         backgroundColor: 'rgba(54, 162, 235, 0.2)',
         borderColor: 'rgba(54, 162, 235, 1)',
         borderWidth: 1
       }]
     },
     options: {
       scales: {
         yAxes: [{
           ticks: {
             beginAtZero: true
           }
         }]
       }
     }
   });
 })
 .catch(error => {
   console.error('Error al obtener los datos:', error);
 });