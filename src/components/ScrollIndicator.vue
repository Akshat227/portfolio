<script setup>
import { computed } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'
import { useSiteContent } from '../composables/useSiteContent.js'

const { navItems } = useSiteContent()
const sectionIds = computed(() => navItems.value.map((item) => item.id))
const { activeId } = useScrollSpy(sectionIds)
const { scrollToSection } = useSmoothScroll()

function handleNav(id) {
  scrollToSection(id)
}
</script>

<template>
  <nav class="scroll-nav" aria-label="Section shortcuts">
    <div class="scroll-nav__track">
      <button
        v-for="(item, idx) in navItems"
        :key="item.id"
        type="button"
        class="scroll-nav__item"
        :class="{ 'scroll-nav__item--active': activeId === item.id }"
        :aria-label="`Scroll to ${item.label}`"
        @click="handleNav(item.id)"
      >
        <span class="mono-label scroll-nav__num">0{{ idx + 1 }}</span>
        <span class="scroll-nav__bar" aria-hidden="true"></span>
        <span class="mono-label scroll-nav__label">{{ item.label }}</span>
      </button>
    </div>

    <div class="scroll-nav__hint mono-label" @click="handleNav(navItems[0]?.id || 'about')">
      <span>SCROLL</span>
      <span class="scroll-nav__arrow">↓</span>
      <span>001</span>
    </div>
  </nav>
</template>

<style scoped>
.scroll-nav {
  position: fixed;
  right: max(1.2rem, calc((100vw - 1200px) / 2 - 60px));
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
  pointer-events: none;
}

.scroll-nav__track {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.85rem;
  pointer-events: auto;
}

.scroll-nav__item {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--ink-faint);
  transition: color 0.25 ease;
}

.scroll-nav__item:hover {
  color: var(--ink);
}

.scroll-nav__num {
  font-size: 0.65rem;
  opacity: 0.7;
}

.scroll-nav__bar {
  display: block;
  width: 14px;
  height: 2px;
  background: var(--ink-faint);
  border-radius: 1px;
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease;
}

.scroll-nav__label {
  font-size: 0.65rem;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  white-space: nowrap;
}

.scroll-nav__item:hover .scroll-nav__label,
.scroll-nav__item--active .scroll-nav__label {
  opacity: 1;
  transform: translateX(0);
}

.scroll-nav__item--active .scroll-nav__bar {
  width: 32px;
  background: var(--accent-copper);
}

.scroll-nav__item--active {
  color: var(--ink);
}

.scroll-nav__hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 0.65rem;
  color: var(--ink-faint);
  cursor: pointer;
  pointer-events: auto;
  margin-top: 1rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.scroll-nav__hint:hover {
  color: var(--accent-copper);
  transform: translateY(2px);
}

.scroll-nav__arrow {
  animation: bounce 1.8s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

@media (max-width: 1024px) {
  .scroll-nav {
    display: none;
  }
}
</style>
