<template>
  <div class="test">
    <div class="testy-test mx-11 py-8 px-5">
      <p class="testy-test__text text-s font-semibold">
        Logging out. <br />
        You will be returned to the login screen
      </p>
      <ButtonBC
        class="close__btn font-semibold"
        variant="secondary"
        @click="closePopUp"
      >
        Cancel
      </ButtonBC>
      <ButtonBC
        class="pop-up__btn font-semibold"
        variant="primary"
        @click="logOutUser"
      >
        Log Out
      </ButtonBC>
    </div>
  </div>
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";
import EventService from "../services/EventService";

export default {
  name: "LogOutPopUp",
  emits: ["closePopUp"],
  components: {
    ButtonBC,
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    },
    async logOutUser() {
      try {
        await EventService.logOutUser();
        this.$router.push({
          name: "log-in",
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: var(--opacity-background-color);
}
.testy-test {
  background-color: var(--white);
  border-radius: 0.8rem;
  text-align: center;
  width: 32rem;
}

.close__btn {
  margin-right: 0.8rem;
}
.pop-up__btn {
  margin-top: 2.3rem;
}

@media (min-width: 768px) {
  .testy-test {
    width: 34.8rem;
    padding-block: 4.4rem;
  }

  .pop-up__btn,
  .close__btn {
    padding: 0.8rem 2.4rem;
  }
}
</style>
