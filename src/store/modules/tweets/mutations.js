export default {
  addTweet(state, payload) {
    state.tweets.unshift(payload);
  },
  loadTweets(state, payload) {
    state.tweets = payload;
  },
};
