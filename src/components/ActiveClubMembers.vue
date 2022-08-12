<template>
  <div class="members my-10">
    <h2 class="members__title" data-testid="title">List of members</h2>
    <ul class="members__list">
      <li
        v-for="(member, index) in membersList"
        class="members__list--item text-m"
        :key="member"
        data-testid="member"
      >
        {{ index + 1 }} {{ member.name }}
      </li>
    </ul>
    <span
      @click="fullList"
      class="full-members__list text-s"
      data-testid="full-list"
    >
      + Let's see the full list of members!
    </span>
  </div>
</template>

<script>
import EventService from "../services/EventService.js";

export default {
  name: "ActiveClubMembers",
  data() {
    return {
      members: [],
      viewFullList: false,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    EventService.getMembersList(this.id)
      .then((response) => {
        this.members = response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    fullList() {
      this.viewFullList = !this.viewFullList;
    },
  },
  computed: {
    membersList() {
      if (this.viewFullList === true) {
        return this.members;
      } else {
        return this.members.slice(0, 5);
      }
    },
  },
};
</script>

<style scoped>
.members {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
}

.members__title {
  align-self: flex-start;
  margin-bottom: 1.4rem;
}

.members__list {
  width: 28rem;
  margin-bottom: 0.4rem;
}

.members__list--item {
  height: 4rem;
  padding: 1rem 2.7rem;
  margin-bottom: 0.8rem;
  border: 0.2rem solid var(--primary-color);
  border-radius: 0.8rem;
  list-style: none;
}

.full-members__list {
  font-family: var(--secondary-font);
  color: var(--accent-color);
  cursor: pointer;
}

@media (min-width: 768px) {
  .members__title {
    align-self: center;
  }
}
</style>
