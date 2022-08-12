<template>
  <MainHeader
    :displayBackBtn="displayBackBtn"
    :homepage="homepage"
  ></MainHeader>
  <main>
    <section class="container proposed-books">
      <BookList
        :reader="false"
        :books="proposedBooks"
        @displayPropBookForm="proposeBookFormTrigger"
      >
        <template v-slot:title>Proposed books</template>
        <template v-slot:description
          >Vote for the books you want to read
        </template>
        <template v-slot:no-books-text>
          We don't have any proposed books yet )-:
        </template>
      </BookList>
    </section>

    <section class="container active-clubs">
      <BookList :displayProposeBtn="false" :reader="true" :books="activeBooks">
        <template v-slot:title>Active clubs</template>
        <template v-slot:description
          >Find active book clubs and their members
        </template>
        <template v-slot:no-books-text>
          We don't have any active books yet )-:
        </template>
      </BookList>
    </section>

    <PopUp v-if="displayPopUp" @popUpTrigger="popUpTrigger">
      <p class="pop-up-text text-s font-bold">
        Your book has been proposed (-:
      </p>
      <p class="pop-up-text text-s font-bold">Find it on “Proposed books”</p>
    </PopUp>

    <ModalView
      v-if="displayProposeBookForm"
      class="propose-book-form-view"
      @proposeBookFormTrigger="proposeBookFormTrigger"
    >
      <BookForm
        @proposeBookFormTrigger="proposeBookFormTrigger"
        @popUpTrigger="popUpTrigger"
      ></BookForm>
    </ModalView>
  </main>
</template>

<script>
import BookList from "@/components/BookList.vue";
import MainHeader from "../components/MainHeader.vue";
import PopUp from "../components/PopUp.vue";
import ModalView from "../components/ModalView.vue";
import BookForm from "../components/BookForm.vue";
import EventService from "../services/EventService.js";

export default {
  name: "HomeView",
  components: {
    BookList,
    MainHeader,
    PopUp,
    ModalView,
    BookForm,
  },

  props: {
    displayBookForm: {
      type: String,
      default: "false",
      validator: (propValue) => {
        return ["true", "false"].includes(propValue);
      },
    },
  },

  data() {
    return {
      displayBackBtn: false,
      displayProposeBtn: false,
      proposedBooks: [],
      activeBooks: [],
      homepage: true,
      displayPopUp: false,
      displayProposeBookForm: false,
    };
  },

  methods: {
    popUpTrigger() {
      this.displayPopUp = !this.displayPopUp;
    },
    proposeBookFormTrigger() {
      this.displayProposeBookForm = !this.displayProposeBookForm;
    },
  },

  created() {
    if (this.displayBookForm === "true") {
      this.displayProposeBookForm = true;
    }
    EventService.getProposedBooks(5)
      .then((response) => {
        this.proposedBooks = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    EventService.getActiveBooks(5)
      .then((response) => {
        this.activeBooks = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
}
.active-clubs {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}

@media (min-width: 768px) {
  .container {
    align-content: center;
    padding: 1.8rem 3.3rem;
  }
  .active-clubs {
    margin-bottom: 1.3rem;
  }
}

@media (min-width: 1500px) {
  main {
    margin: 0 auto;
  }
  .container {
    max-width: 151.5rem;
    width: 151.5rem;
  }
}
</style>
