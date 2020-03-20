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

 let singleSerie = null;

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

  // console.log(event.currentTarget);

let chooseFav = event.currentTarget;

favSeries.push(chooseFav);

chooseFav.classList.toggle('red');

// console.log(favSeries);

}



searchButton.addEventListener('click', buttonHandler);
