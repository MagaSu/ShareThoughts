export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
  },
};