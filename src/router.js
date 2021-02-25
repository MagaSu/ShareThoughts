import { createRouter, createWebHistory } from "vue-router";

import AuthPage from "./pages/AuthPage.vue";
import MainPage from "./pages/MainPage.vue";
const UsersList = () => import("./pages/UsersList.vue");
const UserPage = () => import("./pages/UserPage.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth" },
    { path: "/auth", name: "auth", component: AuthPage },
    { path: "/user", name: "user", component: MainPage },
    { path: "/user/:id", name: "visited-user", component: UserPage },
    { path: "/user/users-list", name: "users-list", component: UsersList },
  ],
});

export default router;
