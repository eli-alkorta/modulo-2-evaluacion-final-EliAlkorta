'use strict';

const inputSearchSeries = document.querySelector('#series-name');
const searchButton = document.querySelector('.search-button');
const listOfFavs = document.querySelector('.favourites-list');
const consultedSeries = document.querySelector('.consulted-list');

let series = [];
let favSeries = [];

let inputElem = null;
const urlBase =  "http://api.tvmaze.com/search/shows?q=";

let defaultImage = "https://via.placeholder.com/210x295";
let favId = null;


function buttonHandler(){
    getSeries();

}


function getSeries() {
    inputElem = inputSearchSeries.value;
    fetch(`${urlBase}${inputElem}`)
      .then(response => response.json())
      .then(data => {
        series = data;

        paintResult(series);
    
        paintFavs(favSeries);
        
      });
  }

  function paintResult(arr) {
    
    consultedSeries.innerHTML = '';

    for (let item of arr) {

      if (item.show.image === null) {

        consultedSeries.innerHTML += `<li class="list-item" id=${item.show.id}><p class="main-title">${item.show.name}</p><img src=${defaultImage}></li>`;

      } else {
     consultedSeries.innerHTML += `<li class="list-item" id=${item.show.id}><p class="main-title">${item.show.name}</p><img src=${item.show.image.medium}></li>`;

    }
  }
  addListeners(series);
}

function addListeners() {

const listOfSeries = document.querySelectorAll('.list-item');

for (let singleSerie of listOfSeries) {

singleSerie.addEventListener('click', addToFavourite);

}
}

function addToFavourite(event) {

let chooseFav = event.currentTarget;

chooseFav.classList.toggle('red');

let favId = parseInt(event.currentTarget.id);

favSeries.push(favId);

// setLocalStorage(favSeries);

paintFavs(favSeries);


}

// function setLocalStorage(favSeries){

//   localStorage.setItem('favSeries',JSON.stringify(favSeries));

// }

// function readLocalStorage(){

//   let favSeries = JSON.parse(localStorage.getItem('favSeries'));
  
//   if(favSeries !== null){
//     return favSeries;
//   }
  
//   return favSeries = [];
// }

function getObjectById(favId){

  for(let serie of series){

    if(serie.show.id === favId) {

      return serie;
      
    }

  }
 
}

function paintFavs(favSeries){


  listOfFavs.innerHTML = '';

  for(let favSerie of favSeries) {

    let serie = getObjectById(favSerie);

    if (serie){

      listOfFavs.innerHTML += `<li class="list-item" id=${serie.show.id}><div class="container"><img src=${serie.show.image.medium}><p class="main-title">${serie.show.name}</p></div></li>`;
    }
  }

}

//relacionar el toggle con el id (no el chooseFav), para que cuando la peli se pinte de favorita, se pinte en la lista.
//y si se quita el rojo, se borra de la lista.
// que los favoritos no se duplique.
  


searchButton.addEventListener('click', buttonHandler);
