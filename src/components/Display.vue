<template>
  <div>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col>
          Temperature {{ currentWeather.temp }} &deg;C <br />
          Feels like {{ currentWeather.feels_like }} &deg;C <br />
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
  </div>
</template>

<script>
export default {
  name: "weatherDisplay",
  data() {
    return {
      alerts: [],
    };
  },
  computed: {
    currentWeather() {
      //var x = this.pickedDay;
      return this.$store.state.currentWeatherData;
    },
  },
};
</script>

<style>
</style>