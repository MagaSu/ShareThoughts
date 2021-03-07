<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #660708;
  border: 1px solid #660708;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
}

button:hover,
button:active,
a:hover,
a:active {
  background-color: #a4161a;
  border-color: #a4161a;
  outline: none;
}
.flat {
  background-color: transparent;
  color: #a4161a;
  border: none;
}
.outline {
  background-color: transparent;
  border-color: #a4161a;
  color: #a4161a;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #e5383b;
  color: #fff;
}
</style>
