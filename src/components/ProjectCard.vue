<script setup>
import MediaEmbed from './MediaEmbed.vue'

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
})
</script>

<template>
  <article class="project-card" data-reveal :data-reveal-delay="String((index % 3) + 1)">
    <div class="project-card__top">
      <span class="mono-label project-card__index">NO. {{ String(index + 1).padStart(2, '0') }}</span>
      <span v-if="project.pinned" class="mono-label project-card__pin">FEATURED</span>
      <span class="mono-label project-card__year">{{ project.year }}</span>
    </div>

    <MediaEmbed
      v-if="project.videoUrl || project.imageUrl"
      class="project-card__media"
      :image-url="project.imageUrl"
      :video-url="project.videoUrl"
      :alt="project.title"
    />

    <h3 class="project-card__title">{{ project.title }}</h3>
    <p class="project-card__tagline">{{ project.tagline }}</p>
    <p class="project-card__desc">{{ project.description }}</p>

    <ul class="project-card__stack" aria-label="Tech stack">
      <li v-for="tech in project.stack" :key="tech" class="mono-label">{{ tech }}</li>
    </ul>

    <div class="project-card__links">
      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener"
        class="project-card__link mono-label"
      >
        ↗ Source
      </a>
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener"
        class="project-card__link mono-label"
      >
        ↗ Live Demo
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--line-strong);
  background: var(--bg-card);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

@media (hover: hover) and (pointer: fine) {
  .project-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-copper);
    box-shadow: 0 10px 24px rgba(23, 23, 15, 0.08);
  }
}

.project-card__top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  min-width: 0;
}

.project-card__index {
  color: var(--ink-faint);
}

.project-card__pin {
  color: var(--accent-signal);
}

.project-card__year {
  margin-left: auto;
  color: var(--ink-faint);
}

.project-card__media {
  margin-bottom: 1rem;
}

.project-card__media :deep(.media__el) {
  max-height: 180px;
}

.project-card__title {
  font-size: clamp(1.15rem, 3vw, 1.3rem);
  margin-bottom: 0.4rem;
  overflow-wrap: anywhere;
}

.project-card__tagline {
  color: var(--accent-copper);
  font-size: 0.92rem;
  margin-bottom: 0.75rem;
}

.project-card__desc {
  color: var(--ink-soft);
  font-size: 0.94rem;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-card__stack {
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 0.75rem 0 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.7rem;
}

.project-card__stack li {
  color: var(--ink-soft);
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.project-card__link {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 2px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.project-card__link:hover {
  color: var(--accent-copper);
  border-color: var(--accent-copper);
}

@media (max-width: 480px) {
  .project-card {
    padding: 1.1rem;
  }
}
</style>
