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
    for (let item of arr) {

     consultedSeries.innerHTML = `<li class="list-item" id=${item.show.id}><p class="main-title">${item.show.name}</p><img src=${item.show.image.medium}></li>`;

    }

     if (item.show.image === null) {

        item.show.image.medium = "https://via.placeholder.com/210x295";
            
  }
  }

searchButton.addEventListener('click', buttonHandler);
