<script setup lang="ts">
import { avatarStyle, speakers } from '../utils/speakers'

// Thank-you slide: each speaker as a small avatar with their LinkedIn.
const handle = (url = '') => url.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '').replace(/\/$/, '')
</script>

<template>
  <div class="speaker-links">
    <a
      v-for="s in speakers" :key="s.name" :href="s.linkedin || undefined" target="_blank" rel="noopener"
      class="sl-speaker" :class="`sl-${s.tone}`"
    >
      <span class="sl-avatar" role="img" :aria-label="s.name" :style="avatarStyle(s)"><span v-if="!s.avatar" class="sl-initials">{{ s.initials }}</span></span>
      <span>
        <span class="sl-name">{{ s.name }}</span>
        <span v-if="s.linkedin" class="sl-link"><span class="i-carbon-logo-linkedin" />{{ handle(s.linkedin) }}</span>
      </span>
    </a>
  </div>
</template>

<style scoped>
.speaker-links {
  display: flex;
  gap: 2.5rem;
}

.sl-speaker {
  --tone: var(--fx-blue);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: inherit;
  text-decoration: none !important;
  border: none !important;
}

.sl-purple { --tone: var(--fx-purple); }

.sl-avatar {
  flex: none;
  width: 3.75rem;
  height: 3.75rem;
  border: 3px solid var(--tone);
  border-radius: 50%;
  background-color: #fff;
  background-repeat: no-repeat;
}

.sl-avatar { display: flex; align-items: center; justify-content: center; }
.sl-initials { font-weight: 800; color: var(--tone); }

.sl-name {
  display: block;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--fx-text);
}

.sl-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--fx-muted);
}

.sl-link span {
  font-size: 1rem;
  color: #0a66c2;
}
</style>
