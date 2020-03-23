<template>
  <div class="app-body">
    <nuxt />
  </div>
</template>

<style>
body,
html {
  @apply bg-teal-700;
}

.app-body {
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.container {
  @apply mx-auto;
}
</style>
