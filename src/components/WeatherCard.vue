<template>
  <div>
    <v-autocomplete
      :items="cities"
      item-text="name"
      label="Search a city"
      v-model="city"
      @change="getWeatherData(city)"
    ></v-autocomplete>
    <!-- <v-card class="my-4">
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
        ></v-slider>
        <p v-if="this.$store.state.loaded">{{ weatherData.temp }}</p>
      </v-card-text>
    </v-card> -->
    <v-card v-if="city">
      <v-card-title primary-title>
        {{ city }}
      </v-card-title>
      <v-card-text v-if="this.$store.state.loaded">
        <v-row align="center" justify="center">
          <v-col>
            Temperature {{ currentWeather.temp }} &deg;C <br />
            Feels like {{ currentWeather.feels_like }} &deg;C <br />
            {{ currentTime.time + " " + currentTime.day }} <br />
            {{ currentWeather.weather[0].main }} <br />
            {{ currentWeather.weather[0].description }}
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
          <v-col>
            <div v-for="(item, index) in alerts" :key="index">
              {{ item.sender_name }} <br />
              {{ item.event }} <br />
              {{ item.start }} <br />
              {{ item.end }} <br />
              {{ item.description }} <br />
            </div>
          </v-col>
        </v-row>
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
      city: "",
      data: "",
      cities: [],
      alerts: [],
      currentTime: {
        interval: null,
        time: null,
        day: null,
      },
    };
  },
  methods: {
    getWeatherData(value) {
      value = accents.remove(value);
      this.$store.dispatch("fetchWeatherData", {
        value: value,
      });
          this.alerts = this.$store.state.weatherAlerts;

    },
  },

  computed: {
    currentWeather() {
      //var x = this.pickedDay;
      return this.$store.state.currentWeatherData;
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
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
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