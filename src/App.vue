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
  color: #fff;
}
html {
  font-family: Roboto, "sans-serif";
  font-weight: bold;
  color: #fff;
}
body {
  margin: 0;
  padding: 0;
  background-color: #15202b;
}
</style>
