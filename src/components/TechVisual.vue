<script setup>
import { ref } from 'vue'

const activePin = ref(null)
const systemStatus = ref('SYSTEM ONLINE')

function onPinHover(pinName) {
  activePin.value = pinName
}

function onPinLeave() {
  activePin.value = null
}
</script>

<template>
  <div class="tech-visual" aria-hidden="true">
    <!-- Outer framing box with technical corner ticks -->
    <div class="tech-visual__frame">
      <div class="tech-visual__corner tech-visual__corner--tl">+</div>
      <div class="tech-visual__corner tech-visual__corner--tr">+</div>
      <div class="tech-visual__corner tech-visual__corner--bl">+</div>
      <div class="tech-visual__corner tech-visual__corner--br">+</div>

      <!-- Tech header mark -->
      <div class="tech-visual__meta mono-label">
        <span>SCHEMATIC // REV-2026.04</span>
        <span class="tech-visual__freq">240 MHz · DUAL-CORE</span>
      </div>

      <!-- Main SVG schematic diagram -->
      <svg
        class="tech-visual__svg"
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Animated gradient for traveling signal pulse -->
          <linearGradient id="signal-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--accent-copper)" stop-opacity="0.1" />
            <stop offset="50%" stop-color="var(--accent-copper)" stop-opacity="1" />
            <stop offset="100%" stop-color="var(--accent-copper)" stop-opacity="0.2" />
          </linearGradient>
          
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--line)" stroke-width="0.5" stroke-opacity="0.4" />
          </pattern>
        </defs>

        <!-- Background grid snippet inside visual box -->
        <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.4" />

        <!-- Outer PCB outline traces -->
        <path
          d="M 20 40 L 500 40 L 500 340 L 20 340 Z"
          stroke="var(--line-strong)"
          stroke-width="1"
          stroke-dasharray="8 4"
          opacity="0.5"
        />

        <!-- Signal Bus / Wire lines -->
        <!-- CLK Line -->
        <g class="wire-group" @mouseenter="onPinHover('CLK')" @mouseleave="onPinLeave">
          <text x="35" y="115" class="svg-text mono">CLK ─────────────────►</text>
          <path
            d="M 40 120 L 190 120"
            stroke="var(--accent-copper)"
            stroke-width="1.5"
            class="signal-line"
          />
          <circle cx="190" cy="120" r="3" fill="var(--accent-copper)" />
        </g>

        <!-- DATA Line -->
        <g class="wire-group" @mouseenter="onPinHover('DATA')" @mouseleave="onPinLeave">
          <text x="35" y="215" class="svg-text mono">DATA ────────────────►</text>
          <path
            d="M 40 220 L 190 220"
            stroke="var(--line-strong)"
            stroke-width="1.5"
            class="signal-line signal-line--alt"
          />
          <circle cx="190" cy="220" r="3" fill="var(--line-strong)" />
        </g>

        <!-- Central ESP32 / CORE 01 Chip Body -->
        <rect
          x="190"
          y="70"
          width="210"
          height="210"
          rx="2"
          fill="var(--bg-card)"
          stroke="var(--line-strong)"
          stroke-width="1.5"
          class="chip-body"
        />

        <!-- Inner MCU Block -->
        <rect
          x="260"
          y="140"
          width="110"
          height="80"
          rx="1"
          fill="var(--bg-paper)"
          stroke="var(--accent-copper)"
          stroke-width="1"
          stroke-dasharray="4 2"
        />
        <text x="315" y="185" text-anchor="middle" class="svg-text svg-text--bold mono">MCU</text>
        <text x="315" y="202" text-anchor="middle" class="svg-text svg-text--sub mono">32-BIT</text>

        <!-- Header Chip Title -->
        <text x="210" y="100" class="svg-text svg-text--title mono">ESP32 / CORE 01</text>
        
        <!-- Status Indicator Dot inside chip -->
        <circle cx="375" cy="100" r="4" fill="var(--accent-signal)" class="pulse-dot" />
        <circle cx="375" cy="100" r="8" fill="var(--accent-signal)" opacity="0.25" class="pulse-ring" />

        <!-- Internal logic traces inside ESP32 block -->
        <path d="M 210 120 L 260 120" stroke="var(--accent-copper)" stroke-width="1" />
        <path d="M 210 220 L 260 220" stroke="var(--line-strong)" stroke-width="1" />
        
        <path d="M 315 70 L 315 140" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="2 2" />
        <path d="M 315 220 L 315 280" stroke="var(--line-strong)" stroke-width="1.5" />

        <!-- Bottom Connection Bus -->
        <path d="M 295 280 L 295 320 L 440 320" stroke="var(--line-strong)" stroke-width="1" />
        <circle cx="295" cy="280" r="3" fill="var(--line-strong)" />

        <!-- Bottom Label -->
        <g class="status-group">
          <rect x="235" y="305" width="130" height="26" rx="2" fill="var(--bg-paper)" stroke="var(--line)" />
          <circle cx="250" cy="318" r="3.5" fill="var(--accent-signal)" class="pulse-dot" />
          <text x="262" y="322" class="svg-text mono svg-text--status">{{ activePin ? `PIN: ${activePin}` : systemStatus }}</text>
        </g>

        <!-- Right Side Auxiliary Pins (IO_01 / IO_02) -->
        <path d="M 400 130 L 450 130" stroke="var(--line-strong)" stroke-width="1" />
        <text x="458" y="134" class="svg-text mono svg-text--small">IO_01</text>

        <path d="M 400 170 L 450 170" stroke="var(--line-strong)" stroke-width="1" />
        <text x="458" y="174" class="svg-text mono svg-text--small">IO_02</text>

        <path d="M 400 230 L 450 230" stroke="var(--accent-copper)" stroke-width="1" />
        <text x="458" y="234" class="svg-text mono svg-text--small">TX/RX</text>

        <!-- Oscilloscope / Waveform Mini Diagram at Bottom Left -->
        <g class="waveform-group">
          <path d="M 40 280 L 60 280 L 60 260 L 90 260 L 90 280 L 120 280 L 120 260 L 150 260 L 150 280 L 170 280" stroke="var(--accent-copper)" stroke-width="1" fill="none" opacity="0.8" />
          <text x="40" y="298" class="svg-text mono svg-text--sub">SQ_WAVE // 3.3V</text>
        </g>
      </svg>

      <!-- Technical footer details -->
      <div class="tech-visual__footer mono-label">
        <span>LOC: 28.4744° N / 77.5040° E</span>
        <span>STATUS: ACTIVE</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-visual {
  width: 100%;
  max-width: 520px;
  position: relative;
  user-select: none;
}

.tech-visual__frame {
  position: relative;
  border: 1px solid var(--line);
  background: var(--bg-card);
  padding: 0.85rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.tech-visual:hover .tech-visual__frame {
  border-color: var(--line-strong);
}

.tech-visual__corner {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-copper);
  line-height: 1;
  opacity: 0.6;
}

.tech-visual__corner--tl { top: 4px; left: 6px; }
.tech-visual__corner--tr { top: 4px; right: 6px; }
.tech-visual__corner--bl { bottom: 4px; left: 6px; }
.tech-visual__corner--br { bottom: 4px; right: 6px; }

.tech-visual__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0 0.2rem;
  font-size: 0.68rem;
  color: var(--ink-faint);
}

.tech-visual__freq {
  color: var(--accent-copper);
}

.tech-visual__svg {
  width: 100%;
  height: auto;
  display: block;
}

.svg-text {
  font-family: var(--font-mono);
  fill: var(--ink);
  font-size: 10px;
}

.svg-text--bold {
  font-weight: 600;
  fill: var(--accent-copper);
  font-size: 12px;
}

.svg-text--title {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.05em;
  fill: var(--ink);
}

.svg-text--sub {
  font-size: 8px;
  fill: var(--ink-faint);
}

.svg-text--small {
  font-size: 8.5px;
  fill: var(--ink-soft);
}

.svg-text--status {
  font-size: 9px;
  font-weight: 500;
  fill: var(--ink);
  letter-spacing: 0.06em;
}

.wire-group {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.wire-group:hover {
  opacity: 1;
}

.signal-line {
  stroke-dasharray: 8 4;
  animation: dash 12s linear infinite;
}

.signal-line--alt {
  stroke-dasharray: 6 3;
  animation: dash 8s linear infinite reverse;
}

@keyframes dash {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.pulse-dot {
  animation: pulse 2s ease-in-out infinite alternate;
}

.pulse-ring {
  animation: pulseRing 2s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes pulseRing {
  0% { opacity: 0.4; r: 6px; }
  100% { opacity: 0; r: 12px; }
}

.tech-visual__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 0.2rem;
  font-size: 0.65rem;
  color: var(--ink-faint);
}
</style>
