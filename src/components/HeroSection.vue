<script setup>
import { profile } from '../data/profile.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'

const { scrollToSection } = useSmoothScroll()

const specs = [
  { field: 'ROLE', value: profile.role },
  { field: 'BASE', value: profile.location },
  { field: 'AFFIL', value: profile.affiliation },
  { field: 'STATUS', value: 'Open to interesting problems' },
]
</script>

<template>
  <section id="top" class="hero container">
    <p class="mono-label hero__eyebrow">PORTFOLIO — REV. {{ new Date().getFullYear() }}</p>

    <h1 class="hero__name">{{ profile.fullName }}</h1>

    <p class="hero__tagline">{{ profile.tagline }}</p>

    <div class="hero__actions">
      <button type="button" class="btn btn--primary" @click="scrollToSection('projects')">
        View Projects
      </button>
      <button type="button" class="btn btn--ghost" @click="scrollToSection('contact')">
        Get in Touch
      </button>
    </div>

    <!-- Signature element: a datasheet-style spec block, like a component header -->
    <dl class="spec-sheet">
      <div v-for="spec in specs" :key="spec.field" class="spec-sheet__row">
        <dt class="mono-label spec-sheet__field">{{ spec.field }}</dt>
        <dd class="spec-sheet__value">{{ spec.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(3rem, 8vw, 5.5rem);
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
}

.hero__eyebrow {
  margin-bottom: 1.25rem;
}

.hero__name {
  font-size: clamp(3rem, 10vw, 6.5rem);
  max-width: 14ch;
}

.hero__tagline {
  margin-top: 1.25rem;
  max-width: 42ch;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--ink-soft);
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.85rem 1.4rem;
  border-radius: 0;
  cursor: pointer;
  border: 1px solid var(--line-strong);
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
}

.btn--primary {
  background: var(--ink);
  color: var(--bg-paper);
}

.btn--primary:hover {
  background: var(--accent-copper);
  border-color: var(--accent-copper);
}

.btn--ghost {
  background: transparent;
  color: var(--ink);
}

.btn--ghost:hover {
  background: var(--ink);
  color: var(--bg-paper);
}

.btn:active {
  transform: translateY(1px);
}

.spec-sheet {
  margin: clamp(2.5rem, 6vw, 4rem) 0 0;
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.spec-sheet__row {
  padding: 0.9rem 1.1rem 0.9rem 0.9rem;
  border-right: 1px solid var(--line);
}

.spec-sheet__row:last-child {
  border-right: none;
}

.spec-sheet__field {
  color: var(--accent-copper);
  margin-bottom: 0.35rem;
}

.spec-sheet__value {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 700px) {
  .spec-sheet {
    grid-template-columns: 1fr 1fr;
  }
  .spec-sheet__row {
    border-bottom: 1px solid var(--line);
  }
}
</style>
