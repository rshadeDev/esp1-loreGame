import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/Homepage.vue";
import LoreView from "../components/Lore.vue";
import JuegoView from "../components/juego/MainView.vue";
import LogicGame from "../components/juego/LogicGame.vue";
import Login from "../components/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/lore",
      name: "lore",
      component: LoreView,
    },
    {
      path: "/game",
      name: "juego",
      component: JuegoView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        if (!isAuthenticated) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/logic",
      name: "logic",
      component: LogicGame,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
