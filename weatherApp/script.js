window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/e20eae00306c28a0e31cd858cd1c6db3/${latitude},${longitude}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;

                // Set DOM-elements from the API
                temperatureDegree.textContent = parseInt((temperature - 32) * (5 / 9));
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                
                // Celsius to Fahrenheit
                let fahrenheit = parseInt(temperature);

                // Set icons
                setIcons(icon, document.querySelector(".icon"));

                // Change temperature to Celsius/Fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "°C") {
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = parseInt(fahrenheit);
                    } else {
                        temperatureSpan.textContent = "°C"
                        temperatureDegree.textContent = parseInt((temperature - 32) * (5 / 9));
                    };
                });
            });
        });
    };

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "bisque"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    };
});