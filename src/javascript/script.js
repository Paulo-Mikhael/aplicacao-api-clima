document.querySelector("#search").addEventListener('submit',
async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (cityName == ''){
        document.querySelector('#weather').classList.remove('show');
        return showAlert('Digite uma cidade...');
    }

    const apiKey = '8db7c059431c39a3f9cc52b89707a944'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`
    const result = await fetch(apiUrl);
    const JSON = await result.json();

    if (JSON.cod === 200){
        showInfo({
            city: JSON.name,
            country: JSON.sys.country,
            temp: JSON.main.temp,
            tempMax: JSON.main.temp_max,
            tempMin: JSON.main.temp_min,
            description: JSON.weather[0].description,
            tempIcon: JSON.weather[0].icon,
            windSpeed: JSON.wind.speed,
            humidity: JSON.main.humidity
        })
    }else{
        document.querySelector('#weather').classList.remove('show');
        showAlert('Não foi possível localizar...');
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector('#weather').classList.add('show');
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.',',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.',',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed}km/h`;
}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}
