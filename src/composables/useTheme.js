import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'
const theme = ref('light')

function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Shared dark/light theme state. Persists to localStorage and falls back to
 * the OS-level preference on first visit. Import this anywhere you need to
 * read or toggle the theme — state is shared across all callers.
 */
export function useTheme() {
  function init() {
    theme.value = getInitialTheme()
    applyTheme(theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(theme, (value) => {
    applyTheme(value)
    localStorage.setItem(STORAGE_KEY, value)
  })

  return { theme, toggleTheme, init }
}
