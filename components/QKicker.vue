<script setup lang="ts">
// "Challenge 3 of 6" above each challenge slide, with a dot per challenge.
withDefaults(defineProps<{ n: number, total?: number }>(), { total: 6 })
</script>

<template>
  <div class="qk">
    <span class="qk-label">Challenge {{ n }} of {{ total }}</span>
    <span class="qk-dots">
      <span v-for="i in total" :key="i" class="qk-dot" :class="{ done: i < n, now: i === n }" />
    </span>
  </div>
</template>

<style scoped>
.qk {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.35rem;
}

.qk-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--q-acc);
}

.qk-dots {
  display: flex;
  gap: 0.3rem;
}

.qk-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--q-line);
}

.qk-dot.done { background: color-mix(in srgb, var(--q-acc) 40%, var(--q-card)); }
.qk-dot.now { width: 1.2rem; border-radius: 999px; background: var(--q-acc); }
</style>
