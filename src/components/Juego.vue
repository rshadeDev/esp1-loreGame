<template>
  <Header />
  <iframe 
    src="https://rshadedev.github.io/esp1-juego/" 
    width="100%"
    height="1155"
    frameborder="0">
    allowfullscreen
  </iframe>
</template>

<script setup>
  import Header from './Header.vue'
</script>

<style scoped>
  iframe {
    border: none;
  }
</style>
