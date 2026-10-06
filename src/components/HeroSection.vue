<script setup>
import { useSiteContent } from '../composables/useSiteContent.js'
import { useSmoothScroll } from '../composables/useSmoothScroll.js'
import MediaEmbed from './MediaEmbed.vue'
import TechVisual from './TechVisual.vue'

const { profile } = useSiteContent()
const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="top" class="hero container">
    <!-- Top Grid Layout: Split Typography Left & Signature Visual Right -->
    <div class="hero__grid">
      <div class="hero__main">
        <div class="hero__eyebrow-row" data-reveal>
          <span class="mono-label hero__eyebrow">{{ profile.heroEyebrow }} {{ new Date().getFullYear() }}</span>
          <span class="hero__rev-badge mono-label">[REV-2026.04]</span>
        </div>

        <!-- Engineered Title with Annotation Lines -->
        <div class="hero__title-group" data-reveal data-reveal-delay="1">
          <!-- Measurement annotation line -->
          <div class="hero__dimension mono-label" aria-hidden="true">
            <span>|←</span>
            <span class="hero__dim-line"></span>
            <span class="hero__dim-val">312 px</span>
            <span class="hero__dim-line"></span>
            <span>→|</span>
          </div>

          <div class="hero__name-row">
            <h1 class="hero__name">{{ profile.fullName }}</h1>
            <div class="hero__tag-mark mono-label" aria-hidden="true">
              <span>───── 01</span>
              <span class="hero__tag-id">[AK-26]</span>
            </div>
          </div>
        </div>

        <!-- Main Focal Hero Visual on Mobile sits immediately after the title -->
        <div class="hero__visual hero__visual--mobile-focus" data-reveal data-reveal-delay="2">
          <!-- Render hero image or video if present, otherwise signature animated TechVisual -->
          <MediaEmbed
            v-if="profile.heroVideoUrl || profile.heroImageUrl"
            class="hero__media-hero"
            :image-url="profile.heroImageUrl"
            :video-url="profile.heroVideoUrl"
            :alt="profile.fullName"
          />
          <TechVisual v-else class="hero__tech-embed" />
        </div>

        <p class="hero__tagline" data-reveal data-reveal-delay="3">{{ profile.tagline }}</p>

        <div class="hero__actions" data-reveal data-reveal-delay="4">
          <button type="button" class="btn btn--primary" @click="scrollToSection('projects')">
            <span>View Projects</span>
            <span class="btn__arrow">→</span>
          </button>
          <button type="button" class="btn btn--ghost" @click="scrollToSection('contact')">
            <span>Get in Touch</span>
            <span class="btn__arrow">→</span>
          </button>
        </div>
      </div>

      <!-- Desktop Signature Visual Column -->
      <div class="hero__visual hero__visual--desktop-only" data-reveal data-reveal-delay="3">
        <MediaEmbed
          v-if="profile.heroVideoUrl || profile.heroImageUrl"
          class="hero__media-hero"
          :image-url="profile.heroImageUrl"
          :video-url="profile.heroVideoUrl"
          :alt="profile.fullName"
        />
        <TechVisual v-else class="hero__tech-embed" />
      </div>
    </div>

    <!-- Refined Bottom Information Strip -->
    <div class="spec-strip-wrap" data-reveal data-reveal-delay="5">
      <dl class="spec-strip">
        <div v-for="spec in profile.heroSpecs" :key="spec.field" class="spec-strip__col">
          <dt class="mono-label spec-strip__field">{{ spec.field }}</dt>
          <dd class="spec-strip__value">
            <span v-if="spec.field === 'STATUS'" class="status-indicator">
              <span class="status-dot"></span>
            </span>
            {{ spec.value }}
          </dd>
        </div>
      </dl>
      <div class="spec-strip__line" aria-hidden="true"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(1.75rem, 5vw, 4rem);
  padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
  min-height: calc(100vh - var(--header-h) - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.95fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
}

.hero__main {
  display: flex;
  flex-direction: column;
}

.hero__eyebrow-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.hero__rev-badge {
  color: var(--accent-copper);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
}

.hero__title-group {
  position: relative;
  margin-bottom: 0.5rem;
}

.hero__dimension {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink-faint);
  font-size: 0.68rem;
  margin-bottom: 0.2rem;
  opacity: 0.75;
}

.hero__dim-line {
  flex-grow: 1;
  max-width: 140px;
  height: 1px;
  background: var(--line);
}

.hero__name-row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.hero__name {
  font-size: clamp(2.6rem, 8vw, 6.2rem);
  letter-spacing: -0.02em;
  line-height: 0.98;
}

.hero__tag-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink-soft);
  font-size: 0.72rem;
}

.hero__tag-id {
  color: var(--accent-copper);
}

.hero__tagline {
  margin-top: 1.25rem;
  max-width: 44ch;
  font-size: clamp(1.02rem, 2.2vw, 1.2rem);
  color: var(--ink-soft);
  line-height: 1.5;
}

.hero__actions {
  display: flex;
  gap: 0.85rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.85rem 1.4rem;
  min-height: 46px;
  border-radius: 0;
  cursor: pointer;
  border: 1px solid var(--line-strong);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  position: relative;
}

.btn__arrow {
  transition: transform 0.2s ease;
}

.btn--primary {
  background: var(--ink);
  color: var(--bg-paper);
}

.btn--primary:hover {
  background: var(--accent-copper);
  border-color: var(--accent-copper);
  transform: translateY(-2px);
}

.btn--primary:hover .btn__arrow {
  transform: translateX(4px);
}

.btn--ghost {
  background: transparent;
  color: var(--ink);
}

.btn--ghost:hover {
  background: var(--ink);
  color: var(--bg-paper);
  transform: translateY(-2px);
}

.btn--ghost:hover .btn__arrow {
  transform: translateX(4px);
}

.btn:active {
  transform: translateY(0);
}

.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.hero__visual--mobile-focus {
  display: none; /* hidden on desktop, shown on mobile */
}

.hero__media-hero {
  width: 100%;
  max-width: 520px;
  border: 1px solid var(--line-strong);
  box-shadow: 0 8px 24px rgba(23, 23, 15, 0.08);
}

.hero__tech-embed {
  width: 100%;
}

/* Refined Bottom Information Strip */
.spec-strip-wrap {
  margin-top: clamp(2rem, 5vw, 3.5rem);
  width: 100%;
}

.spec-strip {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}

.spec-strip__col {
  padding: 0.5rem 1.25rem 0.5rem 0;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}

.spec-strip__col:last-child {
  border-right: none;
  padding-right: 0;
}

.spec-strip__field {
  color: var(--accent-copper);
  margin-bottom: 0.35rem;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
}

.spec-strip__value {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow-wrap: anywhere;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-signal);
  box-shadow: 0 0 6px rgba(79, 221, 118, 0.4);
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.spec-strip__line {
  height: 1px;
  background: var(--line-strong);
  margin-top: 0.75rem;
  width: 100%;
}

/* Comprehensive Responsive Media Queries for Mobile Devices */
@media (max-width: 920px) {
  .hero__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  .hero__visual--desktop-only {
    display: none;
  }

  .hero__visual--mobile-focus {
    display: flex;
    margin: 1.25rem 0;
    width: 100%;
    order: 2; /* Main focal image right after title */
  }

  .hero__tagline {
    margin-top: 0.75rem;
  }

  .spec-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spec-strip__col:nth-child(2) {
    border-right: none;
  }

  .spec-strip__col:nth-child(3),
  .spec-strip__col:nth-child(4) {
    border-top: 1px solid var(--line);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  .spec-strip__col:nth-child(3) {
    border-right: 1px solid var(--line);
  }
}

/* Mobile Devices (iPhone SE, iPhone 12/13/14/15/16, Android 320px-480px) */
@media (max-width: 480px) {
  .hero {
    padding-top: 1.25rem;
    min-height: auto;
  }

  .hero__name {
    font-size: clamp(2.2rem, 11vw, 3.2rem);
  }

  .hero__dim-line {
    max-width: 60px;
  }

  .hero__visual--mobile-focus {
    margin: 1rem 0;
  }

  .hero__media-hero {
    max-height: min(45vh, 280px);
    object-fit: cover;
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
    gap: 0.65rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .spec-strip {
    grid-template-columns: minmax(0, 1fr);
  }

  .spec-strip__col {
    border-right: none !important;
    border-top: 1px solid var(--line);
    padding: 0.5rem 0;
  }

  .spec-strip__col:first-child {
    border-top: none;
  }
}

/* Ultra-compact mobile screens (320px - 360px like iPhone SE 1st/2nd Gen) */
@media (max-width: 360px) {
  .hero__name {
    font-size: 2rem;
  }

  .hero__tagline {
    font-size: 0.95rem;
  }
}
</style>
