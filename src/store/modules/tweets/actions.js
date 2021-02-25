export default {
  async addTweet(context, payload) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://twitter-clone-e8a3c-default-rtdb.firebaseio.com/tweets.json`,
      {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          tweet: payload.tweet,
          time: payload.time,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }

    context.commit("addTweet", {
      tweet: payload.tweet,
      time: payload.time,
    });
  },
  async fetchTweets(context) {
    // const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://twitter-clone-e8a3c-default-rtdb.firebaseio.com/tweets.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }

    const tweets = [];

    for (const key in responseData) {
      const tweet = {
        id: responseData[key].id,
        tweet: responseData[key].tweet,
        time: responseData[key].time,
      };
      tweets.push(tweet);
    }
    context.commit("loadTweets", tweets);
  },
};
