async function getData(location){
    const APIKey = '564e0fa27920cea5846abce864ca5d29';
    const city = 'London';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`)

    const data = await response.json()

    console.log(data);
}
getData('Москва');
