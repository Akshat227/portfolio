import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section id is currently in view, for nav highlighting.
 * @param {string[]} sectionIds - ids of sections to observe, in document order
 * @param {number} offset - px offset from top to account for a sticky header
 */
export function useScrollSpy(sectionIds, offset = 96) {
  const activeId = ref(sectionIds[0] ?? '')

  const handleScroll = () => {
    const scrollPos = window.scrollY + offset

    let current = sectionIds[0]
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.offsetTop <= scrollPos) {
        current = id
      }
    }
    activeId.value = current
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { activeId }
}
