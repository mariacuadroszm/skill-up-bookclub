<template>
  <header class="header-container my-7">
    <ButtonBC
      class="mx-5"
      variant="arrow"
      @click="goBack"
      v-if="displayBackBtn"
    >
      <v-icon name="oi-arrow-left" scale="2" fill="white" />
    </ButtonBC>
    <img
      class="header__logo"
      src="./icons/media-monks-logo.svg"
      alt="Media Monks logo"
    />
  </header>
</template>

<script>
import ButtonBC from "../components/ui-components/ButtonComponent.vue";

export default {
  name: "MainHeader",
  components: {
    ButtonBC,
  },
  data() {
    return {};
  },
  props: {
    displayBackBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.header-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  height: 6rem;
}

.header__logo {
  grid-column: 2 / 3;
  justify-self: center;
  width: 18.1rem;
}

@media (min-width: 768px) {
  .header-container {
    height: 5.4rem;
    margin-block: 5.2rem;
    padding-inline: 2.8rem;
  }
  .header__logo {
    width: 24.8rem;
  }
}
</style>
