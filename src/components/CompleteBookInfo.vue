<template>
  <v-icon name="bi-book" scale="3" class="book-icon" />
  <h2 class="book-profile__title">{{ book.title }}</h2>
  <p class="book-profile__author text-l font-medium">{{ book.author }}</p>
  <button-bc class="buy-btn" variant="secondary">
    <a
      :href="bookUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="font-bold buy-btn__url"
    >
      Where to buy?
    </a>
  </button-bc>
  <div class="book-synopsis">
    <p class="book-synopsis__title text-xl font-semibold">Synopsis</p>
    <p class="book-synopsis__info text-m">{{ book.synopsis }}</p>
  </div>
  <p class="book-profile__participants text-s">{{ participants }} Interested</p>
  <button-bc
    class="vote-btn font-medium"
    variant="secondary"
    @click="addVote"
    :class="{ 'user-vote': userVoted }"
  >
    <span v-if="!userVoted">
      Vote<v-icon name="hi-solid-plus" scale="0.8" class="icon" />
    </span>
    <span v-else>
      Voted<v-icon name="hi-solid-check" scale="0.8" class="icon" />
    </span>
  </button-bc>
  <p class="book-profile__info text-s font-normal">{{ message }}</p>
</template>

<script>
import ButtonBC from "../components/ui-components/ButtonComponent.vue";

export default {
  name: "BookProfile",
  components: {
    "button-bc": ButtonBC,
  },
  data() {
    return {
      userVoted: false,
      bookUrl: this.book.url,
      participants: this.book.participants,
      message: `tap the "vote" button to be part of our club once it has five or more
        interested readers`,
    };
  },
  props: ["book"],
  methods: {
    addVote() {
      if (this.userVoted == false) {
        this.message = `now you're part of this club! once it starts you'll find this book profile on "active clubs"`;
        this.participants = this.participants + 1;
        this.userVoted = true;
      } else {
        this.message = `tap the "vote" button to be part of our club once it has five or more interested readers`;
        this.participants = this.participants - 1;
        this.userVoted = false;
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
  text-align: center;
}

.book-profile__author {
  margin-bottom: 0.8rem;
  color: var(--medium-gray);
  text-align: center;
}

.buy-btn {
  margin-bottom: 2.4rem;
  padding-inline: 0.8rem;
  height: 3.2rem;
}

.buy-btn__url {
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--accent-color);
}
.book-synopsis {
  max-width: 40rem;
  min-height: 18.2rem;
  margin-bottom: 1.4rem;
  padding: 1.6rem;
  border: 0.2rem solid var(--primary-color);
  border-radius: 0.8rem;
}

.book-synopsis__title {
  margin-bottom: 1.6rem;
  color: var(--primary-color);
}

.book-profile__participants {
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
