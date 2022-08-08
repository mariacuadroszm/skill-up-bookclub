<template>
  <div class="pop-up-container">
    <div class="pop-up-inner mx-11 px-12 py-8">
      <slot class="pop-up-inner__text"></slot>
      <ButtonBC class="pop-up__btn" variant="primary" @click="closePopUp"
        >Got it!</ButtonBC
      >
    </div>
  </div>
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";

export default {
  name: "PopUp",
  components: {
    ButtonBC,
  },
  methods: {
    closePopUp() {
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
.pop-up__btn {
  margin-top: 3rem;
}
</style>
