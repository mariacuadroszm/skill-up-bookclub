<template>
  <div class="proposed-books-info-container px-5">
    <MainHeader></MainHeader>
    <h2 class="proposed-books-info__title">All active clubs</h2>
    <span class="proposed-books-info__description text-m"
      >List with current active book clubs
    </span>
  </div>
  <div class="proposed-books-list px-5">
    <BookCard
      v-for="(book, id) in booksInfoSorted"
      :key="id"
      :book="book"
      class="extended"
      :isReader="true"
    ></BookCard>
  </div>
  <span class="thatsAll text-m">That's all we got (-:</span>
</template>

<script>
import activeClubs from "../assets/activeData.json";
import MainHeader from "../components/MainHeader.vue";
import BookCard from "../components/BookCard.vue";

export default {
  name: "ActiveClubsListExtended",
  components: {
    MainHeader,
    BookCard,
  },
  data() {
    return {
      booksInfo: activeClubs,
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
.thatsAll {
  color: var(--white);
  display: block;
  height: 100%;
  background-color: var(--secondary-background-color);
}

@media (min-width: 768px) {
  .thatsAll {
    display: block;
    text-align: center;
    margin-top: 6rem;
    margin-bottom: 4rem;
  }
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

  .proposed-books {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

}
</style>
