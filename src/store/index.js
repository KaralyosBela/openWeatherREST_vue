import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeatherData: [],
    dailyWeatherData: [],
    hourlyWeatherData: [],
    weatherAlerts: [],
  },
  mutations: {
    setWeatherData(state, payload){
      state.dailyWeatherData = payload.daily;
      state.currentWeatherData = payload.current;
      state.hourlyWeatherData = payload.hourly;
      state.weatherAlerts = payload.alerts;
    }
  },
  actions: {
    fetchWeatherData({ commit }, payload) {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          payload.value +
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
              commit("setWeatherData",response.data);
            });
        })
        .catch((err) => {
          console.log(err);
          this.data = "";
        });
    },
  },
  modules: {},
  getters: {},
});
