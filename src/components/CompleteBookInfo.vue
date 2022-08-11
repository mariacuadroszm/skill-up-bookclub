<template>
  <v-icon name="bi-book" scale="3" class="book-icon" />
  <h2 class="book-profile__title">{{ book.title }}</h2>
  <p class="book-profile__author text-l font-medium">{{ book.author }}</p>
  <button-bc
    class="buy-btn"
    variant="secondary"
    :class="[isReader ? 'buy-btn--margin-readers' : 'buy-btn--margin-synopsis']"
  >
    <a
      :href="bookUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="font-bold buy-btn__url"
    >
      Where to buy?
    </a>
  </button-bc>
  <div class="book-profile__participants--reader" v-if="isReader">
    <p class="text-s">{{ participants }} Readers</p>
  </div>
  <div
    class="book-synopsis"
    :class="[
      !isReader
        ? 'book-synopsis--margin-interested'
        : 'book-synopsis--margin-vote-btn',
    ]"
  >
    <p class="book-synopsis__title text-xl font-semibold">Synopsis</p>
    <p class="book-synopsis__info text-m">{{ book.synopsis }}</p>
  </div>
  <div class="book-profile__participants--interested" v-if="!isReader">
    <p class="text-s">{{ participants }} Interested</p>
  </div>
  <button-bc
    class="vote-btn font-medium"
    variant="secondary"
    @click="addVote"
    :class="{ 'user-vote': userVoted }"
  >
    {{ textBtn }}
    <span v-if="!userVoted"
      ><v-icon name="hi-solid-plus" scale="0.8" class="icon"
    /></span>
    <span v-else
      ><v-icon name="hi-solid-check" scale="0.8" class="icon"
    /></span>
  </button-bc>
  <p class="book-profile__info text-s font-normal">{{ voteMessage }}</p>
</template>

<script>
import ButtonBC from "../components/ui-components/ButtonComponent.vue";
import EventService from "../services/EventService";

export default {
  name: "CompleteBookInfo",
  components: {
    "button-bc": ButtonBC,
  },
  emits: ["updateParticipants"],
  data() {
    return {
      userVoted: true,
      bookUrl: this.book.storeUrl,
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
    participants: {
      type: Number,
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
    voteMessage() {
      if (this.isReader && !this.userVoted) {
        return `Tap "join" to be part of this awesome club.`;
      } else if (this.isReader && this.userVoted) {
        return `Now you're part of this club!`;
      } else if (!this.isReader && !this.userVoted) {
        return `Tap the "vote" button to be part of our club once it has five or more interested readers`;
      } else {
        return `Now you're part of this club! Once it starts you'll find this book profile on "active clubs"`;
      }
    },
  },
  methods: {
    async addVote() {
      try {
        if (!this.userVoted) {
          await EventService.joinClub("Mar123", this.book.id);
          this.userVoted = true;
        } else if (this.userVoted) {
          await EventService.unjoinClub("Mar123", this.book.id);
          this.userVoted = false;
        }
        this.$emit("updateParticipants");
      } catch (error) {
        console.error(error);
        console.log(this.book.id);
      }
    },
  },
};
</script>

<style scoped>
.book-icon {
  margin-bottom: 1.2rem;
}

.book-profile__title {
  margin-bottom: 0.8rem;
  text-align: center;
}

.book-profile__author {
  margin-bottom: 1.2rem;
  color: var(--medium-gray);
  text-align: center;
  text-transform: capitalize;
}

.buy-btn {
  padding-inline: 0.8rem;
  height: 3.2rem;
}

.buy-btn--margin-readers {
  margin-bottom: 1.2rem;
}

.buy-btn--margin-synopsis {
  margin-bottom: 2.4rem;
}

.buy-btn__url {
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--accent-color);
}
.book-synopsis {
  max-width: 40rem;
  min-height: 18.2rem;
  padding: 1.6rem;
  border: 0.2rem solid var(--primary-color);
  border-radius: 0.8rem;
}

.book-synopsis--margin-interested {
  margin-bottom: 1.4rem;
}
.book-synopsis--margin-vote-btn {
  margin-bottom: 3rem;
}

.book-synopsis__title {
  margin-bottom: 1.6rem;
  color: var(--primary-color);
}

.book-profile__participants--reader {
  margin-bottom: 2rem;
}

.book-profile__participants--interested {
  margin-bottom: 0.8rem;
}

.vote-btn {
  margin-bottom: 1.6rem;
}

.user-vote {
  border: none;
  background: var(--accent-color);
  color: var(--white);
}

.icon {
  margin-left: 0.4rem;
}

.book-profile__info {
  font-family: var(--secondary-font);
  text-align: center;
}
</style>
