export default {
  async addThought(context, payload) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://share-thoughts-10a74-default-rtdb.firebaseio.com/thoughts.json`,
      {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          thought: payload.thought,
          time: payload.time,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }

    context.commit("addThought", {
      thought: payload.thought,
      time: payload.time,
    });
  },
  async fetchThoughts(context) {
    // const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://share-thoughts-10a74-default-rtdb.firebaseio.com/thoughts.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }

    const thoughts = [];

    for (const key in responseData) {
      const thought = {
        id: responseData[key].id,
        thought: responseData[key].thought,
        time: responseData[key].time,
      };
      thoughts.push(thought);
    }
    context.commit("loadThoughts", thoughts);
  },
};
