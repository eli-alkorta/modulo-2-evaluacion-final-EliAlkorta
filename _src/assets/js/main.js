"use strict";

const inputSearchSeries = document.querySelector("#series-name");
const searchButton = document.querySelector(".search-button");
const listOfFavs = document.querySelector(".favourites-list");
const consultedSeries = document.querySelector(".consulted-list");
const deleteAll = document.querySelector(".deleteAllButton");

let series = [];
let favSeries = readLocalStorage();
let favsIdList = [];

let inputElem = null;
const urlBase = "http://api.tvmaze.com/search/shows?q=";

let defaultImage = "https://via.placeholder.com/210x295";
let favId = null;

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
  consultedSeries.innerHTML = "";
  
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
  const listOfSeries = document.querySelectorAll(".list-item");
  
  for (let singleSerie of listOfSeries) {
    singleSerie.addEventListener("click", addToFavouriteHandler);
  }
}

function addToFavouriteHandler() {
  addToFavourite(event);
  getObjectById(favId);
}

function addToFavourite(event) {
  let chooseFav = event.currentTarget;
  
  chooseFav.classList.add("red");
  
  let favId = parseInt(event.currentTarget.id);
  
  if (favsIdList.indexOf(favId) === -1) {
    favsIdList.push(favId);
    
    getObjectById(favId);
  } else {
    favsIdList.splice(favId, 1);
    
  }
}
function getObjectById(favId) {
  for (let serie of series) {
    if (serie.show.id === favId) {
      let object = serie;
      
      favSeries.push(object);
      
      setLocalStorage(favSeries);
      
      paintFavs(favSeries);
    }
  }
}

function setLocalStorage(favSeries) {
  localStorage.setItem("favSeries", JSON.stringify(favSeries));
}

function readLocalStorage() {
  let favSeries = JSON.parse(localStorage.getItem("favSeries"));
  
  if (favSeries !== null) {
    return favSeries;
  }
  
  return (favSeries = []);
}

function paintFavs(favSeries) {
  listOfFavs.innerHTML = "";
  
  for (let favSerie of favSeries) {
    if (favSerie.show.image === null) {
      listOfFavs.innerHTML += `<li class="list-item" id=${favSerie.show.id}><div class="container"><img src=${defaultImage}><button type="button" class="erase-button">X</button><p class="main-title">${favSerie.show.name}</p></div></li>`;
    } else {
      listOfFavs.innerHTML += `<li class="list-item" id=${favSerie.show.id}><div class="container"><img src=${favSerie.show.image.medium}><button type="button" class="erase-button">X</button><p class="main-title">${favSerie.show.name}</p></div></li>`;
    }
  }
  eraseFavListeners(favSeries);
}

function eraseFavListeners() {
  document.body.addEventListener('click', eraseFav);
}

function eraseFav(event){
  if(event.target.classList.contains("erase-button")){
    event.target.parentElement.parentElement.remove();
    let deleteId = event.target.id;
    favSeries.splice(deleteId, 1);
    setLocalStorage(favSeries);
    
  }
}
function resetFavs(){
  favSeries=[];
  setLocalStorage(favSeries);
  paintFavs(favSeries);
}


function init() {
  paintFavs(favSeries);
}

window.addEventListener("load", init);
searchButton.addEventListener("click", getSeries);
deleteAll.addEventListener("click", resetFavs)
