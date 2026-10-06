import { unref, ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * Tracks which section id is currently in view, for nav highlighting.
 * @param {string[] | import('vue').Ref<string[]>} sectionIds
 * @param {number} offset - px offset from top to account for a sticky header
 */
export function useScrollSpy(sectionIds, offset = 96) {
  const activeId = ref('')

  const ids = () => unref(sectionIds) ?? []

  const handleScroll = () => {
    const list = ids()
    if (!list.length) return
    const scrollPos = window.scrollY + offset

    let current = list[0]
    for (const id of list) {
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

  watch(sectionIds, handleScroll, { deep: true })

  return { activeId }
}
