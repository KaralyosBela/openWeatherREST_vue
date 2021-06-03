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
    loaded: false,
    cityName: "",
    errorMessage: "",
    error: false
    },
  mutations: {
    setWeatherData(state, payload){
      state.dailyWeatherData = payload.responseData.daily;
      state.currentWeatherData = payload.responseData.current;
      state.hourlyWeatherData = payload.responseData.hourly;
      state.weatherAlerts = payload.responseData.alerts;
      state.cityName = payload.cityName;
      state.loaded = true;
    },
    setEmpty(state, payload){
      state.dailyWeatherData = payload;
      state.currentWeatherData = payload;
      state.hourlyWeatherData = payload;
      state.weatherAlerts = payload;
      state.loaded = false;
      state.cityName = "";
    },
    setError(state, payload){
        state.errorMessage = payload.errorMessage;
        state.error = payload.error;
    }
  },
  actions: {
    fetchWeatherData({ commit }, payload) {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          payload.cityName +
            "+&appid=b203fc1026c241d3e13b9713a3665286&lang=hu"
        )
        .then((response) => {
          //console.log("elso axios megtortent");
          axios
            .get(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                response.data.coord.lat +
                "&lon=" +
                response.data.coord.lon +
                "&lang=hu&units=metric&appid=b203fc1026c241d3e13b9713a3665286"
            )
            .then((response) => {
              //console.log("masodik axios megtortent");
              //console.log(response.data);
              //commit("setWeatherData",response.data);
              commit("setWeatherData", {
                responseData: response.data,
                cityName: payload.cityNameOriginal
              });
              this.commit("setError", {
                error: false,
                errorMessage: ""
              });

            });
        })
        .catch(() => {
          this.commit("setEmpty","");
          this.commit("setError", {
            error: true,
            errorMessage: "Nincs ilyen hely."
          });
          //this.data = "";
        });
    },
  },
  modules: {},
  getters: {},
});
