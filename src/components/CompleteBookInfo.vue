<template>
  <v-icon name="bi-book" scale="3" class="book-icon" />
  <h2 class="book-profile__title" data-testid="title">{{ book.title }}</h2>
  <p class="book-profile__author text-l font-medium" data-testid="author">
    {{ book.author }}
  </p>
  <button-bc
    class="buy-btn"
    variant="secondary"
    :class="[isReader ? 'buy-btn--margin-readers' : 'buy-btn--margin-synopsis']"
    data-testid="buyBtn"
  >
    <a
      :href="bookUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="font-bold buy-btn__url"
      data-testid="url"
    >
      Where to buy?
    </a>
  </button-bc>
  <div class="book-profile__participants--reader" v-if="isReader">
    <p class="text-s" data-testid="participants">{{ participants }} Readers</p>
  </div>
  <div
    class="book-synopsis"
    :class="[
      !isReader
        ? 'book-synopsis--margin-interested'
        : 'book-synopsis--margin-vote-btn',
    ]"
  >
    <p
      class="book-synopsis__title text-xl font-semibold"
      data-testid="synopsis"
    >
      Synopsis
    </p>
    <p class="book-synopsis__info text-m">{{ book.synopsis }}</p>
  </div>
  <div class="book-profile__participants--interested" v-if="!isReader">
    <p class="text-s" data-testid="participants">
      {{ participants }} Interested
    </p>
  </div>
  <button-bc
    class="vote-btn font-medium"
    variant="secondary"
    @click="addVote"
    :class="{ 'user-vote': isUserInClub === 'Active' }"
    data-testid="textBtn"
  >
    {{ textBtn }}
    <span v-if="isUserInClub != 'Active'"
      ><v-icon name="hi-solid-plus" scale="0.8" class="icon"
    /></span>
    <span v-else
      ><v-icon name="hi-solid-check" scale="0.8" class="icon"
    /></span>
  </button-bc>
  <p class="book-profile__info text-s font-normal" data-testid="message">
    {{ voteMessage }}
  </p>
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
      bookUrl: this.book.storeUrl,
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
    participants: {
      type: Number,
      required: true,
    },
    isUserInClub: {
      type: String,
      required: true,
    },
  },
  computed: {
    textBtn() {
      if (this.isReader && this.isUserInClub != "Active") {
        return "Join";
      } else if (!this.isReader && this.isUserInClub != "Active") {
        return "Vote";
      } else if (this.isReader && this.isUserInClub === "Active") {
        return "Joined";
      } else {
        return "Voted";
      }
    },
    voteMessage() {
      if (this.isReader && this.isUserInClub != "Active") {
        return `Tap "join" to be part of this awesome club. Remember it already started!`;
      } else if (this.isReader && this.isUserInClub === "Active") {
        return `Now you're part of this club!`;
      } else if (!this.isReader && this.isUserInClub != "Active") {
        return `Tap the "vote" button to be part of our club once it has five or more interested readers.`;
      } else {
        return `Now you're part of this club! Once it starts you'll find this book profile on "active clubs"`;
      }
    },
  },

  async created() {
    try {
      const userSesion = await EventService.checkUserSesion();
      this.userId = userSesion.id;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async addVote() {
      try {
        if (this.isUserInClub != "Active") {
          await EventService.joinClub(
            this.userId,
            this.book.id,
            this.participants
          );
        } else {
          await EventService.leaveClub(
            this.userId,
            this.book.id,
            this.participants
          );
        }
        this.$emit("updateParticipants");
      } catch (error) {
        console.error(error);
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

@media (min-width: 768px) {
  .book-profile__title,
  .book-profile__author {
    padding-inline: 7rem;
  }
  .book-profile__author {
    margin-bottom: 2rem;
  }

  .book-synopsis--margin-interested {
    margin-bottom: 2.4rem;
  }

  .book-synopsis__title,
  .book-synopsis__info {
    text-align: left;
  }

  .vote-btn {
    padding-inline: 2.4rem;
  }

  .book-profile__info {
    padding-inline: 10rem;
  }
}
</style>
