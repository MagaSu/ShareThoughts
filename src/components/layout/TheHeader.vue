<template>
  <header>
    <nav>
      <h1>
        <router-link to="/user">Twitter Clone</router-link>
      </h1>
      <ul>
        <li v-if="userId">
          <router-link to="/user">Home</router-link>
        </li>
        <li v-if="userId">
          <router-link to="/user/users-list">Users</router-link>
        </li>
        <li>
          <base-button
            link
            to="/auth"
            v-if="userId"
            mode="flat"
            @click="logout"
          >
            Logout
          </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    auth() {
      return this.userId ? "Logout" : "Login";
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
h1,
a {
  margin: 0;
  color: #fff;
}
header {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fff;
}
header a {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:hover,
a:active {
  color: #1da1f2;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
}
</style>
