import { createStore } from "vuex";

import authModule from "./modules/auth/index";
import userModule from "./modules/users/index";
import thoughtsModule from "./modules/thoughts/index";

const store = createStore({
  modules: {
    auth: authModule,
    thoughts: thoughtsModule,
    users: userModule,
  },
});

export default store;
