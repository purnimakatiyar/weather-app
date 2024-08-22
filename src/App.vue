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

        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100%', 
        width: '100%', 
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
  height: 100%;
}
</style>
