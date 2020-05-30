const weather = document.querySelector(".weather");
const updateBtn = document.querySelector(".updateBtn");


function refresh () {
    console.log("hey");
    localStorage.removeItem("좌표");
}

const API_KEY = "b52951f1b68a6cb24ae38b8b4169db61";
const COORDS = "좌표";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    //API 제공 사이트에서 호출 양식을 복붙
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const wt = json.weather[0].main;
        const place = json.name;
        const area = json.sys.country;
        weather.innerText = `${temperature}˚C / ${wt} 
        @ ${place} in ${area}`;
    });
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longitude;
    const coordsObj = {
        "경도": latitude,
        "위도": longtitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longtitude);
}

function handleGeoError() {
    alert("Can't access Geo Location..");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    //navigator: 사용자 정보들을 불러오기
    //geoloation: 사용자 정보들 중 위치 관련된 API
    //getCurrentPosition: 사용자의 현재 위치 불러오는 function(동의필요)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
        //저장된 좌표값이 없으면 실행
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.경도, parsedCoords.위도);
        //저장된 좌표값이 있으면 좌표값의 위도, 경도를 parse하기
    }
}

function init() {
    loadCoords();
    updateBtn.addEventListener("click", refresh);
}
init();
