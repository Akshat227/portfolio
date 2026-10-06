<script setup>
import { computed } from 'vue'
import SectionHeading from './SectionHeading.vue'
import { useSiteContent } from '../composables/useSiteContent.js'

const { profile } = useSiteContent()

const contactLinks = computed(() =>
  [
    { label: 'Email', value: 'Send a message', href: profile.value.links.email },
    {
      label: 'GitHub',
      value: (profile.value.links.github || '').replace(/^https?:\/\//, ''),
      href: profile.value.links.github,
    },
    {
      label: 'Website',
      value: (profile.value.links.website || '').replace(/^https?:\/\//, ''),
      href: profile.value.links.website,
    },
  ].filter((link) => link.href),
)
</script>

<template>
  <section id="contact" class="contact container" data-reveal>
    <SectionHeading index="03" label="CONTACT" :title="profile.contactTitle" />

    <p class="contact__intro">
      {{ profile.contactIntro }}
    </p>

    <ul class="contact__list">
      <li v-for="link in contactLinks" :key="link.label" class="contact__item">
        <a :href="link.href" target="_blank" rel="noopener" class="contact__link">
          <span class="mono-label contact__field">{{ link.label }}</span>
          <span class="contact__value">{{ link.value }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact {
  padding-top: clamp(2.5rem, 7vw, 5rem);
  padding-bottom: clamp(3rem, 9vw, 6rem);
}

.contact__intro {
  max-width: 48ch;
  color: var(--ink-soft);
  font-size: clamp(0.98rem, 2.2vw, 1.05rem);
  margin-bottom: 2.5rem;
}

.contact__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-strong);
}

.contact__item {
  border-bottom: 1px solid var(--line);
}

.contact__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 0;
  min-height: 52px;
  text-decoration: none;
  color: var(--ink);
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.contact__link:hover {
  color: var(--accent-copper);
}

.contact__field {
  color: var(--accent-copper);
  flex-shrink: 0;
}

.contact__value {
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 3.2vw, 1.15rem);
  text-align: right;
  overflow-wrap: anywhere;
}

@media (hover: hover) and (pointer: fine) {
  .contact__link:hover {
    padding-left: 0.35rem;
  }
}

@media (max-width: 560px) {
  .contact__link {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 1rem 0;
  }

  .contact__value {
    text-align: left;
  }
}
</style>
