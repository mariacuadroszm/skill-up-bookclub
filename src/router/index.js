import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProposeBookForm from "../views/ProposeBookForm.vue";
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
    },
    {
      path: "/propose-book-form",
      name: "proposeBookForm",
      component: ProposeBookForm,
    },
    {
      path: "/proposed-books-list",
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
  ],
});

export default router;
