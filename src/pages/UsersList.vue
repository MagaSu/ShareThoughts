<template>
  <ul v-for="user in users" :key="user.id">
    <base-card>
      <h3 class="name">
        <router-link :to="`${userPage}${user.id}`">
          {{ user.firstName + " " + user.lastName }}
        </router-link>
      </h3>
      <div class="info">
        <p>
          Tweets:
          <span>{{ tweetsCount(user.id) }}</span>
          <span></span>
        </p>
      </div>
    </base-card>
  </ul>
</template>

<script>
export default {
  created() {},
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
    tweets() {
      return this.$store.getters["tweets/tweets"];
    },
    userPage() {
      return "/user/";
    },
  },
  methods: {
    tweetsCount(id) {
      return this.tweets.filter((tweet) => tweet.id === id).length;
    },
    async loadUsers() {
      try {
        await this.$store.dispatch("user/users");
      } catch (err) {
        this.error = err.message || "Failed to load users.";
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  color: rgb(85, 137, 158);
}

.name {
  margin-bottom: 1rem;
  font-weight: 500;
}
.info {
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 200;
}
</style>
