<script setup>
defineProps({
  center: { type: Boolean, default: false }
})
</script>

<template>
  <div class="tag-row" :class="{ center }">
    <slot />
  </div>
</template>

<style scoped>
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag-row.center {
  justify-content: center;
}
</style>
