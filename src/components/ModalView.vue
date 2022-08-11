<template>
  <div class="pop-up-container">
    <MainHeader
      class="main-header"
      homepage="true"
      @proposeBookFormTrigger="closePopUp"
    ></MainHeader>
    <div class="pop-up-inner">
      <ButtonBC class="close__btn" variant="arrow" @click="closePopUp">
        <v-icon name="oi-arrow-left" scale="2" fill="black" />
      </ButtonBC>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ButtonBC from "./ui-components/ButtonComponent.vue";
import MainHeader from "./MainHeader.vue";

export default {
  name: "ModalView",
  components: {
    ButtonBC,
    MainHeader,
  },
  methods: {
    closePopUp() {
      this.$emit("proposeBookFormTrigger");
    },
  },
};
</script>

<style scoped>
.pop-up-container {
  padding-inline: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: var(--secondary-background-color);
  min-height: 100vh;
}
.pop-up-inner {
  background-color: var(--white);
  border-radius: 0.8rem;
  text-align: center;
  width: 100%;
}

.main-header {
  width: 100%;
}

.close__btn {
  display: none;
}

@media (min-width: 768px) {
  .pop-up-container {
    background-color: var(--opacity-background-color);
  }
  .main-header {
    display: none;
  }
  .pop-up-inner {
    padding: 0;
    width: 60rem;
    height: 70rem;
  }

  .close__btn {
    display: block;
  }
}
</style>
