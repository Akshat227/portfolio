/**
 * Smooth-scrolls to a section by id, accounting for the sticky header height.
 */
export function useSmoothScroll(offset = 72) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return { scrollToSection }
}
