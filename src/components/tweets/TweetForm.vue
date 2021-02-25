<template>
  <base-dialog :show="!!error" title="An occured error!" @close="handleError">{{
    error
  }}</base-dialog>
  <form @submit.prevent="submitTweet">
    <div class="form-control">
      <textarea
        id="tweetInput"
        cols="30"
        placeholder="What's happening?"
        v-model.trim="tweet"
      ></textarea>
      <p v-if="!inputIsValid">The field is empty, enter a couple of words!</p>
    </div>
    <base-button>Tweet</base-button>
    <base-button type="button" @click="load">Refresh</base-button>
  </form>
</template>

<script>
export default {
  emits: ["load"],
  data() {
    return {
      tweet: "",
      error: null,
      inputIsValid: true,
    };
  },
  computed: {
    name() {
      return this.$store.getters["name"];
    },
  },
  methods: {
    load() {
      this.$emit("load");
    },
    async submitTweet() {
      this.inputIsValid = true;
      if (this.tweet === "") {
        this.inputIsValid = false;
        return;
      }
      const time =
        `${new Date().getHours()}`.padStart(2, 0) +
        ":" +
        `${new Date().getMinutes()}`.padStart(2, 0);

      try {
        await this.$store.dispatch("tweets/addTweet", {
          tweet: this.tweet,
          time: time,
        });
      } catch (err) {
        this.error = err.message || "Failed to tweet.";
      }
      this.tweet = "";
      this.load();
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 100%;
  max-width: 600px;
}
textarea {
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 18px;
  background-color: #15202b;
  border: none;
  border-bottom: 1px solid #1696e6;
  outline: none;
  padding: 0.5rem;
  margin-bottom: 10px;
}
</style>
