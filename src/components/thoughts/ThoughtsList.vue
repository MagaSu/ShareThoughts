<template>
  <header>
    <h4 class="authorName">{{ name }}</h4>
    <p class="postTime">{{ time }}</p>
  </header>
  <div class="contentSection">
    <p>{{ thought }}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "thought", "time"],
};
</script>

<style scoped>
header {
  padding: 0.5rem;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.authorName {
  font-weight: 300;
}
.postTime {
  font-weight: 100;
}
.contentSection {
  padding: 0.5rem;
  font-weight: 500;
}
</style>
