<script setup>
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import { sortedProjects } from '../data/projects.js'
</script>

<template>
  <section id="projects" class="projects container">
    <SectionHeading index="02" label="PROJECTS" title="Selected builds" />

    <p v-if="sortedProjects.length === 0" class="projects__empty">
      Nothing on the shelf yet — add entries to
      <code>src/data/projects.js</code> to fill this section.
    </p>

    <div v-else class="projects__grid">
      <ProjectCard
        v-for="(project, i) in sortedProjects"
        :key="project.id"
        :project="project"
        :index="i"
      />
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding-top: clamp(3rem, 7vw, 5rem);
  padding-bottom: clamp(3rem, 7vw, 5rem);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.projects__empty {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}
</style>
