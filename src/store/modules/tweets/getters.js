export default {
  tweets(state) {
    return state.tweets;
  },
  userTweets(_, getters, _2, rootGetters) {
    const tweets = getters.tweets;
    const userId = rootGetters.userId;
    const userTweets = tweets.filter((tweet) => tweet.id === userId);
    return userTweets;
  },

};
