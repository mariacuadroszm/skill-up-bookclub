<template>
  <main class="sign-in-container">
    <img
      class="main__logo"
      src="../components/icons/media-monks-logo.svg"
      alt="Media Monks logo"
    />

    <form @submit.prevent="submitSignIn">
      <FormLabel id="name" class="label-container">
        <template v-slot:labelDescription>First name</template>
        <template v-slot:labelInput>
          <input
            type="text"
            id="name"
            placeholder="Type your first name"
            required
            class="label__input"
            v-model="name"
          />
        </template>
      </FormLabel>

      <FormLabel id="lastName" class="label-container">
        <template v-slot:labelDescription>Last name</template>
        <template v-slot:labelInput>
          <input
            type="text"
            id="lastName"
            placeholder="Type your last name"
            required
            class="label__input"
            v-model="lastName"
          />
        </template>
      </FormLabel>

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
            class="label__input label__input--password"
            v-model="password"
          />
          <div v-if="!validPassword" class="not-valid-password">
            <p class="not-valid-password__description text-s">
              Your password must have:
            </p>
            <ul class="not-valid-password__bullets">
              <li class="text-s">Numbers and letters</li>
              <li class="text-s">Uppercase and lowercase</li>
              <li class="text-s">8-16 characters</li>
              <li class="text-s">No blank spaces</li>
            </ul>
          </div>
        </template>
      </FormLabel>

      <FormLabel id="confirmPassword">
        <template v-slot:labelDescription>Confirm password</template>
        <template v-slot:labelInput>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Type again your password"
            required
            class="label__input label__input--password"
            v-model="confirmPassword"
          />
          <div
            v-if="passwordsDontMatch"
            class="passwords-dont-match form-error"
          >
            <ul>
              <li class="text-s">{{ passwordsDontMatch }}</li>
            </ul>
          </div>
        </template>
      </FormLabel>

      <div class="final-info-container">
        <ButtonBC class="final-info__button" type="submit" variant="login">
          Sign up
        </ButtonBC>
        <p class="text-s font-medium">Already have an account?</p>
        <router-link
          class="final-info__router text-s font-medium"
          :to="{ name: 'log-in' }"
          >Log in here</router-link
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
  name: "SignUpView",
  components: {
    FormLabel,
    ButtonBC,
  },
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      notZemogaEmail: "",
      passwordsDontMatch: "",
      validPassword: true,
    };
  },

  methods: {
    async submitSignIn() {
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

        if (this.password === this.confirmPassword) {
          this.passwordsDontMatch = "";
        } else {
          this.passwordsDontMatch = "Your passwords don't match";
        }

        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(this.password)
        ) {
          this.validPassword = true;
        } else {
          this.validPassword = false;
        }

        if (
          !this.passwordsDontMatch &&
          !this.notZemogaEmail &&
          this.validPassword
        ) {
          const userInfo = {
            firstName: this.name,
            surname: this.lastName,
            email: this.email,
            password: this.password,
            rePassword: this.confirmPassword,
          };
          const userCredentials = {
            email: this.email,
            password: this.password,
          };
          await EventService.signUpUser(userInfo);
          await EventService.logInUser(userCredentials);
          this.$router.push({
            name: "home",
          });
        }
      } catch (error) {
        console.error(error);
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
.sign-in-container {
  min-height: 100vh;
  padding: 4rem 6.3rem;
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

.not-valid-password__description {
  margin-top: 1.4rem;
  padding: 0;
}

.not-valid-password__bullets {
  padding-left: 2.5rem;
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
  .sign-in-container {
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
