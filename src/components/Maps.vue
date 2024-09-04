<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="mt-4">
      <input
        type="text"
        ref="searchInput"
        placeholder="Search for a city"
        class="mb-4 p-2 border rounded"
      />
      <button type="submit" class="ml-2 p-2 border rounded bg-blue-500 text-white">
        Search
      </button>
    </div>
    <div ref="mapRef" class="w-[37.5rem] h-[37.5rem]" style="border: 1px solid black;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

let mapRef = ref(null);
let searchInput = ref(null);
let markers = ref([]);
const apiKey = process.env.VUE_APP_WEATHER_API_KEY;

let states = [
  { name: 'Andhra Pradesh', lat: 15.9129, lng: 79.7400 },
  { name: 'Arunachal Pradesh', lat: 28.2180, lng: 94.7278 },
  { name: 'Assam', lat: 26.2006, lng: 92.9376 },
  { name: 'Bihar', lat: 25.0961, lng: 85.3131 },
  { name: 'Chhattisgarh', lat: 21.2787, lng: 81.8661 },
  { name: 'Goa', lat: 15.2993, lng: 74.1240 },
  { name: 'Gujarat', lat: 22.2587, lng: 71.1924 },
  { name: 'Haryana', lat: 29.0588, lng: 76.0856 },
  { name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { name: 'Jharkhand', lat: 23.6102, lng: 85.2799 },
  { name: 'Karnataka', lat: 15.3173, lng: 75.7139 },
  { name: 'Kerala', lat: 10.8505, lng: 76.2711 },
  { name: 'Madhya Pradesh', lat: 22.9734, lng: 78.6569 },
  { name: 'Maharashtra', lat: 19.7515, lng: 75.7139 },
  { name: 'Manipur', lat: 24.6637, lng: 93.9063 },
  { name: 'Meghalaya', lat: 25.4670, lng: 91.3662 },
  { name: 'Mizoram', lat: 23.1645, lng: 92.9376 },
  { name: 'Nagaland', lat: 26.1584, lng: 94.5624 },
  { name: 'Odisha', lat: 20.9517, lng: 85.0985 },
  { name: 'Punjab', lat: 31.1471, lng: 75.3412 },
  { name: 'Rajasthan', lat: 27.0238, lng: 74.2179 },
  { name: 'Sikkim', lat: 27.5330, lng: 88.5122 },
  { name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569 },
  { name: 'Telangana', lat: 18.1124, lng: 79.0193 },
  { name: 'Tripura', lat: 23.9408, lng: 91.9882 },
  { name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Uttarakhand', lat: 30.0668, lng: 79.0193 },
  { name: 'West Bengal', lat: 22.9868, lng: 87.8550 },
  { name: 'Jammu and Kashmir', lat: 33.7782, lng: 76.5762 },
];

let map;

const initMap = () => {
  if (!window.google || !window.google.maps) {
    return;
  }
    map = new window.google.maps.Map(mapRef.value, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 5,
    });

    addMarkers(states);
    initAutocomplete();
  };


const addMarkers = async (locations) => {

  markers.value.forEach(marker => {
    marker.setVisible(false);
    marker.setMap(null);
  });
  markers.value = [];

  for (const location of locations) {
    const weather = await getWeather(location.lat, location.lng);
    const iconBase = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      icon: iconBase,
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h3>${location.name}</h3>
          <p>${weather.weather[0].description}</p>
          <p>Temp: ${weather.main.temp}°C</p>
        </div>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    markers.value.push(marker);
  }
};

const getWeather = async (lat, lng) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`);
    return response.data;
  } 
  catch {
    return { main: { temp: 'N/A' }, weather: [{ description: 'N/A', icon: '' }] };
  }
};

const initAutocomplete = () => {
  const autocomplete = new google.maps.places.Autocomplete(searchInput.value);
  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    const searchLocation = {
      name: place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    addMarkers([searchLocation]);

    map.setCenter(searchLocation);
    map.setZoom(8);
  });
};

onMounted(() => {
  initMap();
});

</script>
