// module.js

export function crearTarjeta(padre, data, position) {
  let nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList.add("tarjeta");

  nuevaTarjeta.innerHTML = `
      <div class="card border border-light mb-3" style="width: 18rem;">
          <img src=${data[position].image} class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${data[position].name}</h5>
              <p class="card-text">${data[position].description}</p>
              <p class="card-text">Date: ${data[position].date}</p>
              <a href="details.html?id=${data[position]._id}" class="btn btn-primary">Know more</a>
          </div>
      </div>
  `;

  padre.appendChild(nuevaTarjeta);
}

export function pintarTarjeta(padre, data) {
  for (let index = 0; index < data.length; index++) {
      crearTarjeta(padre, data, index);
  }
}

export function crearCheckBox(padre, data, position, selectedCategories, applyFilters) {
  let nuevocheck = document.createElement("div");
  nuevocheck.classList.add('form-check');

  nuevocheck.innerHTML = `
      <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${position}">
      <label class="form-check-label" for="flexRadioDefault${position}">
          ${data[position].category}
      </label>
  `;

  padre.appendChild(nuevocheck);
  nuevocheck.querySelector('input').addEventListener('change', (event) => handleCheckboxChange(event, selectedCategories, applyFilters));
}

export function pintarCheckBox(padre, data, selectedCategories, applyFilters) {
  let revision = [];

  for (let index = 0; index < data.length; index++) {
      if (!revision.includes(data[index].category)) {
          crearCheckBox(padre, data, index, selectedCategories, applyFilters);
          revision.push(data[index].category);
      }
  }
}

export function handleCheckboxChange(event, selectedCategories, applyFilters) {
  let label = event.target.nextElementSibling;
  let category = label.textContent.trim();
  
  if (event.target.checked) {
      selectedCategories.add(category);
  } else {
      selectedCategories.delete(category);
  }
  
  applyFilters();
}

export function applyFilters(data, selectedCategories, searchTerm, padre) {
  let filteredNotes = data.filter(event => {
      let matchesCategory = selectedCategories.size === 0 || selectedCategories.has(event.category);
      let matchesSearchTerm = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearchTerm;
  });

  padre.innerHTML = "";

  if (filteredNotes.length === 0) {
      padre.innerHTML = `
          <div class="alert bg-secondary">
              <h2>No hay contenido relacionado</h2>
              <p>Verifica los parámetros de búsqueda</p>
          </div>
      `;
      console.log("No hay coincidencias");
  } else {
      pintarTarjeta(padre, filteredNotes);
  }
}

export function menores(data){
  let temp=[]
  for (let index = 0; index < data.events.length; index++) {

    if(data.currentDate<data.events[index].date){
      temp.push(data.events[index])
    }
     
  }
    
   return temp 
  }


  export function mayores(data){
    let temp=[]
    for (let index = 0; index < data.events.length; index++) {
    
      if(data.currentDate>data.events[index].date){
        temp.push(data.events[index])
      }
       
    }
      
     return temp 
    }
