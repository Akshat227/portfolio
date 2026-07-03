<script setup>
import { profile } from '../data/profile.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <hr class="hairline" />
    <div class="container footer__inner">
      <span class="mono-label">© {{ year }} {{ profile.name }}</span>
      <span class="mono-label">Co-Founded: The Alpha Ones | SoilGrid</span>
    </div>
  </footer>
</template>

<style scoped>
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem var(--edge);
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
