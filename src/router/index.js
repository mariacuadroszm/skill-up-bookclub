import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import LogInView from "../views/LogInView.vue";
import ProposedBookListExtended from "../views/ProposedBookListExtended.vue";
import ActiveClubsListExtended from "../views/ActiveClubsListExtended.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      props: true,
    },
    {
      path: "/proposed-book-list",
      name: "ProposedBookListExtended",
      component: ProposedBookListExtended,
    },
    {
      path: "/active-clubs-list",
      name: "ActiveClubsListExtended",
      component: ActiveClubsListExtended,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpView,
      props: true,
    },
    {
      path: "/",
      name: "log-in",
      component: LogInView,
      props: true,
    },
  ],
});

export default router;
