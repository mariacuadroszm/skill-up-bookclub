<template>
  <div class="proposed-books-info-container px-5">
    <MainHeader></MainHeader>
    <div class="proposed-books">
      <div class="proposed-books-info">
        <h2 class="proposed-books-info__title">All proposed books</h2>
        <span class="proposed-books-info__description text-m"
          >Find here the list with all proposed books
        </span>
      </div>

      <ButtonBC
        class="font-bold propose-btn"
        variant="tertiary"
        @click="proposeBook"
      >
        Propose a book<v-icon
          name="hi-solid-arrow-narrow-right"
          class="arrow-right-icon"
        />
      </ButtonBC>
    </div>
  </div>

  <div class="proposed-books-container">
    <div class="proposed-books-list px-5">
      <BookCard
        v-for="(book, id) in booksInfoSorted"
        :key="id"
        :book="book"
        class="extended bookCardExtended"
        :isReader="false"
      ></BookCard>
    </div>
    <span class="thatsAll text-m">That's all we got (-:</span>
  </div>
</template>

<script>
import fakeBooks from "../assets/data.json";
import MainHeader from "../components/MainHeader.vue";
import BookCard from "../components/BookCard.vue";
import ButtonBC from "../components/ui-components/ButtonComponent.vue";

export default {
  name: "ProposedBookListExtended",
  components: {
    MainHeader,
    BookCard,
    ButtonBC,
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

  methods: {
    proposeBook() {
      this.$router.push("propose-book-form");
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

.proposed-books-info__title,
.thatsAll {
  color: var(--white);
}
.proposed-books-info__description {
  display: inline-block;
  margin-top: 0.6rem;
  margin-bottom: 1.8rem;
  color: var(--white);
}
.proposed-books-container {
  background-color: var(--secondary-background-color);
}
.proposed-books-list {
  padding-bottom: 1.6rem;
}

.propose-btn,
.thatsAll {
  display: none;
}

@media (min-width: 768px) {
  .propose-btn,
  .thatsAll {
    display: block;
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
  .proposed-books-container {
    min-height: calc(100vh - 232px);
  }
  .thatsAll {
    text-align: center;
    padding-top: 14rem;
    padding-bottom: 13rem;
    background-color: var(--secondary-background-color);
  }
}
</style>
