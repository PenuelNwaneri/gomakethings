/**
 * Two (2) external API used
 * https://ipapi.co/json
 * https://www.weatherbit.io/api
 */

/*
 * IIFE - exposes 'weather.options()' to pass in options
 * Example:
 * weather.options({
 *  tempUnit: 'f' [or 'c'],
 *  showIcon: true [or false],
 * })
 */

var weather = ( function () {
    // Varaibles
    var publicApis = {};
    var apiKeyWeather = '22ab974c265f462ba59d1e4e1b296041';
    var optionsDefault = {
        tempUnit: 'f',
        showIcon: true,
    };

    // Global location variables
    var city, state, zipCode;

    // Expose options API to allow options.
    publicApis.options = function (options) {
        if (!options) return;
        optionsDefault = extend(optionsDefault, options);

        publicApis.init();
    }

    publicApis.init = function () {
        // Retrieve IP address
        makeRequest('https://ipapi.co/json', 'GET', getWeather, showOutputOnError);
    }

    function getWeather (ipAddress) {
        // Set variables for location data
        city = ipAddress.city;
        state = ipAddress.region;
        zipCode = ipAddress.postal;

        var weatherUrl = `http://api.weatherbit.io/v2.0/current?postal_code=${zipCode}&key=${apiKeyWeather}`;

        makeRequest(weatherUrl, 'GET', renderTemp, showOutputOnError)
    }

    function showOutputOnError(data, xhr) {
        console.error(data);
        console.error(xhr);
        var app = document.querySelector('#app');
        app.innerHTML = "Something went wrong...SORRY!";
    }

    // 'tempUnit' is the unit of the input temp
    function tempConvert(temp, tempUnit) {
        var tempOutput;
        if (tempUnit.toLowerCase() === 'f') {
            tempOutput = Math.round((parseFloat(temp) * 9/5) + 32)
        }
        if (tempUnit.toLowerCase() === 'c') {
            tempOutput = temp;
        }
        return tempOutput;
    }

    // Render into website
    function renderTemp (weatherInfo) {
        // Variables - Get temp/weather data
        var temp = tempConvert(weatherInfo.data[0].temp, optionsDefault.tempUnit);
        var tempUnit = optionsDefault.tempUnit.toUpperCase();
        var weatherDescription = weatherInfo.data[0].weather.description;
        var weatherIcon = weatherInfo.data[0].weather.icon;

        var app = document.querySelector('#app');
        app.innerHTML = ''

        var weather = document.createElement('div');
        weather.innerHTML = `It's currently <strong>${temp} °${tempUnit}</strong>, and <strong>${weatherDescription}</strong> in ${city}, ${state} ${zipCode}`;

        app.appendChild(weather);

        if (optionsDefault.showIcon) {
            var weatherImgUrl = `https://www.weatherbit.io/static/img/icons/${weatherIcon}.png`;
            var weatherIcon = document.createElement('div');
            weatherIcon.innerHTML = `<img src="${weatherImgUrl}">`
            app.appendChild(weatherIcon);
        }
    }
    return publicApis;
})();

weather.init();

// Optional
// weather.init({
//    tempUnit: 'F',
//    showIcon: false,
// })

/*
 * Question for Chris: What is the advatnage of delinking tab and content relationship?
 *
 */
