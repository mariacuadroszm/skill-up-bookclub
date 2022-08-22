<template>
  <main class="log-in-container">
    <img
      class="main__logo"
      src="../components/icons/media-monks-logo.svg"
      alt="Media Monks logo"
    />

    <form @submit.prevent="submitLogIn">
      <FormLabel id="email" class="label-container">
        <template v-slot:labelDescription>E-mail</template>
        <template v-slot:labelInput>
          <input
            type="email"
            id="email"
            placeholder="Type your zemoga e-mail"
            required
            class="label__input"
            v-model="email"
          />
          <div v-if="notZemogaEmail" class="not-zemoga-email form-error">
            <ul>
              <li class="text-s">{{ notZemogaEmail }}</li>
            </ul>
          </div>
        </template>
      </FormLabel>

      <FormLabel id="password" class="label-container">
        <template v-slot:labelDescription>Password</template>
        <template v-slot:labelInput>
          <input
            type="password"
            id="password"
            placeholder="Type your password"
            required
            class="label__input"
            v-model="password"
          />
          <div v-if="incorrectCredentials" class="form-error">
            <ul>
              <li class="text-s">{{ incorrectCredentials }}</li>
            </ul>
          </div>
        </template>
      </FormLabel>

      <div class="final-info-container">
        <ButtonBC class="final-info__button" type="submit" variant="login">
          Log in
        </ButtonBC>
        <p class="text-s font-medium">Don't have an account?</p>
        <router-link
          class="final-info__router text-s font-medium"
          :to="{ name: 'sign-in' }"
          >Sign in here</router-link
        >
      </div>
    </form>
  </main>
</template>

<script>
import FormLabel from "../components/FormLabel.vue";
import ButtonBC from "../components/ui-components/ButtonComponent.vue";
import EventService from "../services/EventService.js";

export default {
  name: "LogInView",
  components: {
    FormLabel,
    ButtonBC,
  },
  data() {
    return {
      email: "",
      password: "",
      notZemogaEmail: "",
      incorrectCredentials: "",
    };
  },
  methods: {
    async submitLogIn() {
      try {
        if (
          /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@zemoga.com\s*$/.test(
            this.email
          ) ||
          /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@zemogainc.com\s*$/.test(
            this.email
          )
        ) {
          this.notZemogaEmail = "";
        } else {
          this.notZemogaEmail = "Sorry, Zemoga e-mail only!";
        }

        if (!this.notZemogaEmail) {
          const userInfo = {
            email: this.email,
            password: this.password,
          };
          await EventService.logInUser(userInfo);
          this.$router.push({
            name: "home",
          });
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.incorrectCredentials = " Your email or password is incorrect";
        } else {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.main__logo {
  width: 16rem;
  margin-bottom: 3.2rem;
}
.log-in-container {
  min-height: 100vh;
  padding: 8.2rem 6.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  color: var(--white);
  width: 100%;
}

.label-container {
  margin-bottom: 2.4rem;
}

.form-error {
  margin-top: 1.4rem;
  padding-left: 1.5rem;
}
.final-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.final-info__button {
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
}

.final-info__router {
  color: var(--white);
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .log-in-container {
    width: 44rem;
    margin: 0 auto;
  }

  .main__logo {
    width: 20rem;
  }

  .label-container {
    margin-bottom: 2.6rem;
  }
}
</style>
