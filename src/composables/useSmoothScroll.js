/**
 * Smooth-scrolls to a section by id, accounting for the sticky header height.
 */
export function useSmoothScroll() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const header = document.querySelector('.header')
    const offset = (header?.offsetHeight ?? 64) + 8
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return { scrollToSection }
}
