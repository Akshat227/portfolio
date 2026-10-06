<script setup>
defineProps({
  index: { type: String, required: true }, // e.g. '01', '02'
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
      <span class="section-heading__line" aria-hidden="true"></span>
      <span class="section-heading__arrow" aria-hidden="true">→</span>
    </div>
    <h2 class="section-heading__title">{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-heading {
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
  cursor: default;
}

.section-heading__meta {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.75rem;
  transition: color 0.25s ease;
}

.section-heading__line {
  height: 1px;
  width: 0;
  background: var(--accent-copper);
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0.85;
}

.section-heading__arrow {
  color: var(--accent-copper);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.section-heading:hover .section-heading__meta {
  color: var(--ink);
}

.section-heading:hover .section-heading__line {
  width: 70px;
}

.section-heading:hover .section-heading__arrow {
  opacity: 1;
  transform: translateX(0);
}

.section-heading__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
}
</style>
