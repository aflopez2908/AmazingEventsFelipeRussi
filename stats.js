import {pintarTabla} from './module.js'

let padre = document.getElementById("tablestats");


async function obtenerEventos() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // pintarTabla(data);

        
        pintarTabla(data,padre)
                
        

    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}



obtenerEventos()

