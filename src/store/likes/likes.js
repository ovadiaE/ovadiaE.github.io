import { combineReducers } from 'redux';

const ADD_CITY= "ADD_FAVORITE"
const SELECT_CITY = "SELECT_CITY"
const REMOVE_CITY = "REMOVE_CITY"

let cities = []
let selectedCity = []

export function addCity(city){
    return {
      type: ADD_CITY,
      city
    }
  }

  export function removeCity(city){
    console.log(city)
    return {
      type: REMOVE_CITY,
      city
    }
}

export function selectCity(city){
  return {
    type: SELECT_CITY,
    city
  }
}

function likedCities (state = cities, action) {
    switch (action.type) {
        
      case ADD_CITY:
          cities.push(action.city)
          cities = cities.filter((item, index) => cities.indexOf(item) === index);
          return cities
           
      case REMOVE_CITY:
        cities = cities.filter((item) =>  item !== action.city)
        return cities
        
      default: 
        return state
    }
}

function selectedCities (state = selectedCity, action) {
  switch (action.type) {
      
    case SELECT_CITY:
      selectedCity.length = 0
      selectedCity.push(action.city)
      return selectedCity   
    
    default: 
      return state
  }
}

const weatherApp = combineReducers({
   likedCities,
   selectedCities
  });

export default weatherApp;