import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProposeBookForm from "../views/ProposeBookForm.vue";
import ProposedBookListExtended from "../views/ProposedBookListExtended.vue";
import BookProfile from "../views/BookProfile.vue";
import ActiveClubsListExtended from "../views/ActiveClubsListExtended.vue";
import fakeBooks from "../assets/data.json";
import activeBooks from "../assets/activeData.json";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/propose-book-form",
      name: "proposeBookForm",
      component: ProposeBookForm,
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
      props: (route) => ({
        book: fakeBooks[route.params.id - 1],
        isReader: false,
      }),
    },
    {
      path: "/book/active/:id",
      name: "ActiveBookProfile",
      component: BookProfile,
      props: (route) => ({
        book: activeBooks[route.params.id - 1],
        isReader: true,
      }),
    },
  ],
});

export default router;
