export default {
  addThought(state, payload) {
    state.thoughts.unshift(payload);
  },
  loadThoughts(state, payload) {
    state.thoughts = payload;
  },
};
