<template>
  <div class="label-container">
    <label :for="id">
      <span class="label__description text-m">
        <slot name="labelDescription"></slot>
      </span>
      <div>
        <slot name="labelInput"></slot>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "FormLabel",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.label-container {
  margin-top: 1.6rem;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.label__description {
  font-family: var(--secondary-font);
  font-weight: 700;
  display: flex;
}
@media (min-width: 768px) {
  .label__description {
    font-size: 2.4rem;
    line-height: 3rem;
  }

  .label-container {
    margin-top: 2.4rem;
  }
}
</style>
