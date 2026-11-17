<script setup lang="ts">
import { ref } from 'vue'

// Full-bleed slide background for an AI-generated image (or GIF / video).
// Drop the file at public/<src> and it shows up. Until then the slide gets a
// dark "blueprint" scene with the generation prompt, so the deck still reads.
const props = withDefaults(defineProps<{
  src: string // e.g. /images/cover.png
  prompt: string
  kind?: 'image' | 'gif' | 'video'
  position?: string // object-position for the image
  promptAt?: 'right' | 'left' // where the TBD card sits
}>(), { kind: 'image', position: 'center', promptAt: 'right' })

const failed = ref(false)
const url = props.src.startsWith('/') ? import.meta.env.BASE_URL + props.src.slice(1) : props.src
</script>

<template>
  <div class="photo-bg">
    <video
      v-if="kind === 'video' && !failed" :src="url" autoplay loop muted playsinline
      :style="{ objectPosition: position }" @error="failed = true"
    />
    <img v-else-if="!failed" :src="url" alt="" :style="{ objectPosition: position }" @error="failed = true">
    <div v-else class="pb-scene">
      <div class="pb-grid" />
      <div class="pb-glow pb-glow-a" />
      <div class="pb-glow pb-glow-b" />
      <div class="pb-card" :class="`pb-${promptAt}`">
        <div class="pb-label">
          <span class="i-carbon-magic-wand-filled" />
          AI {{ kind }} TBD · <code>public{{ src }}</code>
        </div>
        <div class="pb-prompt">{{ prompt }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.photo-bg img,
.photo-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Placeholder scene: indigo night shift on the factory floor */
.pb-scene {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #1b1446 0%, #2a1a5e 45%, #0f172a 100%);
}

.pb-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(167, 139, 250, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 139, 250, 0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at 60% 60%, #000 30%, transparent 80%);
}

.pb-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.55;
}

.pb-glow-a {
  width: 28rem;
  height: 28rem;
  right: -4rem;
  top: 4rem;
  background: #7c3aed;
}

.pb-glow-b {
  width: 22rem;
  height: 22rem;
  left: 10rem;
  bottom: -8rem;
  background: #0891b2;
}

.pb-card {
  position: absolute;
  bottom: 1.6rem;
  max-width: 24rem;
  padding: 0.75rem 1rem;
  border: 1.5px dashed rgba(196, 181, 253, 0.6);
  border-radius: 12px;
  background: rgba(15, 12, 40, 0.55);
  backdrop-filter: blur(4px);
  color: #e9e5ff;
}

.pb-right { right: 1.6rem; }
.pb-left { left: 1.6rem; }

.pb-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c4b5fd;
}

.pb-label code {
  text-transform: none;
  letter-spacing: 0;
  background: none;
  color: #e9e5ff;
  font-size: 0.65rem;
}

.pb-prompt {
  font-family: 'Fira Code', monospace;
  font-size: 0.62rem;
  line-height: 1.4;
  color: rgba(233, 229, 255, 0.85);
}
</style>
