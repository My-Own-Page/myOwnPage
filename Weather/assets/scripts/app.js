import { API_KEY, GOOGLE_MAP_API_KEY } from "./apikey.js";

const apiKey = API_KEY;
const googleApiKey = GOOGLE_MAP_API_KEY;

const COORDS = 'coords';

let latitude;
let longitude;

const $weatherUl = document.querySelector('.weatherUl');

// handleGeoSucces 수정
function handleGeoSucces(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
  getGoogleMapsData(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    latitude = parseCoords.latitude;
    longitude = parseCoords.longitude;
    getWeather(latitude, longitude);
    getGoogleMapsData(latitude, longitude); // Fetch Google Maps data here
  }
}

function init() {
  loadCoords();
}

init();

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeatherIconAndText(weatherMain) {
  const iconMappings = {
    Rain: { border: 'fa-solid', icon: 'fa-cloud-rain', text: '비' },
    Clouds: { border: 'fa-solid', icon: 'fa-cloud', text: '구름' },
    Drizzle: { border: 'fa-light', icon: 'fa-cloud-rain', text: '이슬비' },
    Thunderstorm: { border: 'fa-light', icon: 'fa-cloud-bolt', text: '뇌우' },
    Snow: { border: 'fa-light', icon: 'fa-snowflake', text: '눈' },
    Mist: { border: 'fa-duotone', icon: 'fa-smog', text: '약한 안개' },
    Fog: { border: 'fa-solid', icon: 'fa-smog', text: '짙은 안개' },
    Haze: { border: 'fa-brands', icon: 'fa-cloudflare', text: '흐릿' }
  };

  const { border, icon, text } = iconMappings[weatherMain] || { border: '', icon: '', text: '' };

  return { border, icon, text };
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      const $icoLi = document.createElement('ii');
      const $textLi = document.createElement('li');
      const $tempLi = document.createElement('li');
      if (json.weather && json.weather[0] && json.weather[0].main) {
        const weatherMain = json.weather[0].main;
        console.log('Weather Main:', weatherMain);

        const { border, icon, text } = getWeatherIconAndText(weatherMain);

        if (icon && text) {
          const $weatherIco = document.createElement('i');
          $weatherIco.classList.add('weather-ico');
          $weatherIco.classList.add('fa-2xl');
          $weatherIco.classList.add(border);
          $weatherIco.classList.add(icon);
          $icoLi.appendChild($weatherIco);

          // const $weatherText = document.createElement('p');
          $textLi.textContent = text;
          $textLi.classList.add('weather-text');
          // $textLi.appendChild($weatherText);
        }
      }
      const temp = json.main.temp.toFixed(1) + '°C';
      console.log(temp);
      $tempLi.append(temp);
      $tempLi.classList.add('temp-text');

      $weatherUl.append($icoLi, $textLi, $tempLi);
    });
}

// Google Maps API 요청을 별도로 만들어 사용
function getGoogleMapsData(lat, lon) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        for (const component of addressComponents) {
          if (component.types.includes('locality')) {
            console.log('도시:', component.long_name);
            const $cityName = document.createElement('li');
            $cityName.textContent = component.long_name + '의 날씨';
            $cityName.classList.add('city');
            $weatherUl.appendChild($cityName);
          }
        }
      } else {
        console.log('위치정보가 없음');
      }
    })
    .catch((error) => {
      console.error("Error fetching Google Maps data:", error);
    });
}
