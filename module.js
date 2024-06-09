fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => {
    // Verifica si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    // Convierte la respuesta a JSON
    return response.json();
  })
  .then(data => {
    // Usa los datos
    console.log(data);
    // Aquí puedes agregar el código para utilizar los datos en tu aplicación
  })
  .catch(error => {
    // Maneja los errores
    console.error('Hubo un problema con la solicitud fetch:', error);
  });
