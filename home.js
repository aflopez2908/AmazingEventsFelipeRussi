// main.js

import { pintarTarjeta, pintarCheckBox, applyFilters } from './module.js';

let padre = document.getElementById("cards_container");
let padreCheck = document.getElementById('padreChecks');

// Variables globales para almacenar el estado de los filtros
let searchTerm = '';
let selectedCategories = new Set();
let globalData = { events: [] }; // Se usará para almacenar los datos de la API

// Listener para el searchbar
let searchBar = document.getElementById("searchbarhome");
searchBar.addEventListener("keyup", function() {
    searchTerm = searchBar.value.toLowerCase();
    applyFilters(globalData.events, selectedCategories, searchTerm, padre);
});

// Obtener datos de la API
async function obtenerEventos() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        globalData.events = data.events; // Asigna los datos obtenidos a la variable global
        inicializarContenido();
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

// Inicializar el contenido después de obtener los datos
function inicializarContenido() {
    pintarCheckBox(padreCheck, globalData.events, selectedCategories, () => applyFilters(globalData.events, selectedCategories, searchTerm, padre));
    pintarTarjeta(padre, globalData.events);
}

// Llamar a la función para obtener los eventos al cargar la página
obtenerEventos();
