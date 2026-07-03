<script setup>
defineProps({
  index: { type: String, required: true }, // e.g. '01', '02' — shown as a spec-sheet field number
  label: { type: String, required: true }, // e.g. 'ABOUT'
  title: { type: String, required: true },
})
</script>

<template>
  <div class="section-heading">
    <div class="section-heading__meta mono-label">
      <span>FIG. {{ index }}</span>
      <span aria-hidden="true">/</span>
      <span>{{ label }}</span>
    </div>
    <h2 class="section-heading__title">{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-heading {
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.section-heading__meta {
  display: flex;
  gap: 0.5em;
  margin-bottom: 0.75rem;
}

.section-heading__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
}
</style>
