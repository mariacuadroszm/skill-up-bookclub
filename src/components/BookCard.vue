<template>
  <div class="book-card px-5 py-5" @click.stop="showBookProfile()">
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
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";

export default {
  name: "BookCard",
  components: {
    "button-bc": ButtonBC,
  },
  data() {
    return {
      userVoted: false,
      title: this.book.book.title,
      author: this.book.book.author,
      participants: this.book.userCount,
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
      const firstLetter = this.title.charAt(0);
      const titleLowerCase = this.title.slice(1).toLowerCase();
      return `${firstLetter}${titleLowerCase}`;
    },
    authorCapitalize() {
      return this.author.toLowerCase();
    },
  },
  methods: {
    addVote() {
      if (this.userVoted == false) {
        this.participants = this.participants + 1;
        this.userVoted = true;
      } else {
        this.participants = this.participants - 1;
        this.userVoted = false;
      }
    },
    showBookProfile() {
      if (this.isReader) {
        return this.$router.push(`/book/active/${this.book.id}`);
      } else {
        return this.$router.push(`/book/proposed/${this.book.id}`);
      }
    },
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
  text-transform: capitalize;
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
