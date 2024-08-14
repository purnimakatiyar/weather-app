<template>
  <div class="overflow-auto" :style="addBackground"><router-view /></div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    addBackground() {
      return {
        backgroundImage: `url(${require('@/assets/background2.jpg')})`,
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the image
        height: '100%', // Make sure the background covers the full viewport height
        width: '100%', // Make sure the background covers the full width
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
</style>
