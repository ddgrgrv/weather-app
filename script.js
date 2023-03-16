const input = document.getElementById('city');
const btn = document.getElementById('submit');
const list = document.querySelector('.list');

async function getData(location){
    const APIKey = '564e0fa27920cea5846abce864ca5d29';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`);

    const data = await response.json()

    return data
}

function createItem(data){
    const item = document.createElement('li');
    const itemCity = document.createElement('span');
    const inner = document.createElement('div');
    const itemTemperature = document.createElement('span');
    const itemWind = document.createElement('span');
    const img = document.createElement('img');
    const desc = document.createElement('p');

    switch(data.weather[0].main){
        case 'Clear' : img.src = '/img/sunny.svg';
            break
        case 'Clouds' : img.src = '/img/cloudy.svg';
            break
        case 'Rain' : img.src = '/img/rainy.svg';
            break
    }

    item.classList.add('item');
    itemCity.classList.add('item__city');
    inner.classList.add('inner');
    itemTemperature.classList.add('item__temperature');

    itemCity.innerHTML = data.name;
    itemTemperature.innerHTML = `${Math.round(data.main.temp)}°C`;
    itemWind.innerHTML = `${Math.round(data.wind.speed)} м/с`;
    desc.innerHTML = data.weather[0].description;

    inner.append(itemTemperature, itemWind,img,desc);
    item.append(itemCity,inner);

    return item
}

btn.addEventListener('click',async function(e){
    e.preventDefault();
   
    const weatherData = await getData(input.value);
    console.log(weatherData);
    
    const item = createItem(weatherData);

    list.append(item);

    // console.log(data.weather[0].main === 'Clear');

});


