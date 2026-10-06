<script setup>
import { useSiteContent } from './composables/useSiteContent.js'
import ExtraSection from './components/ExtraSection.vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import { useReveal } from './composables/useReveal.js'

import { watch } from 'vue'

const { profile, extraSections, projects, afterHero, afterAbout, afterProjects, init } =
  useSiteContent()
init()
useReveal(() => [extraSections.value, projects.value, profile.value])

watch(
  () => profile.value.fullName,
  (name) => {
    if (name) document.title = `${name} — Portfolio`
  },
  { immediate: true },
)
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <ExtraSection v-for="section in afterHero" :key="section.id" :section="section" />
    <AboutSection />
    <ExtraSection v-for="section in afterAbout" :key="section.id" :section="section" />
    <ProjectsSection />
    <ExtraSection v-for="section in afterProjects" :key="section.id" :section="section" />
    <ContactSection />
  </main>
  <AppFooter />
</template>
