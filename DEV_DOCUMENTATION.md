# Portfolio Developer Documentation — Technical & Setup Guide

This document provides a comprehensive overview of the portfolio website's architecture, file structure ("what changes what"), dynamic reactivity engine, and step-by-step instructions for connecting and managing Supabase.

---

## 1. Architectural Overview & Technology Stack

The portfolio is built as an engineering-focused, high-performance web application:

- **Core Framework**: Vue 3 (Composition API with `<script setup>`) powered by Vite 8.
- **Styling Architecture**: Vanilla CSS Design System built with CSS custom properties (variables) for theme management (`--bg-paper`, `--bg-card`, `--ink`, `--accent-copper`, `--accent-signal`).
- **Aesthetic Direction**: High-end technical editorial look — engineering notebook × scientific instrument × precision website. Features a 48px subtle background grid, interactive vector circuit schematic (ESP32 / Core 01 block diagram), measurement annotations, mechanical hover states, and dark/light mode toggle.
- **Backend & Realtime Data Layer**: Supabase JS SDK (`@supabase/supabase-js`) providing PostgreSQL database persistence, Supabase Storage for video and image hosting, and WebSockets for real-time DOM content updates.
- **Resilient Hybrid Fallback Engine**: If Supabase environment variables are absent, the application runs seamlessly from static fallback data files (`src/data/`). When Supabase credentials are provided in `.env.local`, the site automatically pulls data from your live database and updates DOM text, images, and videos in real time.

---

## 2. Directory Structure & Code Map — "What Changes What"

Below is the directory map explaining the responsibility of every file in the project.

```text
portfolio/
├── .env.local                  # Environment variables for Supabase credentials (not committed)
├── index.html                  # HTML template with Google Fonts (Fraunces, Archivo, IBM Plex Mono)
├── package.json                # Project dependencies (@supabase/supabase-js, vue, vite)
├── vite.config.js              # Vite build setup with Vue plugin
├── DEV_DOCUMENTATION.md        # Comprehensive technical guide
└── src/
    ├── App.vue                 # Root component: layout structure, title watcher, reveal trigger
    ├── assets/
    │   └── main.css            # Global CSS variables, reset, 48px grid overlay, keyframe animations
    ├── components/
    │   ├── AppHeader.vue       # Header with branding logo, active scroll spy links, mobile menu, theme toggle
    │   ├── AppFooter.vue       # Footer with copyright, back-to-top button, and affiliation notes
    │   ├── HeroSection.vue     # Split hero layout: typography, annotations, CTA buttons, specs strip
    │   ├── TechVisual.vue      # Signature right-side animated vector schematic (ESP32 / Core 01 MCU)
    │   ├── ScrollIndicator.vue # Fixed right-margin section tracker (01, 02, 03) & scroll hint
    │   ├── AboutSection.vue    # Bio paragraphs, resume download link, categorized skill groups
    │   ├── ProjectsSection.vue # Projects shelf container rendering ProjectCard components
    │   ├── ProjectCard.vue     # Individual project card with tagline, description, tech stack, hover arrow
    │   ├── ExtraSection.vue    # Generic dynamic block component for custom section insertions
    │   ├── ContactSection.vue  # Contact links (Email, GitHub, Website) with hover animations
    │   ├── SectionHeading.vue  # Section header with FIG. index, label, title, interactive orange line
    │   └── MediaEmbed.vue      # Universal media component for rendering video (<video>) or images (<img>)
    ├── composables/
    │   ├── useSiteContent.js   # Central state manager: merges fallback data & Supabase realtime streams
    │   ├── useScrollSpy.js     # Tracks active section during scroll for nav highlighting
    │   ├── useSmoothScroll.js  # Smooth scroll utility function
    │   ├── useReveal.js        # IntersectionObserver reveal animations for [data-reveal] elements
    │   └── useTheme.js         # Light/Dark theme toggle with localStorage persistence
    ├── content/
    │   └── normalize.js        # Data mapping pipeline: converts raw Supabase/local rows to client models
    ├── data/
    │   ├── profile.js          # Local fallback for bio, skills, links, affiliation, and hero status
    │   ├── projects.js         # Local fallback list of project cards
    │   └── sections.js        # Local fallback array for custom extra section blocks
    └── lib/
        └── supabase.js         # Supabase client singleton setup reading VITE_SUPABASE_* env variables
```

### Summary Table: What to Edit to Change What

| What you want to change | File / Location to edit |
| :--- | :--- |
| **Personal Info / Bio / Affiliation / Status (Offline)** | `src/data/profile.js` |
| **Project Cards & GitHub Links (Offline)** | `src/data/projects.js` |
| **Live Database Content (Online)** | Supabase Tables (`profile`, `skills`, `projects`, `extra_sections`) |
| **Colors, Grid Background, Fonts** | `src/assets/main.css` |
| **Signature Circuit Schematic Visual** | `src/components/TechVisual.vue` |
| **Hero Title / Measurement Annotations** | `src/components/HeroSection.vue` |
| **Section Headings & Hover Lines** | `src/components/SectionHeading.vue` |
| **Supabase Connection & Client Config** | `src/lib/supabase.js` and `.env.local` |

---

## 3. DOM Content & Reactivity Engine

The portfolio uses a unified content manager (`src/composables/useSiteContent.js`).

1. **Initial Mount**: `useSiteContent()` immediately initializes reactive state with fallback data from `src/data/`. The page renders instantly without waiting for network requests.
2. **Supabase Verification**: It checks if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present.
   - If **absent**: Keeps using local data (`source: 'local'`).
   - If **present**: Executes `fetchAll(supabase)` to query PostgreSQL tables.
3. **Real-Time Websocket Channel**: Subscribes to Postgres change events via `supabase.channel('portfolio-content')`. Any `INSERT`, `UPDATE`, or `DELETE` in Supabase instantly triggers an automatic re-fetch and updates DOM text, image URLs, or video embeds without requiring a page refresh!

---

## 4. Step-by-Step Supabase Setup Guide

Follow this guide to connect your portfolio to Supabase and manage content dynamically.

### Step 4.1: Create a Supabase Project

1. Sign in to [Supabase](https://supabase.com/).
2. Click **New Project**, select an organization, name your project (e.g. `Akshat Portfolio`), and set a secure database password.
3. Once created, navigate to **Project Settings** -> **API**.
4. Copy your **Project URL** (e.g. `https://xyzcompany.supabase.co`) and **anon public key**.

---

### Step 4.2: Create Database Tables (SQL Schema)

In your Supabase Dashboard, go to the **SQL Editor** tab, click **New query**, paste the following SQL script, and click **Run**:

```sql
-- 1. Create Profile Table
CREATE TABLE public.profile (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL DEFAULT 'Akshat',
  full_name TEXT NOT NULL DEFAULT 'Akshat',
  role TEXT DEFAULT 'Engineering Student',
  tagline TEXT DEFAULT 'I design circuits, then argue with them until they behave.',
  location TEXT DEFAULT 'Greater Noida, IN',
  affiliation TEXT DEFAULT 'B.Tech · ECE — NIET',
  hero_status TEXT DEFAULT '● OPEN TO BUILD / 2026',
  hero_eyebrow TEXT DEFAULT 'PORTFOLIO — REV. 2026',
  bio JSONB DEFAULT '["I work where hardware meets software — logic gates, ESP32 boards, and C++.", "My track runs from ALU design and FPGA digital systems in the lab, to bare-metal embedded firmware."]'::jsonb,
  contact_intro TEXT DEFAULT 'Open to collaborations, internships, and hardware-flavored problems worth losing sleep over.',
  footer_note TEXT DEFAULT 'Co-Founded: The Alpha Ones | SoilGrid',
  about_title TEXT DEFAULT 'Who''s building this',
  projects_title TEXT DEFAULT 'Selected builds',
  contact_title TEXT DEFAULT 'Let''s build something',
  links JSONB DEFAULT '{"github": "https://github.com/Akshat227", "website": "https://taohq.org", "email": "https://mail.google.com/mail/?view=cm&fs=1&to=akshatkhare364@gmail.com"}'::jsonb,
  resume_url TEXT DEFAULT '',
  hero_image_url TEXT DEFAULT '',
  hero_video_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure only single row exists for profile id = 1
INSERT INTO public.profile (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 2. Create Skills Table
CREATE TABLE public.skills (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  label TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0
);

INSERT INTO public.skills (label, items, sort_order) VALUES
  ('Languages', '["C", "C++", "Python", "Rust", "Go", "JavaScript"]'::jsonb, 1),
  ('Hardware', '["ESP32", "Electronic Basics", "CAD", "Power Source Systems", "Analog", "Digital"]'::jsonb, 2),
  ('Tools', '["Linux (Arch)", "Onshape", "Vue", "Node.js", "raylib", "Blender", "AutoCAD", "Unity", "SDL2/3"]'::jsonb, 3);

-- 3. Create Projects Table
CREATE TABLE public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  stack JSONB DEFAULT '[]'::jsonb,
  github_url TEXT DEFAULT '',
  demo_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  pinned BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.projects (id, title, year, tagline, description, stack, github_url, pinned, sort_order) VALUES
  ('gatesim', 'GateSim', '2025', 'Real-time logic gate simulator, built in C++/raylib', 'A from-scratch digital logic simulator with bezier wire routing, custom node saving, truth-table and Karnaugh-map analysis, clock gates, and MUX/DMUX/encoder/decoder support.', '["C++", "raylib", "Digital Logic"]'::jsonb, 'https://github.com/Akshat227/gatesim', TRUE, 1),
  ('seo-energy-monitor', 'SEO — Smart Energy Monitor', '2025', 'ESP32 energy monitor with a native C++ desktop dashboard', 'An ESP32-based power monitoring rig paired with a raylib desktop dashboard for live readouts, running on Arch Linux end to end.', '["ESP32", "C++", "raylib", "Embedded"]'::jsonb, 'https://github.com/Akshat227/seo-energy-monitor', TRUE, 2),
  ('minimal-vcs', 'Minimal Version Control', '2024', 'A one-night Git-like VCS, built from first principles', 'A minimal version control system implemented in C++ using SHA-256 hashing, std::filesystem, and an LCS-based diff algorithm.', '["C++", "SHA-256", "Filesystem"]'::jsonb, 'https://github.com/Akshat227/minimal-vcs', FALSE, 3);

-- 4. Create Extra Sections Table (for dynamic custom page blocks)
CREATE TABLE public.extra_sections (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  nav_label TEXT,
  heading_index TEXT DEFAULT '•',
  heading_label TEXT,
  title TEXT NOT NULL,
  body TEXT,
  image_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  placement TEXT DEFAULT 'after_projects',
  published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0
);
```

---

### Step 4.3: Configure Row Level Security (RLS) & Policies

To ensure public site visitors can read your portfolio data safely without write access:

```sql
-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extra_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public Read Profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Extra Sections" ON public.extra_sections FOR SELECT USING (true);
```

---

### Step 4.4: Setup Storage Bucket for Images and Videos

1. In Supabase, go to **Storage** -> **New Bucket**.
2. Name the bucket `portfolio-media`.
3. Toggle **Public Bucket** to **ON** (so media URLs are publicly accessible).
4. Upload your project images (`.png`, `.webp`, `.jpg`) or video demos (`.mp4`, `.webm`).
5. Copy the public URL of any uploaded file and paste it into the `image_url` or `video_url` column of your `projects` or `profile` table!

---

### Step 4.5: Enable Supabase Realtime Updates

1. In Supabase, go to **Database** -> **Publications**.
2. Click on `supabase_realtime`.
3. Ensure the tables `profile`, `skills`, `projects`, and `extra_sections` are toggled **ON**.

---

### Step 4.6: Configure Local Environment Variables

Create a `.env.local` file in the root directory of your project (`d:\portfolio\.env.local`):

```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
```

Run `npm run dev` or `npm run build`. The site will connect to Supabase, display your dynamic database content, and update the DOM automatically whenever you edit rows in Supabase!

---

## 5. Verification & Testing Commands

To verify that the project builds cleanly for production:

```bash
# Start local development server
npm run dev

# Run production build validation
npm run build
```
