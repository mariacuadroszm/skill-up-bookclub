<template>
  <div class="pop-up-container">
    <MainHeader
      class="main-header"
      homepage="true"
      @proposeBookFormTrigger="closePopUp"
    ></MainHeader>
    <div class="pop-up-inner">
      <div class="close-btn-container">
        <ButtonBC class="close__btn" variant="close" @click="closePopUp">
          <v-icon name="oi-arrow-left" scale="2" fill="black" />
        </ButtonBC>
      </div>
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
  position: absolute;
  top: -10rem;
  left: 0;
  right: 0;
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
    position: fixed;
    top: 0;
  }
  .main-header {
    display: none;
  }
  .pop-up-inner {
    padding: 0;
    width: 60rem;
  }

  .close-btn-container {
    display: flex;
    flex-direction: row-reverse;
  }

  .close__btn {
    display: block;
  }
}
</style>
