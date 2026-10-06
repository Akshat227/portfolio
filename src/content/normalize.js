function asText(value, fallback = '') {
  if (value == null) return fallback
  return String(value)
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String)
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

function asParagraphs(value, fallback) {
  if (Array.isArray(value) && value.length) return value.map(String)
  if (typeof value === 'string' && value.trim()) return [value]
  return fallback
}

function asSpecs(value, fallback) {
  if (!Array.isArray(value) || value.length === 0) return fallback
  return value
    .map((row) => ({
      field: asText(row.field || row.label).toUpperCase(),
      value: asText(row.value),
    }))
    .filter((row) => row.field && row.value)
}

export function defaultHeroSpecs(profile) {
  return [
    { field: 'ROLE', value: profile.role },
    { field: 'BASE', value: profile.location },
    { field: 'AFFIL', value: profile.affiliation },
    { field: 'STATUS', value: profile.heroStatus },
  ].filter((row) => row.value)
}

export function mapSkills(rows, fallback) {
  if (!Array.isArray(rows) || rows.length === 0) return fallback
  return rows.map((row) => ({
    label: asText(row.label),
    items: asList(row.items),
  }))
}

export function mapProfile(row, skills, fallback) {
  if (!row) {
    return {
      ...fallback,
      skills: skills?.length ? mapSkills(skills, fallback.skills) : fallback.skills,
      heroSpecs: fallback.heroSpecs?.length ? fallback.heroSpecs : defaultHeroSpecs(fallback),
    }
  }

  const mapped = {
    name: asText(row.name, fallback.name),
    fullName: asText(row.full_name, fallback.fullName),
    role: asText(row.role, fallback.role),
    tagline: asText(row.tagline, fallback.tagline),
    location: asText(row.location, fallback.location),
    affiliation: asText(row.affiliation, fallback.affiliation),
    bio: asParagraphs(row.bio, fallback.bio),
    heroStatus: asText(row.hero_status, fallback.heroStatus),
    heroEyebrow: asText(row.hero_eyebrow, fallback.heroEyebrow),
    contactIntro: asText(row.contact_intro, fallback.contactIntro),
    footerNote: asText(row.footer_note, fallback.footerNote),
    aboutTitle: asText(row.about_title, fallback.aboutTitle),
    projectsTitle: asText(row.projects_title, fallback.projectsTitle),
    contactTitle: asText(row.contact_title, fallback.contactTitle),
    links: {
      github: asText(row.links?.github, fallback.links.github),
      website: asText(row.links?.website, fallback.links.website),
      email: asText(row.links?.email, fallback.links.email),
    },
    resumeUrl: asText(row.resume_url, fallback.resumeUrl),
    heroImageUrl: asText(row.hero_image_url, fallback.heroImageUrl),
    heroVideoUrl: asText(row.hero_video_url, fallback.heroVideoUrl),
    skills: mapSkills(skills, fallback.skills),
  }

  mapped.heroSpecs = asSpecs(row.hero_specs, defaultHeroSpecs(mapped))
  return mapped
}

export function mapProject(row) {
  return {
    id: asText(row.id),
    order: Number(row.sort_order ?? row.order ?? 0),
    pinned: Boolean(row.pinned),
    title: asText(row.title),
    year: asText(row.year),
    tagline: asText(row.tagline),
    description: asText(row.description),
    stack: asList(row.stack),
    githubUrl: asText(row.github_url ?? row.githubUrl),
    demoUrl: asText(row.demo_url ?? row.demoUrl),
    imageUrl: asText(row.image_url ?? row.imageUrl),
    videoUrl: asText(row.video_url ?? row.videoUrl),
  }
}

export function mapProjects(rows, fallback) {
  if (!Array.isArray(rows)) return fallback
  return rows.map(mapProject).sort((a, b) => a.order - b.order)
}

export function mapSection(row) {
  return {
    id: asText(row.id),
    slug: asText(row.slug),
    navLabel: asText(row.nav_label ?? row.navLabel, row.title),
    headingIndex: asText(row.heading_index ?? row.headingIndex),
    headingLabel: asText(row.heading_label ?? row.headingLabel),
    title: asText(row.title),
    body: asText(row.body),
    imageUrl: asText(row.image_url ?? row.imageUrl),
    videoUrl: asText(row.video_url ?? row.videoUrl),
    placement: asText(row.placement, 'after_projects'),
    order: Number(row.sort_order ?? 0),
  }
}

export function mapSections(rows, fallback) {
  if (!Array.isArray(rows)) return fallback
  return rows.map(mapSection).sort((a, b) => a.order - b.order)
}
