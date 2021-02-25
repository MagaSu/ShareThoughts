<template>
  <base-card>
    <div class="profile">
      <h3>{{ name }}</h3>
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
      <base-button @click="getTweet">Get Tweets</base-button>
    </section>
  </base-card>
</template>

<script>
import TweetsList from "../components/tweets/TweetsList";
export default {
  components: {
    TweetsList,
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
      return this.currentUser.firstName + " " + this.currentUser.lastName;
    },
    userTweets() {
      const tweets = this.$store.getters["tweets/tweets"];
      return tweets.filter((tweet) => tweet.id === this.userId);
    },
  },
  methods: {
    getTweet() {
      console.log(this.userTweets);
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: 500;
}
</style>
