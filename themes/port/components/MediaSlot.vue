<script setup>
/**
 * Placeholder for a GIF / video / AI-generated image.
 * When `src` is set, renders the media instead of the placeholder,
 * so swapping in the real asset is a one-line change.
 *
 * <MediaSlot kind="gif" title="..." prompt="..." />
 * <MediaSlot kind="gif" src="/media/weekend.gif" />
 */
defineProps({
  kind: { type: String, default: 'gif' }, // gif | video | ai-image | screenshot | qr
  title: { type: String, default: '' },
  prompt: { type: String, default: '' },
  src: { type: String, default: '' },
  height: { type: String, default: '16rem' },
})

const labels = {
  gif: '🎞️ GIF',
  video: '🎬 Video',
  'ai-image': '✨ AI-generated image',
  screenshot: '🖥️ Screenshot',
  qr: '🔳 QR code',
}
</script>

<template>
  <div class="media-slot" :style="{ height }">
    <template v-if="src">
      <video v-if="kind === 'video'" :src="src" autoplay loop muted playsinline class="media-asset" />
      <img v-else :src="src" class="media-asset" />
    </template>
    <div v-else class="media-placeholder">
      <span class="media-kind">{{ labels[kind] || kind }}</span>
      <p v-if="title" class="media-title">{{ title }}</p>
      <p v-if="prompt" class="media-prompt">“{{ prompt }}”</p>
    </div>
  </div>
</template>

<style scoped>
.media-slot {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.media-asset {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.media-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1.25rem 1.5rem;
  text-align: center;
  border-radius: 16px;
  border: 2px dashed #c4b5fd;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.10), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.10), transparent 55%),
    #ffffff;
}

.media-kind {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.media-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
  margin: 0;
}

.media-prompt {
  font-size: 0.8rem;
  color: #6b7280;
  font-style: italic;
  max-width: 34rem;
  margin: 0;
  line-height: 1.35;
}

.dark .media-placeholder {
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.18), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.18), transparent 55%),
    #1a1a2e;
  border-color: #6d28d9;
}
.dark .media-title { color: #f9fafb; }
.dark .media-prompt { color: #d1d5db; }
</style>
