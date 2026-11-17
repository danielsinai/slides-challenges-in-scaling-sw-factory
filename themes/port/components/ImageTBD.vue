<script setup>
defineProps({
  prompt: { type: String, required: true },
  height: { type: String, default: '18rem' }
})
</script>

<template>
  <div class="image-tbd" :style="{ height }">
    <div class="image-tbd-label">🎨 Image TBD</div>
    <div class="image-tbd-prompt">{{ prompt }}</div>
  </div>
</template>

<style scoped>
.image-tbd {
  margin-top: 1.5rem;
  border: 2px dashed #9ca3af;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3rem;
  text-align: center;
}

.image-tbd-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.image-tbd-prompt {
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #6b7280;
  max-width: 40rem;
}
</style>
