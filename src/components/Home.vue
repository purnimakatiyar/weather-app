<template>
  <div class="main">
    <img class="logo" alt="Weather logo" src="../assets/weather.png">
    <h1 class="title">Weather Information</h1>
    <form class="weather-form"@submit="getWeather">
      <input type="text" v-model="form.city" placeholder="Enter City">
      <button type="submit">Submit</button>
    </form>
  </div>
  <div v-if="!isEmpty">
    <h2>{{ resolvedAddress }}</h2>
    <h3>Today's Weather</h3>
    <p>Time: {{ weatherData?.currentConditions?.datetime }}</p>
    <p>Temperature: {{ weatherData?.currentConditions?.temp }}°F</p>
    <h3>Future Forecast</h3>
    <div class="weather-card" v-for="day in weatherData.days">
        <p>Date: {{ day.datetime }}</p>
        <p>Temperature Max:{{ day.tempmax }}</p>
        <p>Temperature Min:{{ day.tempmin }}</p>
        <p>Climate: {{ day.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
        apiKey: "9PPEYVDKG65Y5Y9MEUJMEHGXN",
        baseUrl: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
        form: {
            city: ""
        },
        weatherData: {},
        isEmpty: true,
    }
  },
  methods: {
    getWeather(e) {
        console.log("Hello");
      e.preventDefault();
      fetch(`${this.baseUrl}${this.form.city}?key=${this.apiKey}`)
        .then(res => {
          return res.json();
        }).then(this.setResults)
    },
    setResults (results) {
        this.weatherData = results;
        this.isEmpty = false;
        console.log(this.weatherData);
        console.log(this.weatherData.currentConditions.datetime);
        console.log(this.weatherData.currentConditions.temp);
    },
  }
}
</script>

<style>
.logo{
  width:12%;
}
h1{
  margin-top: 0%;
}
.weather-form input{
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.weather-form button{
  width: 320px;
  height: 40px;
  border: 1px solid #87CEEB;
  cursor: pointer;
  background: #87CEEB;
  color: #fff;
}

.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #87CEEB;
  padding: 2%;
  margin-bottom: 2%;
  margin-left: 28%;
  border-radius: 4px;
  width: 500px;
}

.weather-card p {
  margin: 0;
  flex: 1;
  text-align: center;
}
</style>
