<template>
  <div class="pop-up-container">
    <div class="pop-up-inner mx-11 py-8 px-5">
      <slot name="text" class="pop-up-inner__text"></slot>
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
        @click="closePopUp"
      >
        Log Out
      </ButtonBC>
    </div>
  </div>
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";

export default {
  name: "LogOutPopUp",
  emits: ["closePopUp"],
  data() {
    return {
      test: false,
    };
  },
  components: {
    ButtonBC,
  },
  methods: {
    closePopUp() {
      console.log("The pop-up should no longer appear");
      this.$emit("closePopUp");
    },
  },
};
</script>

<style scoped>
.pop-up-container {
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
.pop-up-inner {
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
  .pop-up-inner {
    width: 34.8rem;
    padding-block: 4.4rem;
  }

  .pop-up__btn,
  .close__btn {
    padding: 0.8rem 2.4rem;
  }
}
</style>
