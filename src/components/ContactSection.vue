<script setup>
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'

const contactLinks = [
  { label: 'Email', value: 'Send a message', href: profile.links.email },
  { label: 'GitHub', value: profile.links.github.replace('https://', ''), href: profile.links.github },
  { label: 'Website', value: profile.links.website.replace('https://', ''), href: profile.links.website },
].filter((l) => l.href)
</script>

<template>
  <section id="contact" class="contact container">
    <SectionHeading index="03" label="CONTACT" title="Let's build something" />

    <p class="contact__intro">
      Open to collaborations, internships, and hardware-flavored problems worth losing sleep over.
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
  padding-top: clamp(3rem, 7vw, 5rem);
  padding-bottom: clamp(4rem, 9vw, 6rem);
}

.contact__intro {
  max-width: 48ch;
  color: var(--ink-soft);
  font-size: 1.05rem;
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
  text-decoration: none;
  color: var(--ink);
  transition: color 0.15s ease;
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
  font-size: 1.15rem;
  text-align: right;
}
</style>
