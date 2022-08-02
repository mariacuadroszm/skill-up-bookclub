<template>
  <header class="header">
    <MainHeader class="mx-6"></MainHeader>
  </header>
  <main>
    <article class="book-profile mx-6">
      <CompleteBookInfo :book="book" :isReader="isReader"></CompleteBookInfo>
    </article>
  </main>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import CompleteBookInfo from "../components/CompleteBookInfo.vue";

export default {
  name: "BookProfile",
  components: {
    MainHeader,
    CompleteBookInfo,
  },
  data() {
    return {};
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
    isReader: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-image: linear-gradient(to right bottom, #45328c, #4e3b9c);
}

main {
  margin: 0 auto;
}
.book-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  min-height: 64.5rem;
  margin-top: 0.4rem;
  margin-bottom: 2rem;
  padding: 3rem;
  background: var(--white);
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
