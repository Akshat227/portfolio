# Portfolio

A single-page portfolio built with **Vue 3** (`<script setup>`, Composition API) and **Vite**.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
├─ main.js                 # app entry
├─ App.vue                 # composes the page from sections
├─ assets/
│  └─ main.css              # design tokens (colors, type, spacing) + base styles
├─ components/
│  ├─ AppHeader.vue         # sticky nav, highlights active section
│  ├─ HeroSection.vue       # landing/hero
│  ├─ AboutSection.vue      # bio + skills
│  ├─ ProjectsSection.vue   # renders ProjectCard grid from data/projects.js
│  ├─ ProjectCard.vue       # single project "datasheet" card
│  ├─ ContactSection.vue    # contact links
│  ├─ AppFooter.vue
│  └─ SectionHeading.vue    # reusable numbered section heading
├─ composables/
│  ├─ useScrollSpy.js       # tracks active section while scrolling
│  └─ useSmoothScroll.js    # smooth-scroll to a section, header-aware
└─ data/
   ├─ profile.js            # your name, bio, skills, links — edit this
   └─ projects.js           # curated project list — edit this
```

## The two files you'll actually touch

**`src/data/profile.js`** — name, role, tagline, bio paragraphs, skill groups, and
contact links (GitHub, website, email).

**`src/data/projects.js`** — your project shelf. Nothing is pulled from GitHub
automatically; a project only shows up if you add an object for it here. Copy
an existing entry, fill in the fields, done. Delete an entry to remove it from
the site. The placeholder `githubUrl` values point at guessed repo paths —
double check and update these to your real repo URLs.

## Design

Off-white paper background, ink-black type, and a copper/circuit-trace accent —
project cards are styled like component datasheets (NO. / FEATURED / YEAR header,
pin-style tech-stack list) to nod at the hardware side of the work. Type pairs
a serif display face (Fraunces) with a monospace utility face (IBM Plex Mono)
for labels and data, and a grotesk (Archivo) for body text.

## Deploying

The build output in `dist/` after `npm run build` is fully static — drag it into
Netlify/Vercel, or point GitHub Pages at it.
