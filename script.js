const icon = document.getElementById("icon");
const city = document.getElementById("city");
const country = document.getElementById("country");
const days = document.getElementById("day");
const months = document.getElementById("month");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const description = document.getElementById("desc"); 

let lat;
let lon;
let key = "7c707d67bfaea395afd4f3cf375077ca";
let time = new Date();
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["Jan", "Feb", "Mar", "Ape", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nav", "Dec"];

//=== day and date month ===//
days.textContent = day[time.getDay()] + ",";
date.textContent = time.getDate();
months.textContent = month[time.getMonth()];

//=== set style for temp ===//
temp.style.cursor = "pointer";
temp.style.color = "blue";

window.addEventListener('load',() =>{ 

    //Get Geolocation
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(pos){
                lat = "lat=" + pos.coords.latitude;
                lon = "lon=" + pos.coords.longitude;
                checkWeather(lat, lon);
            });
    }else console.log("Geolocation is not suppoeted by this browser."); 
});  
 
function checkWeather(lat, lon){

    const url = `http://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&appid=${key}`;
    
    fetch(url).then((Response) =>{
        return Response.json();
        })
        .then((data) =>{
            city.textContent = data.name + ",";
            country.textContent = data.sys.country;

               //== changeing the temp kalvin to F and C         
            const tempF = (((data.main.temp) * 9)/5 + 32) + "F";
            const tempC = ((data.main.temp) - 273.15) + "C"; 

            temp.textContent = tempC;
            temp.addEventListener("click", function(){
                if(temp.textContent === tempC)
                    temp.innerHTML = tempF;
                else temp.innerHTML = tempC;
            });
        
            description.textContent = data.weather[0].description;
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
    });
} 
