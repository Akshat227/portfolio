<script setup>
defineProps({
  imageUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  alt: { type: String, default: '' },
})
</script>

<template>
  <div v-if="videoUrl || imageUrl" class="media">
    <video
      v-if="videoUrl"
      class="media__el"
      :src="videoUrl"
      controls
      playsinline
      preload="metadata"
    />
    <img
      v-else
      class="media__el"
      :src="imageUrl"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped>
.media {
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg-card);
}

.media__el {
  width: 100%;
  height: auto;
  display: block;
  max-height: min(52vh, 420px);
  object-fit: cover;
}
</style>
