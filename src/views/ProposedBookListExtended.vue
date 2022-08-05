<template>
  <div class="proposed-books-info-container px-5">
    <MainHeader></MainHeader>
    <h2 class="proposed-books-info__title">All proposed books</h2>
    <span class="proposed-books-info__description text-m"
      >Find here the list with all proposed books
    </span>
  </div>
  <div class="proposed-books-list px-5">
    <BookCard
      v-for="(book, id) in booksInfoSorted"
      :key="id"
      :book="book"
      class="extended"
      :isReader="false"
    ></BookCard>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import BookCard from "../components/BookCard.vue";
import EventService from "../services/EventService.js";

export default {
  name: "ProposedBookListExtended",
  components: {
    MainHeader,
    BookCard,
  },
  data() {
    return {
      booksInfo: [],
    };
  },
  created() {
    EventService.getProposedBooks(50)
      .then((response) => {
        this.booksInfo = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    booksInfoSorted() {
      const booksCopy = [...this.booksInfo];
      return booksCopy.sort(function (a, b) {
        return b.participants - a.participants;
      });
    },
  },
};
</script>

<style scoped>
.proposed-books-info-container {
  height: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--secondary-background-color);
}

.proposed-books-info__title {
  color: var(--white);
}
.proposed-books-info__description {
  display: inline-block;
  margin-top: 0.6rem;
  margin-bottom: 1.8rem;
  color: var(--white);
}
.proposed-books-list {
  padding-bottom: 1.6rem;
  background-color: var(--secondary-background-color);
}
</style>
