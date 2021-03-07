export default {
  thoughts(state) {
    return state.thoughts;
  },
  userThoughts(_, getters, _2, rootGetters) {
    const thoughts = getters.thoughts;
    const userId = rootGetters.userId;
    const userThoughts = thoughts.filter((thought) => thought.id === userId);
    return userThoughts;
  },
};
