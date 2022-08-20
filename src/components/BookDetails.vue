<template>
  <div class="pop-up-container">
    <MainHeader
      class="main-header"
      :homepage="true"
      @bookDetailsTrigger="closePopUp"
    ></MainHeader>
    <article class="pop-up-inner">
      <div class="close-btn-container">
        <ButtonBC class="close__btn" variant="close" @click="closePopUp">
          <v-icon name="bi-x-lg" scale="2" fill="black" />
        </ButtonBC>
      </div>
      <div class="book-profile">
        <CompleteBookInfo
          :book="book"
          :isReader="isReader"
          :participants="participants"
          @updateParticipants="updateParticipants"
        ></CompleteBookInfo>
        <ActiveClubMembers v-if="isReader" :id="id"></ActiveClubMembers>
      </div>
    </article>
  </div>
</template>

<script>
import EventService from "../services/EventService";
import ButtonBC from "./ui-components/ButtonComponent.vue";
import MainHeader from "./MainHeader.vue";
import CompleteBookInfo from "../components/CompleteBookInfo.vue";
import ActiveClubMembers from "../components/ActiveClubMembers.vue";

export default {
  name: "BookDetails",
  components: {
    ButtonBC,
    MainHeader,
    CompleteBookInfo,
    ActiveClubMembers,
  },
  emits: ["bookDetailsTrigger"],
  data() {
    return {
      participants: 0,
      togglePopUp: this.displayBookProfile,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    bookInfo: {
      type: Object,
      required: true,
    },
    displayBookProfile: {
      type: Boolean,
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
    closePopUp() {
      this.$emit("bookDetailsTrigger");
    },
  },
  async created() {
    console.log(this.togglePopUp);
    try {
      this.participants = await EventService.getParticipantsCount(this.id);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.pop-up-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  min-height: 100vh;
  padding: 0 1.6rem 3rem;
  background-color: var(--secondary-background-color);
}
.pop-up-inner {
  width: 100%;
  background-color: var(--white);
  border-radius: 0.8rem;
  text-align: center;
}

.main-header {
  width: 100%;
}

.close__btn {
  display: none;
}

.book-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
  min-height: 64.5rem;
  padding: 3rem;
}

.close-pop-up {
  display: none;
}

.block-bg {
  overflow: hidden;
}

@media (min-width: 768px) {
  .pop-up-container {
    bottom: 0;
    padding: 0;
    background-color: var(--opacity-background-color);
  }
  .main-header {
    display: none;
  }
  .pop-up-inner {
    width: 60rem;
    height: 80rem;
    padding: 0;
    overflow-y: scroll;
  }

  .close-btn-container {
    display: flex;
    flex-direction: row-reverse;
  }

  .close__btn {
    display: block;
  }
}
</style>
