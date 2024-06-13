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


    export function mayorasistencia(data) {
      data= data.events
  
      const objetoMayor = data.reduce((max, obj) => (obj.assistance > max.assistance ? obj : max), data[0]);
      return objetoMayor
  
  }
  
  export function menorasistencia(data) {
  
      data= data.events
  
      const objetoMenor = data.reduce((min, obj) => (obj.assistance < min.assistance ? obj : min), data[0]);
      return objetoMenor
  
  }
  
  export function mayorCapacidad(data) {
  
      data= data.events
  
      const objetoMayorCapacidad = data.reduce((max, obj) => (obj.capacity > max.capacity ? obj : max), data[0]);
      return objetoMayorCapacidad
  
  }
  
  export function pastEventsData(data){
  
      let eventos= data.events.filter(event => event.date < data.currentDate);
  
      const resultado = eventos.reduce((acc, evento) => {
          const { category, assistance, capacity, price } = evento;
          const dineroGanado = assistance * price;
          const porcentajeAsistencia = (assistance / capacity).toFixed(2) * 100;
      
          if (!acc[category]) {
              acc[category] = {
                  categoria: category,
                  dineroGanado: 0,
                  totalEventos: 0,
                  porcentajeAsistenciaTotal: 0
              };
          }
      
          acc[category].dineroGanado += dineroGanado;
          acc[category].porcentajeAsistenciaTotal += porcentajeAsistencia;
          acc[category].totalEventos += 1;
          
          console.log(acc);
          return acc;
      }, {});
      
      // 2. Convertir el objeto resultado en un array y calcular el promedio de porcentaje de asistencia por categoría
      const arrayResultado = Object.values(resultado).map(categoria => ({
          categoria: categoria.categoria,
          dineroGanado: categoria.dineroGanado,
          porcentajeAsistenciaPromedio: categoria.porcentajeAsistenciaTotal / categoria.totalEventos
      }));
      
  
      return arrayResultado
  
      
  
       
  }
  
  export function pintarPastEvents(data){
      let texto=``
      data=pastEventsData(data)
  
      data.forEach(element => {
  
      texto+= `
      <tr>
      <td>${element.categoria}</td>
      <td>${formatearComoDolares(element.dineroGanado)}</td>
      <td>${element.porcentajeAsistenciaPromedio}%</td>
      </tr>
          
          `
      });
  
      return texto
  
  
      
  }
  
  export function upcomingEventsData(data){
  
      let eventos= data.events.filter(event => event.date > data.currentDate);
      console.log(eventos);
      const resultado = eventos.reduce((acc, evento) => {
          const { category, capacity, price,estimate } = evento;
          const dineroGanado = capacity * price;
          const porcentajeAsistencia = (estimate / capacity).toFixed(2) * 100;
      
          if (!acc[category]) {
              acc[category] = {
                  categoria: category,
                  dineroGanado: 0,
                  totalEventos: 0,
                  porcentajeAsistenciaTotal: 0
              };
          }
      
          acc[category].dineroGanado += dineroGanado;
          acc[category].porcentajeAsistenciaTotal += porcentajeAsistencia;
          acc[category].totalEventos += 1;
          
          
          return acc;
      }, {});
      
      // 2. Convertir el objeto resultado en un array y calcular el promedio de porcentaje de asistencia por categoría
      const arrayResultado = Object.values(resultado).map(categoria => ({
          categoria: categoria.categoria,
          dineroGanado: categoria.dineroGanado,
          porcentajeAsistenciaPromedio: categoria.porcentajeAsistenciaTotal / categoria.totalEventos
      }));
      
  
      return arrayResultado
  
      
  
       
  }
  export function pintarUpcomingEvents(data){
      let texto=``
      data=upcomingEventsData(data)
  
      data.forEach(element => {
  
      texto+= `
      <tr>
      <td>${element.categoria}</td>
      <td>${formatearComoDolares(element.dineroGanado)}</td>
      <td>${element.porcentajeAsistenciaPromedio}%</td>
      </tr>
          
          `
      });
  
      return texto
  
  
  
      
  }
  export function formatearComoDolares(valor) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}
  
  export function pintarTabla(data,padre) {
  
      padre.innerHTML = `
  <table class="table table-bordered">
  <thead>
    <tr>
      <th colspan="3"  scope="row" class="table-active">Events Statics</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Event with higher assistance</td>
      <td>Events with lower assistance</td>
      <td>Event with larger capacity</td>
    </tr>
    <tr>
      <td>${mayorasistencia(data).name} : ${mayorasistencia(data).assistance} </td>
      <td>${menorasistencia(data).name} : ${menorasistencia(data).assistance} </td>
      <td> ${mayorCapacidad(data).name} : ${mayorCapacidad(data).capacity} </td>
    </tr>

    <th colspan="3"  scope="row">Past Events Statics by Category</th>
    </tr>
    <tr>
        <td>Categories</td>
      <td>Revenues</td>
      <td>Porcentage of assitance</td>
      </tr>
      ${pintarPastEvents(data)}


      <th colspan="3"  scope="row" class="table-active">Upcoming Events Estatic by Category</th>
    </tr>
      <tr>
      <td>Categories</td>
      <td>Revenues</td>
      <td>Porcentage of assitance</td>
    </tr>
    ${pintarUpcomingEvents(data)}
    
      
      
  
  </tbody>
  </table>
  
  `
  
  
  }