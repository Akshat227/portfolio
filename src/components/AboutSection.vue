<script setup>
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'
</script>

<template>
  <section id="about" class="about container">
    <SectionHeading index="01" label="ABOUT" title="Who's building this" />

    <div class="about__grid">
      <div class="about__bio">
        <p v-for="(para, i) in profile.bio" :key="i" class="about__para">
          {{ para }}
        </p>

        <a
          v-if="profile.resumeUrl"
          :href="profile.resumeUrl"
          class="about__resume mono-label"
          target="_blank"
          rel="noopener"
        >
          → Download Resume
        </a>
      </div>

      <div class="about__skills">
        <div v-for="group in profile.skills" :key="group.label" class="skill-group">
          <p class="mono-label skill-group__label">{{ group.label }}</p>
          <ul class="skill-group__list">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-top: clamp(3rem, 7vw, 5rem);
  padding-bottom: clamp(3rem, 7vw, 5rem);
}

.about__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(2rem, 6vw, 4rem);
}

.about__para {
  font-size: 1.05rem;
  color: var(--ink-soft);
  max-width: 60ch;
}

.about__para + .about__para {
  margin-top: 1rem;
}

.about__resume {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--accent-copper);
  text-decoration: none;
}

.about__resume:hover {
  text-decoration: underline;
}

.about__skills {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-group {
  border-top: 1px solid var(--line);
  padding-top: 0.75rem;
}

.skill-group__label {
  margin-bottom: 0.5rem;
}

.skill-group__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
  font-size: 0.92rem;
}

.skill-group__list li::after {
  content: '·';
  margin-left: 0.6rem;
  color: var(--ink-faint);
}

.skill-group__list li:last-child::after {
  content: '';
}

@media (max-width: 760px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
