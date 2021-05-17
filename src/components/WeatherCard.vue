<template>
  <div>
    <v-autocomplete
      :items="cities"
      item-text="name"
      label="Search a city"
      v-model="value"
      @change="getData(value)"
    ></v-autocomplete>
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
          axios
            .get(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                response.data.coord.lat +
                "&lon=" +
                response.data.coord.lon +
                "&units=metric&appid=b203fc1026c241d3e13b9713a3665286"
            )
            .then((response) => {
              console.log(response.data);
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