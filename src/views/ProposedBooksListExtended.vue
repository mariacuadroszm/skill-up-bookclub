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
      class="extended bookCardExtended"
      :isReader="false"
    ></BookCard>
  </div>
</template>

<script>
import fakeBooks from "../assets/data.json";
import MainHeader from "../components/MainHeader.vue";
import BookCard from "../components/BookCard.vue";

export default {
  name: "ProposedBooksListExtended",
  components: {
    MainHeader,
    BookCard,
  },
  data() {
    return {
      booksInfo: fakeBooks,
    };
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

@media (min-width: 768px) {
  .proposed-books-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-column-gap: 2.4rem;
    grid-row-gap: 0.8rem;
    padding: 0 2.8rem;
  }

  .proposed-books-info-container {
    padding: 0 2.8rem;
  }
}
</style>
