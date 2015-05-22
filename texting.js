var accountSid = 'ACacecf3b650996356292bf6fcf5e7d6d9';
var authToken = 'a66399546b83eb0de91ee9b57f059e06'; 
var client = require('twilio')(accountSid,authToken);
var request = require('request');

var currentCity = "Philadelphia",
	countryCode = "US",
	temperatureFormat = "F";

function kelvinToFahrenheit(input) {
    input = (input - 273.15) * 1.8000 + 32.00;
    return parseInt(input);
}

request("http://api.openweathermap.org/data/2.5/weather?q="+currentCity+","+countryCode.toLowerCase()+"", function(error, response, body) {

    // The contents of this function
    // will fire on a successful GET.
    console.log("Got the weather");
    weatherData = JSON.parse(body);
    city = weatherData.name;
    temp = kelvinToFahrenheit(weatherData.main.temp);
    high = kelvinToFahrenheit(weatherData.main.temp_max);
    low = kelvinToFahrenheit(weatherData.main.temp_min);
    description = weatherData.weather[0].description;

    client.messages.create({
	body: description+" and "+temp+" degrees farenheit",
	to: "+15402720604",
	from: "+15712618878",

	}, function(err,message){
		process.stdout.write(message.sid);
	});
});


