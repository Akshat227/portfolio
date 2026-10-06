<script setup>
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import { useSiteContent } from '../composables/useSiteContent.js'
import { useReveal } from '../composables/useReveal.js'

const { profile, projects } = useSiteContent()
useReveal(() => projects.value)
</script>

<template>
  <section id="projects" class="projects container" data-reveal>
    <SectionHeading index="02" label="PROJECTS" :title="profile.projectsTitle" />

    <p v-if="projects.length === 0" class="projects__empty">
      Nothing on the shelf yet. Add rows to the
      <code>projects</code> table in Supabase, or to
      <code>src/data/projects.js</code> for the local fallback.
    </p>

    <div v-else class="projects__grid">
      <ProjectCard
        v-for="(project, i) in projects"
        :key="project.id"
        :project="project"
        :index="i"
      />
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding-top: clamp(2.5rem, 7vw, 5rem);
  padding-bottom: clamp(2.5rem, 7vw, 5rem);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1.25rem;
}

.projects__empty {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}
</style>
