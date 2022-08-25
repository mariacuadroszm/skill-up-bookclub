<template>
  <header :class="isInModal ? 'main-header-pop-up' : 'main-header'">
    <div class="header-container my-7">
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
    </div>
  </header>

  <LogOutPopUp v-if="displayLogOut" @closePopUp="logOut"></LogOutPopUp>
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
    isInModal: {
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
      this.displayLogOut = !this.displayLogOut;
      this.$emit("closeLogOutPopUp");
    },
  },
};
</script>
<style scoped>
.main-header {
  width: 100%;
}

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

  .main-header {
    display: block;
  }

  .main-header-pop-up {
    display: none;
  }
}
</style>
