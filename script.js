const input = document.getElementById('city');
const btn = document.getElementById('submit');
const list = document.querySelector('.list');

async function getData(location){
    const APIKey = '564e0fa27920cea5846abce864ca5d29';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`);

    if (!response.ok) { 
        alert("Ошибка HTTP: " + response.status);
      } 

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
    const spanInner = document.createElement('div');
    const imgInner = document.createElement('div');

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
    spanInner.classList.add('flex');
    imgInner.classList.add('flex');
    img.classList.add('image');
    img.classList.add('circle');

    itemCity.innerHTML = data.name;
    itemTemperature.innerHTML = `${Math.round(data.main.temp)}°C`;
    itemWind.innerHTML = `wind speed: ${Math.round(data.wind.speed)} м/с`;
    desc.innerHTML = data.weather[0].description;
    
    spanInner.append(itemTemperature,itemWind);
    imgInner.append(img,desc);
    inner.append(spanInner,imgInner);
    item.append(itemCity,inner);

    return item
}

btn.addEventListener('click',async function(e){
    e.preventDefault();
   
    const weatherData = await getData(input.value);
    console.log(weatherData);
    
    const item = createItem(weatherData);
    item.classList.add('b-show');

    list.prepend(item);

    input.value = '';
});


