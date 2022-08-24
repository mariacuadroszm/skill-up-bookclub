<template>
  <div
    class="book-card px-5 py-5"
    @click.stop="showBookDetails"
    :class="this.$attrs.class"
  >
    <div class="book-card__info">
      <p
        data-testid="title"
        class="book-card__info--title line-clamp text-xl font-semibold"
      >
        {{ titleCapitalize }}
      </p>
      <p
        data-testid="author"
        class="book-card__info--author one-line-clamp text-l font-normal"
      >
        {{ authorCapitalize }}
      </p>
    </div>
    <div class="book-card__footer">
      <v-icon name="bi-book" scale="3" class="book-icon" />
      <div class="book-card__participants">
        <p
          data-testid="participants"
          v-if="isReader"
          class="book-card__participants--text text-s"
        >
          {{ participants }} Readers
        </p>
        <p
          data-testid="participants"
          v-else
          class="book-card__participants--text text-s"
        >
          {{ participants }} Interested
        </p>
        <button-bc
          class="font-medium vote-btn"
          variant="secondary"
          @click.stop="addVote"
          :class="{ 'user-vote': userVoted }"
          data-testid="textBtn"
        >
          {{ textBtn }}
          <span v-if="!userVoted"
            ><v-icon name="hi-solid-plus" scale="0.8" class="icon"
          /></span>
          <span v-else
            ><v-icon name="hi-solid-check" scale="0.8" class="icon"
          /></span>
        </button-bc>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <BookDetails
      v-if="displayBookDetails"
      :id="this.book.id"
      :bookInfo="bookInfo"
      @closeBookDetails="hideBookDetails"
    ></BookDetails>
  </Teleport>
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";
import EventService from "../services/EventService";
import BookDetails from "./BookDetails.vue";

export default {
  name: "BookCard",
  inheritAttrs: false,
  components: {
    "button-bc": ButtonBC,
    BookDetails,
  },
  emits: ["blockBg", "unblockBg"],
  data() {
    return {
      userVoted: false,
      title: this.book.book.title,
      author: this.book.book.author,
      participants: this.book.userCount,
      displayBookDetails: false,
      bookInfo: {},
      userId: "",
    };
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
  computed: {
    textBtn() {
      if (this.isReader && !this.userVoted) {
        return "Join";
      } else if (!this.isReader && !this.userVoted) {
        return "Vote";
      } else if (this.isReader && this.userVoted) {
        return "Joined";
      } else {
        return "Voted";
      }
    },
    titleCapitalize() {
      const trimSpaces = this.title.trim();
      const firstLetter = trimSpaces.charAt(0);
      const titleLowerCase = trimSpaces.slice(1).toLowerCase();
      return `${firstLetter}${titleLowerCase}`;
    },
    authorCapitalize() {
      const trimSpaces = this.author.trim();
      const authorName = trimSpaces.split(" ");
      const authorCapitalize = authorName
        .map((author) => {
          return author[0] + author.substring(1).toLowerCase();
        })
        .join(" ");
      return authorCapitalize;
    },
  },
  methods: {
    async addVote() {
      try {
        if (!this.userVoted && this.userId) {
          await EventService.joinClub(
            this.userId,
            this.book.id,
            this.participants
          );
          this.participants = this.participants + 1;
          this.userVoted = true;
        } else if (this.userVoted && this.userId) {
          await EventService.leaveClub(this.userId, this.book.id);
          this.participants = this.participants - 1;
          this.userVoted = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    showBookDetails() {
      this.displayBookDetails = true;
      this.$emit("blockBg");
    },
    hideBookDetails() {
      this.displayBookDetails = false;
      this.$emit("unblockBg");
    },
  },
  async created() {
    try {
      this.bookInfo = await EventService.getBookProfile(this.book.id);
      const userSesion = await EventService.checkUserSesion();
      this.userId = userSesion.id;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  width: 27rem;
  min-height: 19rem;
  background: var(--white);
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.book-card__info--title {
  margin-bottom: 0.4rem;
}

.book-card__info--author {
  color: var(--quaternary-color);
}

.book-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}

.book-icon {
  align-self: flex-end;
}

.book-card__participants--text {
  margin-bottom: 0.5rem;
  text-align: center;
}

/* Class with the extended width of each book card */
.extended {
  width: 100%;
  margin: 0 0 1.6rem 0;
}

.user-vote {
  border: none;
  background: var(--accent-color);
  color: var(--white);
}

@media (min-width: 768px) {
  .book-card {
    padding: 2.4rem;
  }

  .vote-btn {
    width: 10.8rem;
    padding-inline: 1.8rem;
  }
}
</style>
