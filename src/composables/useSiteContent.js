import { computed, reactive } from 'vue'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase.js'
import { profile as fallbackProfile } from '../data/profile.js'
import { sortedProjects as fallbackProjects } from '../data/projects.js'
import { extraSections as fallbackSections } from '../data/sections.js'
import { mapProfile, mapProjects, mapSections } from '../content/normalize.js'

const TABLES = ['profile', 'skills', 'projects', 'extra_sections']

const state = reactive({
  profile: mapProfile(null, fallbackProfile.skills, fallbackProfile),
  projects: mapProjects(null, clone(fallbackProjects)),
  extraSections: mapSections(null, clone(fallbackSections)),
  source: 'local',
  status: 'idle',
  error: null,
  lastSyncedAt: null,
})

let started = false
let channel = null

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function applyRemote({ profileRow, skillRows, projectRows, sectionRows }) {
  state.profile = mapProfile(profileRow, skillRows, fallbackProfile)
  state.projects = mapProjects(projectRows, [])
  state.extraSections = mapSections(sectionRows, [])
  state.source = 'supabase'
  state.status = 'live'
  state.error = null
  state.lastSyncedAt = new Date().toISOString()
}

async function fetchAll(supabase) {
  const [profileRes, skillsRes, projectsRes, sectionsRes] = await Promise.all([
    supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
    supabase.from('skills').select('*').order('sort_order', { ascending: true }),
    supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('extra_sections')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true }),
  ])

  const firstError =
    profileRes.error || skillsRes.error || projectsRes.error || sectionsRes.error
  if (firstError) throw firstError

  applyRemote({
    profileRow: profileRes.data,
    skillRows: skillsRes.data ?? [],
    projectRows: projectsRes.data ?? [],
    sectionRows: sectionsRes.data ?? [],
  })
}

function subscribe(supabase) {
  if (channel) return
  channel = supabase
    .channel('portfolio-content')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profile' }, () => {
      fetchAll(supabase).catch(handleError)
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, () => {
      fetchAll(supabase).catch(handleError)
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
      fetchAll(supabase).catch(handleError)
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'extra_sections' }, () => {
      fetchAll(supabase).catch(handleError)
    })
    .subscribe()
}

function handleError(error) {
  state.status = state.source === 'supabase' ? 'live' : 'error'
  state.error = error?.message || String(error)
  console.warn('[site-content]', error)
}

/**
 * Shared site content. Local src/data files render immediately; if Supabase
 * env vars are present, they are replaced (and then kept in sync) by table rows.
 */
export function useSiteContent() {
  async function init() {
    if (started) return
    started = true

    if (!isSupabaseConfigured()) {
      state.source = 'local'
      state.status = 'local'
      return
    }

    const supabase = getSupabase()
    state.status = 'loading'
    try {
      await fetchAll(supabase)
      subscribe(supabase)
    } catch (error) {
      state.source = 'local'
      state.status = 'error'
      handleError(error)
    }
  }

  const navItems = computed(() => {
    const extras = state.extraSections.map((section) => ({
      id: section.slug,
      label: section.navLabel || section.title,
    }))
    return [
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      ...extras,
      { id: 'contact', label: 'Contact' },
    ]
  })

  function sectionsAt(placement) {
    return computed(() =>
      state.extraSections.filter((section) => section.placement === placement),
    )
  }

  return {
    profile: computed(() => state.profile),
    projects: computed(() => state.projects),
    extraSections: computed(() => state.extraSections),
    navItems,
    afterHero: sectionsAt('after_hero'),
    afterAbout: sectionsAt('after_about'),
    afterProjects: sectionsAt('after_projects'),
    source: computed(() => state.source),
    status: computed(() => state.status),
    error: computed(() => state.error),
    lastSyncedAt: computed(() => state.lastSyncedAt),
    tables: TABLES,
    init,
  }
}
