<template>
  <div>
    <v-autocomplete
      :items="cities"
      item-text="name"
      label="Search a city"
      v-model="city"
      @change="getWeatherData(city)"
      @keyup.enter="getWeatherData(city)"
    ></v-autocomplete>
    <v-alert v-if="this.$store.state.error" type="error">
      {{ errorMessage }}
    </v-alert>

    <v-row align="center" justify="space-around" class="pb-2">
      <v-col><v-btn block rounded color="primary">Hourly</v-btn></v-col>
      <v-col><v-btn block rounded color="primary">Daily</v-btn></v-col>
      <v-col><v-btn block rounded color="primary">Weekly</v-btn></v-col>
    </v-row>

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
          @change="changePickedDay()"
        ></v-slider>
      </v-card-text>
    </v-card>
    <v-card v-if="this.$store.state.loaded">
      <v-card-title primary-title>
        {{ cityName }}
        <v-img
          id="img"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="50"
          max-width="50"
          :src="weatherIcon"
        >
        </v-img>
      </v-card-title>
      
        <displayy/>  

      <v-card-text>
        <v-row align="center" justify="center">
          <v-col>
            Temperature {{ currentWeather.temp }} &deg;C <br />
            Feels like {{ currentWeather.feels_like }} &deg;C <br />
            {{ currentTime.time + " " + currentTime.day }} <br />
            {{ currentWeather.weather[0].main }} <br />
            {{ currentWeather.weather[0].description }}
            {{ currentWeather.weather[0].icon }}
          </v-col>
          <v-col>
            Daytime {{ currentWeather.dt }} <br />
            Sunrise {{ currentWeather.sunrise }} <br />
            Sunset {{ currentWeather.sunset }} <br />
          </v-col>
          <v-col>
            Humidity {{ currentWeather.humidity }} <br />
            Pressure {{ currentWeather.pressure }} <br />
            Windspeed {{ currentWeather.wind_speed }} <br />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            class="mx-auto"
            v-for="(item, index) in alerts"
            :key="index"
          >
            <v-alert type="warning">
              {{ item.sender_name }} <br />
              {{ item.event }} <br />
              {{ item.start }} <br />
              {{ item.end }} <br />
              {{ item.description }} <br />
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import cities from "cities.json";
import accents from "remove-accents";
import Displayy from '../components/Display.vue'
export default {
  name: "WeatherCard",
  components: {Displayy},
  data() {
    return {
      pickedDay: "0",
      city: "",
      data: "",
      cities: [],
      alerts: [],
      weatherIcon: "",
      currentTime: {
        interval: "",
        time: "",
        day: "",
      },
    };
  },
  methods: {
    getWeatherData(cityName) {
      if (cityName != null) {
        console.log(cityName);
        var cityNameOriginal = cityName;
        cityName = accents.remove(cityName);
        this.$store.dispatch("fetchWeatherData", {
          cityName: cityName,
          cityNameOriginal: cityNameOriginal,
        });

        setTimeout(() => {
          //kellett mert az első város kiválasztásánál még nem töltötte be a jsont a vuexbe
          console.log(this.currentWeather);
          this.alerts = this.$store.state.weatherAlerts;
          this.weatherIcon =
            "http://openweathermap.org/img/wn/" +
            this.currentWeather.weather[0].icon +
            ".png";
        }, 500);
      }
    },
    // changePickedDay(){

    // }
  },

  computed: {
    currentWeather() {
      //var x = this.pickedDay;
      return this.$store.state.currentWeatherData;
    },
    cityName() {
      return this.$store.state.cityName;
    },
    errorMessage() {
      return this.$store.state.errorMessage;
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
    //Magyar városok kiválasztása
    this.cities = cities.filter((x) => x.country == "HU");

    // this.$store.dispatch("fetchWeatherData", {
    //   value: "Budapest",
    // });

    //aktualis nap beállítása
    var weekDays = [
      "Hétfő",
      "Kedd",
      "Szerda",
      "Csütörtök",
      "Péntek",
      "Szombat",
      "Vasárnap",
    ];
    var day = new Date().getDay();
    this.currentTime.day = weekDays[day - 1];

    this.currentTime.interval = setInterval(() => {
      this.currentTime.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
  },
};
</script>

<style>
</style>