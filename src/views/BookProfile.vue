<template>
  <header class="header">
    <MainHeader class="mx-6"></MainHeader>
  </header>
  <main v-if="bookInfo && participants">
    <article class="book-profile mx-6">
      <CompleteBookInfo
        :book="book"
        :isReader="isReader"
        :participants="participants"
        @updateParticipants="updateParticipants"
      ></CompleteBookInfo>
      <ActiveClubMembers v-if="isReader" :id="id"></ActiveClubMembers>
    </article>
  </main>
</template>

<script>
import EventService from "../services/EventService";
import MainHeader from "../components/MainHeader.vue";
import CompleteBookInfo from "../components/CompleteBookInfo.vue";
import ActiveClubMembers from "../components/ActiveClubMembers.vue";

export default {
  name: "BookProfile",
  components: {
    MainHeader,
    CompleteBookInfo,
    ActiveClubMembers,
  },
  data() {
    return {
      bookInfo: {},
      participants: 0,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    book() {
      const titleLowerCase = this.bookInfo.book.title.toLowerCase();
      const titleCapFirstLetter =
        titleLowerCase.charAt(0).toUpperCase() + titleLowerCase.slice(1);
      const authorLowerCase = this.bookInfo.book.author.toLowerCase();

      return {
        id: this.id,
        title: titleCapFirstLetter,
        author: authorLowerCase,
        synopsis: this.bookInfo.book.synopsis,
        storeUrl: this.bookInfo.book.storeUrl,
      };
    },
    isReader() {
      if (this.bookInfo.status === "Proposed") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async updateParticipants() {
      try {
        this.participants = await EventService.getParticipantsCount(this.id);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.bookInfo = await EventService.getBookProfile(this.id);
      this.participants = await EventService.getParticipantsCount(this.id);
    } catch (error) {
      console.error(error);
    }
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
