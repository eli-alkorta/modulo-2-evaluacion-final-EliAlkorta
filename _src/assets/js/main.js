'use strict';

const inputSearchSeries = document.querySelector('#series-name');
const searchButton = document.querySelector('.search-button');
const listOfFavs = document.querySelector('.favourites-list');
const consultedSeries = document.querySelector('.consulted-list');

let series = [];
let favSeries = [];
let inputElem = null;

const urlBase =  "http://api.tvmaze.com/search/shows?q=";

function buttonHandler(){
    inputElem = inputSearchSeries.value;
    getSeries();
}


function getSeries() {
    fetch(`${urlBase}${inputElem}`)
      .then(response => response.json())
      .then(data => {
        series = data;
        paintResult(series);
      });
  }

  function paintResult(arr) {
    for (let item of arr) {

     consultedSeries.innerHTML += `<li class="list-item" id=${item.show.id}><p class="main-title">${item.show.name}</p><img src=${item.show.image.medium}></li>`;

  }
  }
  
searchButton.addEventListener('click', buttonHandler);