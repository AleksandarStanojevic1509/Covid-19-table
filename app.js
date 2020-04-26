const totalCases = document.querySelector(".total-cases h2");
const totalDeaths = document.querySelector(".total-deaths h2");
const totalRecovered = document.querySelector(".total-recovered h2");
const totalActive = document.querySelector(".active-cases h2");
const lastUpdate = document.querySelectorAll(".last-up");
const tbody = document.querySelector ("tbody")

let lastUp= (d) => {
  let date = new Date(d);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth();
    let hour = date.getHours();
    let minutes = date.getMinutes();

   return `${year}-${month + 1}-${day} ${hour}:${minutes}`;
}


fetch("https://covid19.mathdro.id/api")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    let confirmed = data.confirmed.value;
    let deaths = data.deaths.value;
    let recovered = data.recovered.value;
    let active = confirmed - recovered - deaths;

    totalCases.textContent = confirmed.toLocaleString();
    totalDeaths.textContent = deaths.toLocaleString();
    totalRecovered.textContent = recovered.toLocaleString();
    totalActive.textContent = active.toLocaleString();
    lastUpdate.forEach((l) => {
      l.textContent = lastUp(data.lastUpdate);
    });
    // console.log(data.recovered);
    // console.log(data.lastUpdate);
    return data.confirmed.detail;
  });


  fetch('https://covid19.mathdro.id/api/countries')
  .then(response =>{
    return response.json()
  })
  .then(data =>{
    data.countries.forEach(e=>{
      fetch(`https://covid19.mathdro.id/api/countries/${e.name}`)
      .then(response =>{
        return response.json()
      })
      .then(data =>{
        console.log(data)
        tbody.innerHTML += `<td>${e.name}</td>
        <td class="total-cases" >${data.confirmed.value}</td>
        <td class="total-deaths">${data.deaths.value}</td>
        <td class="total-recovered">${data.recovered.value}</td>
        <td class="active-cases">${data.confirmed.value-data.deaths.value-data.recovered.value}</td>
        <td>${lastUp(data.lastUpdate)}</td>`
        
      })
      
    })
  })
