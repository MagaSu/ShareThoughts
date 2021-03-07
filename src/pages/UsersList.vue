<template>
  <base-dialog :show="!!error" title="An occured error!" @close="handleError">
    {{ error }}
  </base-dialog>
  <base-spinner v-if="isLoading"></base-spinner>
  <ul v-for="user in users" :key="user.id">
    <base-card>
      <h3 class="name">
        <router-link :to="`${userPage}${user.id}`">
          {{ user.nickname }}
        </router-link>
      </h3>
      <div class="info">
        <p>
          Thoughts:
          <span>{{ thoughtsCount(user.id) }}</span>
        </p>
      </div>
    </base-card>
  </ul>
</template>

<script>
export default {
  created() {
    this.loadUsers();
    this.loadThoughts();
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
    thoughts() {
      return this.$store.getters["thoughts/thoughts"];
    },
    userPage() {
      return "/user/";
    },
  },
  methods: {
    thoughtsCount(id) {
      return this.thoughts.filter((thought) => thought.id === id).length;
    },
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("users/users");
      } catch (err) {
        this.error = err.message || "Failed to load users.";
      }
      this.isLoading = false;
    },
    async loadThoughts() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("thoughts/fetchThoughts");
      } catch (err) {
        this.error = err.message || "Failed to load thoughts.";
      }
      this.isLoading = false;
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
