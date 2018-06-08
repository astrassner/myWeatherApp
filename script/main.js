/*function shuffleImg() {
    var images = ["kitten_clear.jpg", "kitten_cold.jpg", "kitten_rain.jpg", "kitten_snow.jpg", "kitten_thunder.jpeg", "kitten_warm_swim.jpg", "kitten_clear2.jpg", "kitten_rain2.jpg"];

    $('<img class="fade-in" src="style/kitten/' + images[Math.floor(Math.random() * images.length)] + '">').appendTo('.shuffle');

}*/

/*shuffleImg()*/

var app = new Vue({

    el: ".weather",
    data: {
        cityName: " ",

    },
    created: function () {
        /*this.getData();*/
        this.keyPress();
        this.onClick();
    },
    methods: {
        getData: function () {
                
                    var city = $(".search").val();
                    if (city != "" && isNaN(city)) {
                        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=en&appid=a3364b5758c047f38dff27c3de55f5ff";
                    } else if (city == "") {
                        location.reload();
                    } else {
                        alert("Please search by City name")
                    }
                    $.getJSON(url, function (data) {
                        console.log(data);
                        app.weatherData(data);
                        app.additionalData(data);
                    })
                
        },
        
        keyPress: function(){
            $(".search").keypress(function (e) {
                if (e.which == 13) {
                    app.getData();
                }
            })
        },
        
        onClick: function(){
            $("#searchButton").on("click", function(){
                app.getData();
            })    
        },
        
        weatherData: function (data) {

            var weatherDiv = $(".searchedCity");

            this.cityName = data.name;

            $(".searchedCity p").html(this.cityName)

            var weatherLogo = "style/weather/" + data.weather[0].main + ".svg";

            var img = document.createElement("img");
            img.setAttribute('src', weatherLogo);
            img.setAttribute("class", "weatherLogo");

            $(".weatherLogo").html(img);

            var temperature = Math.round(data.main.temp) + "C°";

            $("#temperature").html(temperature);

        },
        additionalData: function (data) {

            var maxTemp = Math.round(data.main.temp_max) + "C°";

            var maxTempImg = "style/weather/maxTemp" + ".svg"

            var img = document.createElement("img");
            img.setAttribute("src", maxTempImg);
            img.setAttribute("class", "maxTempImg");

            $(".maxTempImage").html(img);
            $("#numberTemp").html(maxTemp);

            var cloudy = data.clouds.all + "%";

            var cloudyImg = "style/weather/cloudy" + ".svg"

            var img2 = document.createElement("img");
            img2.setAttribute("src", cloudyImg);
            img2.setAttribute("class", "cloudyImg");

            $(".cloudyImage").html(img2);
            $("#numberCloudy").html(cloudy);

            var humidity = data.main.humidity + "%";

            var humidityImg = "style/weather/humidity" + ".svg"

            var img3 = document.createElement("img");
            img3.setAttribute("src", humidityImg);
            img3.setAttribute("class", "humidityImg");

            $(".humidityImage").html(img3);
            $("#numberHumidity").html(humidity);
        },
        /*playVideo: function() {
                document.getElementById("cuteKitten").play();
        },*/

    }

})
