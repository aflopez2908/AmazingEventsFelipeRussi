let globalData = { events: [] };

async function obtenerEventos() {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    globalData.events = data.events; // Asigna los datos obtenidos a la variable global
    getId();
  } catch (error) {
    console.error('Hubo un problema con la solicitud fetch:', error);
  }
}

function getEventById(id, events) {
  return events.find(event => event._id == id);
}

function getId() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (eventId) {

    const eventDetails = getEventById(eventId, globalData.events);



    if (eventDetails) {

      document.querySelector('.card-title').innerText = eventDetails.name;
      document.querySelector('.card-text').innerText = eventDetails.description;
      document.querySelector('.card img').src = eventDetails.image;
      document.querySelector('.card-category').innerText = `Category: ${eventDetails.category}`;
      document.querySelector('.card-place').innerText = `Place: ${eventDetails.place}`;
      document.querySelector('.card-capacity').innerText = `Capacity: ${eventDetails.capacity}`;
      document.querySelector('.card-estimate').innerText = `Estimate: ${eventDetails.estimate || 'N/A'}`;
      document.querySelector('.card-price').innerText = `Price: ${eventDetails.price}`;
      document.querySelector('.card-date').innerText = `Date: ${eventDetails.date}`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  obtenerEventos();
});

