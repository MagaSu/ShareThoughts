<template>
  <base-dialog :show="!!error" title="An occured error!" @close="handleError">
    {{ error }}
  </base-dialog>
  <search-field></search-field>
  <base-card>
    <div class="profile">
      <img src="../images/profile.jpg" alt="profile" />
      <!--Dummy profile photo just for aesthetics.-->
      <h3>{{ name }}</h3>
    </div>
    <div>
      <input-form @load="loadThoughts"></input-form>
    </div>
    <section>
      <base-spinner v-if="isLoading"></base-spinner>
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
import InputForm from "../components/thoughts/InputForm";
import ThoughtsList from "../components/thoughts/ThoughtsList";
import SearchField from "../components/layout/SearchField";
export default {
  components: {
    InputForm,
    ThoughtsList,
    SearchField,
  },

  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    userThoughts() {
      return this.$store.getters["thoughts/userThoughts"];
    },
    userId() {
      return this.$store.getters["userId"];
    },
    name() {
      return this.$store.getters["name"];
    },
  },
  created() {
    this.loadThoughts();
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        await this.$store.dispatch("users/users");
      } catch (err) {
        this.error = err.message || "Failed to load users.";
      }
    },

    async loadThoughts() {
      if (!this.userId) {
        this.$router.replace("/auth");
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch("thoughts/fetchThoughts");
      } catch (err) {
        this.error = err.message || "Failed to load thoughts.";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}
.profile {
  display: flex;
  margin: 15px;
}
h3 {
  font-weight: 500;
}
img {
  width: 100%;
  max-width: 50px;
  border-radius: 100%;
  margin-right: 20px;
}
ul {
  list-style: none;
}
</style>
