<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

p,
h3 {
  color: #f5f3f4;
  font-weight: 400;
}
html {
  font-family: Roboto, "sans-serif";
  font-weight: bold;
  color: #f5f3f4;
  font-weight: 400;
}
body {
  margin: 0;
  padding: 0;
  background-color: #0b090a;
}
</style>
