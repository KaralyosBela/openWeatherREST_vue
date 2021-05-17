<template>
  <div>
    <v-autocomplete
      :items="cities"
      item-text="name"
      label="Search a city"
      v-model="value"
      @change="getWeatherData(value)"
    ></v-autocomplete>
    <v-btn color="success" class="mx-2">Current</v-btn>
    <v-btn color="success" class="mx-2">Hourly</v-btn>
    <v-btn color="success" class="mx-2">Weekly</v-btn>
    <v-card class="my-4">
      <v-card-title primary-title> </v-card-title>
      <v-card-subtitle> Weather </v-card-subtitle>
      <v-card-text>
        <v-slider
          v-model="pickedDay"
          max="6"
          :tick-labels="nextSevenDays"
          class="mx-4"
          ticks
          track-fill-color="blue"
          @change="show()"
        ></v-slider>
        {{ weatherData }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import cities from "cities.json";
import accents from "remove-accents";
export default {
  name: "WeatherCard",
  data() {
    return {
      pickedDay: "0",
      value: "",
      data: "",
      cities: [],
    };
  },
  methods: {
    getWeatherData(value) {
      value = accents.remove(value);
      this.$store.dispatch("fetchWeatherData", {
        value: value,
      });
    },
    show() {
      console.log(this.pickedDay);
      // console.log(this.$store.state.dailyWeatherData);
      // console.log(this.$store.state.currentWeatherData);
      // console.log(this.$store.state.hourlyWeatherData);
      // console.log(this.$store.state.weatherAlerts);
    },
  },

  computed: {
    weatherData() {
      return this.$store.state.dailyWeatherData;
    },
    nextSevenDays() {
      var days = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + i);
        days.push(d.toISOString().slice(5, 10));
      }
      return days;
    },
  },
  created() {
    this.cities = cities.filter((x) => x.country == "HU");
      this.$store.dispatch("fetchWeatherData", {
        value: "Budapest",
      });
  },
};
</script>

<style>
</style>