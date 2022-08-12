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
</style>
