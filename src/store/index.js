import { createStore } from "vuex";

import authModule from "./modules/auth/index";
import userModule from "./modules/users/index";
import tweetsModule from "./modules/tweets/index";

const store = createStore({
  modules: {
    auth: authModule,
    tweets: tweetsModule,
    users: userModule,
  },
});

export default store;
