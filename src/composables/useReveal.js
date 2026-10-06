import { nextTick, onMounted, onUnmounted, watch } from 'vue'

/**
 * Adds .is-revealed to [data-reveal] elements as they enter the viewport.
 * Re-scans after content refreshes from Supabase so new DOM nodes animate too.
 */
export function useReveal(getWatchSource) {
  let observer = null

  function revealAll(nodes) {
    nodes.forEach((el) => el.classList.add('is-revealed'))
  }

  async function observe() {
    await nextTick()
    const nodes = document.querySelectorAll('[data-reveal]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      revealAll(nodes)
      return
    }

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      )
    }

    nodes.forEach((el) => {
      if (el.classList.contains('is-revealed')) return
      observer.observe(el)
    })
  }

  onMounted(() => {
    observe()
    if (typeof getWatchSource === 'function') {
      watch(getWatchSource, observe, { deep: true })
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { observe }
}
