<script setup>
import { useScrollSpy } from '../composables/useScrollSpy.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'
import { useTheme } from '../composables/useTheme.js'
import { profile } from '../data/profile.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const { activeId } = useScrollSpy(sections.map((s) => s.id))
const { scrollToSection } = useSmoothScroll()
const { theme, toggleTheme, init } = useTheme()
init()

function goTo(id) {
  scrollToSection(id)
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <button class="header__mark" type="button" @click="scrollToSection('top')">
        <span class="header__mark-name">{{ profile.name }}</span>
        <span class="header__mark-dot" aria-hidden="true"></span>
      </button>

      <nav class="header__nav" aria-label="Primary">
        <button
          v-for="(section, i) in sections"
          :key="section.id"
          type="button"
          class="header__link mono-label"
          :class="{ 'header__link--active': activeId === section.id }"
          @click="goTo(section.id)"
        >
          <span class="header__link-index">0{{ i + 1 }}</span>
          {{ section.label }}
        </button>

        <button
          type="button"
          class="header__theme-toggle mono-label"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? 'LIGHT' : 'DARK' }}
        </button>
      </nav>
    </div>
    <hr class="hairline" />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--bg-paper);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header__mark {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--ink);
}

.header__mark-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-signal);
}

.header__nav {
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
}

.header__link {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4em;
  color: var(--ink-soft);
  padding: 0.25rem 0;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.header__link:hover {
  color: var(--ink);
}

.header__link--active {
  color: var(--ink);
  border-bottom-color: var(--accent-copper);
}

.header__link-index {
  color: var(--accent-copper);
}

.header__theme-toggle {
  background: none;
  border: 1px solid var(--line-strong);
  cursor: pointer;
  color: var(--ink-soft);
  padding: 0.35rem 0.6rem;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.header__theme-toggle:hover {
  color: var(--ink);
  border-color: var(--accent-copper);
}

@media (max-width: 560px) {
  .header__link-index {
    display: none;
  }
}
</style>
