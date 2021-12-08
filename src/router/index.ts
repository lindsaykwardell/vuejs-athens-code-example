import { createRouter, createWebHashHistory } from "vue-router";

import App from "../App.vue";

export default createRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: App,
    },
    {
      path: "/active",
      name: "active",
      component: App,
    },
    {
      path: "/completed",
      name: "completed",
      component: App,
    },
  ],
  history: createWebHashHistory(),
});
