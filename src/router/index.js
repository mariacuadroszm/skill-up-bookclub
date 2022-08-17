import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignInView from "../views/SignInView.vue";
import ProposedBookListExtended from "../views/ProposedBookListExtended.vue";
import BookProfile from "../views/BookProfile.vue";
import ActiveClubsListExtended from "../views/ActiveClubsListExtended.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
      path: "/book/proposed/:id",
      name: "ProposedBookProfile",
      component: BookProfile,
      props: true,
    },
    {
      path: "/book/active/:id",
      name: "ActiveBookProfile",
      component: BookProfile,
      props: true,
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignInView,
      props: true,
    },
  ],
});

export default router;
