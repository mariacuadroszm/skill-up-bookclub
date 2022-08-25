import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import LogInView from "../views/LogInView.vue";
import ProposedBookListExtended from "../views/ProposedBookListExtended.vue";
import ActiveClubsListExtended from "../views/ActiveClubsListExtended.vue";
import EventService from "../services/EventService";

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

router.beforeEach(async (to, from) => {
  try {
    const isUserLogged = await EventService.checkUserSesion();
    if (!isUserLogged && to.name !== "log-in" && to.name !== "sign-up") {
      return { name: "log-in" };
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
