<template>
  <button
    :class="{
      btn: true,
      primary: isPrimary,
      secondary: isSecondary,
      tertiary: isTertiary,
      arrow: isAnArrow,
      disabled: isDisabled,
    }"
  >
    <slot>Show all</slot>
  </button>
</template>

<script>
export default {
  name: "ButtonBC",
  props: {
    variant: {
      type: String,
      default: "btn",
      validator: (propValue) => {
        return [
          "primary",
          "secondary",
          "tertiary",
          "arrow",
          "disabled",
        ].includes(propValue);
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    isPrimary() {
      return this.variant === "primary";
    },
    isSecondary() {
      return this.variant === "secondary";
    },
    isTertiary() {
      return this.variant === "tertiary";
    },
    isAnArrow() {
      return this.variant === "arrow";
    },
    isDisabled() {
      return this.variant === "disabled";
    },
  },
};
</script>

<style scoped>
.btn {
  height: 4rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  border-radius: 0.8rem;
  border: none;
  background: transparent;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
  font-family: var(--secondary-font);
  font-size: 1.6rem;
  color: var(--white);
  cursor: pointer;
}

.primary {
  background: var(--accent-color);
}
.secondary {
  border: 0.2rem solid var(--accent-color);
  color: var(--accent-color);
}

.tertiary {
  border: 0.2rem solid var(--white);
}
.arrow {
  box-shadow: none;
  padding: 0;
  margin: 0;
  justify-self: left;
}

.disabled {
  border: 0.2rem solid var(--accent-color);
  color: var(--accent-color);
  opacity: 0.3;
}

@media (min-width: 768px) {
  .btn {
    padding-left: 10.5rem;
    padding-right: 10.5rem;
  }

  .tertiary {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}
</style>
