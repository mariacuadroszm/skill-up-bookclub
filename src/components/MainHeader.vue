<template>
  <header class="header-container my-7" :class="$attrs.class">
    <ButtonBC
      class="goBackBtn mx-5"
      data-testid="goBackBtn"
      variant="arrow"
      @click="goBack"
      v-if="displayBackBtn"
    >
      <v-icon name="oi-arrow-left" scale="2.5" fill="white" />
    </ButtonBC>
    <img
      class="header__logo"
      src="./icons/media-monks-logo.svg"
      alt="Media Monks logo"
    />
    <ButtonBC
      variant="logOutOutline"
      :class="[homepage && !displayBackBtn ? 'logOutIcon' : '']"
      @click="logOut"
    >
      <v-icon name="md-logout-round" scale="1.8" fill="white" />
    </ButtonBC>
  </header>

  <Teleport to="body">
    <LogOutPopUp v-if="displayLogOut" @closePopUp="logOut">
      <template v-slot:text>
        <p class="text-s font-semibold">
          Logging out. <br />
          You will be returned to the login screen
        </p>
      </template>
    </LogOutPopUp>
  </Teleport>
</template>

<script>
import ButtonBC from "../components/ui-components/ButtonComponent.vue";
import LogOutPopUp from "../components/LogOutPopUp.vue";

export default {
  name: "MainHeader",
  inheritAttrs: false,
  components: {
    ButtonBC,
    LogOutPopUp,
  },
  emits: ["proposeBookFormTrigger", "closeBookDetails", "closeLogOutPopUp"],
  data() {
    return {
      displayLogOut: false,
    };
  },
  props: {
    displayBackBtn: {
      type: Boolean,
      default: true,
    },
    homepage: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      if (!this.homepage) {
        this.$router.go(-1);
      } else {
        this.$emit("proposeBookFormTrigger");
        this.$emit("closeBookDetails");
      }
    },
    logOut() {
      console.log("The pop-up should appear now");
      this.displayLogOut = !this.displayLogOut;
      this.$emit("closeLogOutPopUp");
    },
    cancel() {
      console.log("Pop-up was closed");
    },
  },
  created() {
    console.log(this.displayLogOut);
  },
  updated() {
    console.log(this.displayLogOut);
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

.logOutIcon {
  padding: 0 1.6rem 0 0;
}

@media (min-width: 768px) {
  .header-container {
    height: 5.4rem;
    margin-block: 5.2rem;
  }
  .header__logo {
    width: 24.8rem;
  }

  .goBackBtn {
    display: none;
  }

  .btn {
    padding: 0;
  }

  .logOutIcon {
    padding: 0 2.8rem 0 0;
  }
}
</style>
