<template>
  <base-dialog :show="!!error" title="An occured error!" @close="handleError">
    {{ error }}
  </base-dialog>
  <base-card>
    <search-field></search-field>
  </base-card>
  <base-card>
    <header>
      <h3>Home</h3>
    </header>
    <div class="profile">
      <img src="../images/profile.jpg" alt="profile" />
      <h3>{{ name }}</h3>
    </div>
    <div>
      <tweet-form @load="loadTweets"></tweet-form>
    </div>
    <section>
      <ul v-for="tweet in userTweets" :key="tweet.id">
        <base-card>
          <tweets-list
            :id="tweet.id"
            :name="name"
            :tweet="tweet.tweet"
            :time="tweet.time"
          ></tweets-list>
        </base-card>
      </ul>
    </section>
  </base-card>
</template>

<script>
import TweetForm from "../components/tweets/TweetForm";
import TweetsList from "../components/tweets/TweetsList";
import SearchField from "../components/layout/SearchField";
export default {
  components: {
    TweetForm,
    TweetsList,
    SearchField,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    userTweets() {
      return this.$store.getters["tweets/userTweets"];
    },
    userId() {
      return this.$store.getters["userId"];
    },
    name() {
      return this.$store.getters["name"];
    },
  },
  created() {
    this.loadTweets();
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

    async loadTweets() {
      if (!this.userId) {
        this.$router.replace("/auth");
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch("tweets/fetchTweets");
      } catch (err) {
        this.error = err.message || "Failed to load tweets.";
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
.page-name {
  border-bottom: solid 1px #38444d;
  height: 50px;
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
