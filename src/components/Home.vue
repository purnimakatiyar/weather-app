<template>
  <div class="flex justify-center items-center flex-col sns mt-8">
    <div class="flex justify-center items-center">
      <img class="size-20" alt="Weather logo" src="../assets/weather.png">
    </div>
    <h1 class="text-xl font-bold">Weather Information</h1>
    <form class="weather-form" @submit="getWeather">
      <input type="text" v-model="form.city" placeholder="Enter City">
      <button type="submit" :disabled="isLoading">
        <div v-if="isLoading" class="loader"></div>
        Submit
      </button>
    </form>
  </div>
  <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
    {{ errorMessage }}
  </div>
  <div v-if="!isEmpty" class="m-6">
    <p class="font-bold text-xl">{{ weatherData.resolvedAddress }}</p>
    <p class="font-bold text-lg mt-7">Today's Weather</p>
    <p>Time: {{ weatherData?.currentConditions?.datetime }}</p>
    <p>Temperature: {{ weatherData?.currentConditions?.temp }}°F</p>
    <p class="font-bold text-lg mt-8">Future Forecast</p>
  </div>
  <div v-if="!isEmpty" class="flex justify-center flex-wrap gap-4">
    <div
      v-for="day in weatherData.days"
      class="w-96 flex flex-col items-center border border-blue-300 rounded-lg p-4"
    >
      <img :src="getWeatherIcon(day.icon)" alt="Weather Icon" class="w-16 h-16 mt-2" />
      <p>Date: {{ day.datetime }}</p>
      <p>Temperature Max: {{ day.tempmax }}</p>
      <p>Temperature Min: {{ day.tempmin }}</p>
      <p>Climate: {{ day.description }}</p>
      <button
        @click="getMoreDetails"
        class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 
        focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
      >
        More Details
      </button>
      <div>
        <Modal :isVisible="showModal" @close="showModal = false">
          <p>Modal Content</p>
          <p>Humidity: {{ day.humidity }}</p>
          <p>WindSpeed: {{ day.windspeed }}</p>
          <p>Visibility: {{ day.visibility }}</p>
          <p>Sunrise: {{ day.sunrise }}</p>
          <p>Sunset: {{ day.sunset }}</p>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';


const apiKey = "9PPEYVDKG65Y5Y9MEUJMEHGXN";
const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const form = ref({ city: "" });
const weatherData = ref({});
const isEmpty = ref(true);
const isLoading = ref(false);
const errorMessage = ref("");
const showModal = ref(false);


const getWeather = async (e) => {
  e.preventDefault();
  errorMessage.value = '';
  isLoading.value = true;
  try {
    const res = await fetch(`${baseUrl}${form.value.city}?key=${apiKey}`);
    const data = await res.json();
    setResults(data);
  } catch (e) {
    isLoading.value = false;
    isEmpty.value = true;
    errorMessage.value = "Failed to fetch weather data. Please try again.";
  }
};

const setResults = (results) => {
  isLoading.value = false;
  weatherData.value = results;
  isEmpty.value = false;
};

const getWeatherIcon = (icon) => {
  const icons = {
    'rain': require('../assets/rain.jpg'),
    'partly-cloudy-day': require('../assets/partly.png'),
    'fog': require('../assets/fog.png'),
    'snow': require('../assets/snow.jpg'),
    'wind': require('../assets/wind.jpg'),
    'partly-cloudy-night': require('../assets/partly.png'),
    'cloudy': require('../assets/cloudy.png'),
    'clear-day': require('../assets/sunny.png'),
    'clear-night': require('../assets/sunny.png'),
  };
  return icons[icon];
};

const getMoreDetails = () => {
  showModal.value = true;
};
</script>

<style>
.weather-form input {
  width: 100%;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #87CEEB;
}

.weather-form button {
  width: 320px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
}

.weather-card {
  justify-content: space-between;
  border: 1px solid #87CEEB;
  padding: 2%;
  margin-bottom: 2%;
  margin-left: 35%;
  border-radius: 4px;
}

.weather-card p {
  margin: 0;
  flex: 1;
  text-align: center;
}

.loader {
  width: 50px;
  padding: 8px;
  margin-top: 40%;
  margin-left: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #87CEEB;
  --_m:
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
  to { transform: rotate(1turn); }
}

@media only screen and (max-width: 768px) {
  .weather-card {
    margin-left: 0%;
  }
}
</style>
