<script setup>
import { useSiteContent } from '../composables/useSiteContent.js'
const { profile } = useSiteContent()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <hr class="hairline" />
    <div class="container footer__inner">
      <span class="mono-label">© {{ year }} {{ profile.name }}</span>
      <span class="mono-label footer__note">{{ profile.footerNote }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.35rem 0 calc(1.35rem + env(safe-area-inset-bottom));
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.footer__note {
  text-align: right;
}

@media (max-width: 560px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__note {
    text-align: left;
  }
}
</style>
