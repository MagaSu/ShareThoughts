<template>
  <base-card>
    <div class="profile">
      <h3>{{ name }}</h3>
    </div>
    <section>
      <ul v-for="thought in userThoughts" :key="thought.id">
        <base-card>
          <thoughts-list
            :id="thought.id"
            :name="name"
            :thought="thought.thought"
            :time="thought.time"
          ></thoughts-list>
        </base-card>
      </ul>
    </section>
  </base-card>
</template>

<script>
import ThoughtsList from "../components/thoughts/ThoughtsList";
export default {
  components: {
    ThoughtsList,
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    currentUser() {
      const users = this.$store.getters["users/users"];
      return users.find((user) => user.id === this.userId);
    },
    name() {
      return this.currentUser.nickname;
    },
    userThoughts() {
      const thoughts = this.$store.getters["thoughts/thoughts"];
      return thoughts.filter((thought) => thought.id === this.userId);
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: 500;
}
</style>
