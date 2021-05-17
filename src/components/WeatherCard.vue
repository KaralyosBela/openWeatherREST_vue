<template>
  <div>
    <v-autocomplete
      :items="cities"
      item-text="name"
      label="Search a city"
      v-model="value"
      @change="getData(value)"
    ></v-autocomplete>

    <div v-for="(item, index) in cityData" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cities from "cities.json";
import accents from "remove-accents";
export default {
  name: "WeatherCard",
  data() {
    return {
      value: "",
      data: "",
      cities: [],
      cityData: {
        weather: "",
        weatherDesc: "",
        feelsLike: "",
        temperature: "",
        humidity: "",
        clouds: "",
        windspeed: "",
        windDirection: "",
      },
    };
  },
  methods: {
    getData(value) {
      value = accents.remove(value);
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            value +
            "+&appid=b203fc1026c241d3e13b9713a3665286&lang=hu"
        )
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          var latAndLon = response.data.coord;
          this.data = response.data;
          console.log(latAndLon);
          // this.cityData.temperature = response.data.main.temp;
          // this.cityData.feelsLike = response.data.main.feels_like;
          // this.cityData.humidity = response.data.main.humidity;
          // this.cityData.windspeed = response.data.wind.speed;
          // this.cityData.windDirection = response.data.wind.deg;
          // this.cityData.weather = response.data.weather[0].main;
          // this.cityData.weatherDesc = response.data.weather[0].description;
          // this.cityData.clouds = response.data.clouds.all;
          // console.log(response.data.weather);
        })
        .then((latAndLon) => {
          axios
            .get(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                latAndLon.lat +
                "&lon=" +
                latAndLon.lon +
                "&exclude=daily&appid=b203fc1026c241d3e13b9713a3665286"
            )
            .then((response) => {
              console.log("asdA" + response);
            });
        })
        .catch((err) => {
          console.log(err);
          this.data = "";
        });
    },
  },
  created() {
    this.cities = cities.filter((x) => x.country == "HU");
  },
};
</script>

<style>
</style>