document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "8a9663fc679a408dba6220719241104";
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", () => {
        const city = document.getElementById("city").value;
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    });

    function displayWeather(data) {
        const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        const today = new Date();
        
        document.getElementById("location").textContent = data.location.name;
        document.getElementById("date").textContent = today.toLocaleDateString("pt-BR");
        document.getElementById("day").textContent = days[today.getDay()];
        document.getElementById("temperature").textContent = `Temperatura: ${data.current.temp_c}°C`;
        document.getElementById("temp-min-max").textContent = `Mín: ${data.forecast.forecastday[0].day.mintemp_c}°C / Máx: ${data.forecast.forecastday[0].day.maxtemp_c}°C`;
        document.getElementById("wind-speed").textContent = `Velocidade do Vento: ${data.current.wind_kph} km/h`;
        document.getElementById("condition").textContent = `Condição: ${data.current.condition.text}`;
        
        const weatherImg = document.getElementById("weather-icon");
        weatherImg.innerHTML = `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`;
    }
});