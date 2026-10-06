<script setup>
import { useSiteContent } from '../composables/useSiteContent.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'
import MediaEmbed from './MediaEmbed.vue'

const { profile } = useSiteContent()
const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="top" class="hero container">
    <p class="mono-label hero__eyebrow" data-reveal>
      {{ profile.heroEyebrow }} {{ new Date().getFullYear() }}
    </p>

    <h1 class="hero__name" data-reveal data-reveal-delay="1">{{ profile.fullName }}</h1>

    <p class="hero__tagline" data-reveal data-reveal-delay="2">{{ profile.tagline }}</p>

    <div class="hero__actions" data-reveal data-reveal-delay="3">
      <button type="button" class="btn btn--primary" @click="scrollToSection('projects')">
        View Projects
      </button>
      <button type="button" class="btn btn--ghost" @click="scrollToSection('contact')">
        Get in Touch
      </button>
    </div>

    <MediaEmbed
      v-if="profile.heroVideoUrl || profile.heroImageUrl"
      class="hero__media"
      data-reveal
      data-reveal-delay="4"
      :image-url="profile.heroImageUrl"
      :video-url="profile.heroVideoUrl"
      :alt="profile.fullName"
    />

    <dl class="spec-sheet" data-reveal data-reveal-delay="5">
      <div v-for="spec in profile.heroSpecs" :key="spec.field" class="spec-sheet__row">
        <dt class="mono-label spec-sheet__field">{{ spec.field }}</dt>
        <dd class="spec-sheet__value">{{ spec.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(2.25rem, 7vw, 5.5rem);
  padding-bottom: clamp(2.25rem, 6vw, 4rem);
}

.hero__eyebrow {
  margin-bottom: 1.25rem;
}

.hero__name {
  font-size: clamp(2.4rem, 11vw, 6.5rem);
  max-width: 14ch;
  overflow-wrap: anywhere;
}

.hero__tagline {
  margin-top: 1.25rem;
  max-width: 42ch;
  font-size: clamp(1.02rem, 2.4vw, 1.25rem);
  color: var(--ink-soft);
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.hero__media {
  margin-top: 2rem;
  max-width: min(100%, 720px);
}

.btn {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.85rem 1.4rem;
  min-height: 44px;
  border-radius: 0;
  cursor: pointer;
  border: 1px solid var(--line-strong);
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
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
  margin: clamp(2rem, 6vw, 4rem) 0 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.spec-sheet__row {
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  margin: -1px 0 0 -1px;
}

.spec-sheet__field {
  color: var(--accent-copper);
  margin-bottom: 0.35rem;
}

.spec-sheet__value {
  margin: 0;
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}

@media (max-width: 860px) {
  .spec-sheet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .hero__actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .spec-sheet {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
