<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'
import { useTheme } from '../composables/useTheme.js'
import { useSiteContent } from '../composables/useSiteContent.js'

const { profile, navItems } = useSiteContent()
const menuOpen = ref(false)
const sectionIds = computed(() => navItems.value.map((item) => item.id))
const { activeId } = useScrollSpy(sectionIds)
const { scrollToSection } = useSmoothScroll()
const { theme, toggleTheme, init } = useTheme()
init()

function goTo(id) {
  menuOpen.value = false
  scrollToSection(id)
}

function onResize() {
  if (window.innerWidth > 720) menuOpen.value = false
}

onMounted(() => window.addEventListener('resize', onResize, { passive: true }))
onUnmounted(() => window.removeEventListener('resize', onResize))

watch(menuOpen, (open) => {
  document.body.classList.toggle('nav-lock', open)
})
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <button class="header__mark" type="button" @click="goTo('top')">
        <span class="header__mark-name">{{ profile.name }}</span>
        <span class="header__mark-dot" aria-hidden="true"></span>
      </button>

      <div class="header__tools">
        <button
          type="button"
          class="header__theme-toggle mono-label"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? 'LIGHT' : 'DARK' }}
        </button>
        <button
          type="button"
          class="header__menu-btn"
          :aria-expanded="menuOpen"
          aria-controls="primary-nav"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span class="header__menu-bar" aria-hidden="true"></span>
          <span class="header__menu-bar" aria-hidden="true"></span>
        </button>
      </div>

      <nav
        id="primary-nav"
        class="header__nav"
        :class="{ 'header__nav--open': menuOpen }"
        aria-label="Primary"
      >
        <button
          v-for="(section, i) in navItems"
          :key="section.id"
          type="button"
          class="header__link mono-label"
          :class="{ 'header__link--active': activeId === section.id }"
          @click="goTo(section.id)"
        >
          <span class="header__link-index">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ section.label }}
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
  padding-top: env(safe-area-inset-top);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: var(--header-h);
  height: var(--header-h);
}

.header__mark {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 0;
  font-family: var(--font-display);
  font-size: clamp(1rem, 3.4vw, 1.1rem);
  color: var(--ink);
  transition: opacity 0.2s ease;
}

.header__mark:hover {
  opacity: 0.72;
}

.header__mark-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header__mark-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--accent-signal);
}

.header__tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2.5vw, 2rem);
}

.header__link {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4em;
  color: var(--ink-soft);
  padding: 0.35rem 0;
  min-height: 44px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
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
  padding: 0.4rem 0.6rem;
  min-height: 36px;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.header__theme-toggle:hover {
  color: var(--ink);
  border-color: var(--accent-copper);
}

.header__menu-btn {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--line-strong);
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.header__menu-bar {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.header__menu-btn[aria-expanded='true'] .header__menu-bar:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.header__menu-btn[aria-expanded='true'] .header__menu-bar:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

@media (max-width: 720px) {
  .header__menu-btn {
    display: flex;
  }

  .header__inner {
    flex-wrap: wrap;
    height: auto;
    min-height: var(--header-h);
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  }

  .header__nav {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.35rem 0 0.75rem;
  }

  .header__nav--open {
    display: flex;
  }

  .header__link {
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid var(--line);
  }

  .header__link--active {
    border-bottom-color: var(--accent-copper);
  }
}

@media (min-width: 721px) {
  .header__tools {
    order: 3;
  }

  .header__nav {
    order: 2;
    margin-left: auto;
    margin-right: 0.85rem;
  }

  .header__link-index {
    display: inline;
  }
}

@media (max-width: 560px) {
  .header__link-index {
    display: inline;
  }
}
</style>
