<script setup>
import SectionHeading from './SectionHeading.vue'
import MediaEmbed from './MediaEmbed.vue'

defineProps({
  section: { type: Object, required: true },
})
</script>

<template>
  <section :id="section.slug" class="extra container" data-reveal>
    <SectionHeading
      :index="section.headingIndex || '•'"
      :label="section.headingLabel || section.navLabel || 'NOTE'"
      :title="section.title"
    />
    <p v-if="section.body" class="extra__body">{{ section.body }}</p>
    <MediaEmbed
      class="extra__media"
      :image-url="section.imageUrl"
      :video-url="section.videoUrl"
      :alt="section.title"
    />
  </section>
</template>

<style scoped>
.extra {
  padding-top: clamp(2.5rem, 6vw, 4.5rem);
  padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.extra__body {
  max-width: 62ch;
  color: var(--ink-soft);
  font-size: 1.05rem;
  white-space: pre-wrap;
}

.extra__media {
  margin-top: 1.5rem;
  max-width: min(100%, 720px);
}
</style>
