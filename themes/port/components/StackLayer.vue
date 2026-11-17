<script setup>
/**
 * One horizontal layer in an architecture stack.
 * <StackLayer label="Runtime" owner="AWS AgentCore" color="orange" verdict="Buy">
 *   <Chip>Runtime</Chip> ...
 * </StackLayer>
 */
defineProps({
  label: { type: String, required: true },
  owner: { type: String, default: '' },
  color: { type: String, default: 'blue' },
  verdict: { type: String, default: '' }, // Build | Buy | Own
  dim: { type: Boolean, default: false },
})
</script>

<template>
  <div class="stack-layer" :class="[`layer-${color}`, dim && 'dim']">
    <div class="layer-head">
      <span class="layer-label">{{ label }}</span>
      <span v-if="owner" class="layer-owner">{{ owner }}</span>
    </div>
    <div class="layer-body"><slot /></div>
    <span v-if="verdict" class="layer-verdict" :class="`verdict-${verdict.toLowerCase()}`">{{ verdict }}</span>
  </div>
</template>

<style scoped>
.stack-layer {
  display: grid;
  grid-template-columns: 11rem 1fr auto;
  align-items: center;
  gap: 1rem;
  border-radius: 14px;
  padding: 0.7rem 1.1rem;
  border: 1px solid transparent;
  transition: opacity 0.3s;
}
.stack-layer.dim { opacity: 0.35; }

.layer-head { display: flex; flex-direction: column; gap: 0.1rem; }
.layer-label { font-weight: 700; color: #1f2937; font-size: 0.95rem; }
.layer-owner { font-size: 0.72rem; color: #4b5563; font-weight: 500; }

.layer-body { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.layer-body :deep(span) {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 9999px;
  padding: 0.15rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1f2937;
}

.layer-verdict {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.25rem 0.8rem;
  border-radius: 9999px;
}
.verdict-build { background: #000; color: #fff; }
.verdict-buy { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; }
.verdict-own { background: #10b981; color: #fff; }

.layer-blue { background: #dbeafe; border-color: #bfdbfe; }
.layer-pink { background: #fce7f3; border-color: #fbcfe8; }
.layer-green { background: #dcfce7; border-color: #bbf7d0; }
.layer-yellow { background: #fef3c7; border-color: #fde68a; }
.layer-purple { background: #f3e8ff; border-color: #e9d5ff; }
.layer-orange { background: #ffedd5; border-color: #fed7aa; }

.dark .layer-blue { background: #1e3a5f; border-color: #1e40af; }
.dark .layer-pink { background: #4a1d3a; border-color: #9d174d; }
.dark .layer-green { background: #14352a; border-color: #166534; }
.dark .layer-yellow { background: #3d3418; border-color: #92400e; }
.dark .layer-purple { background: #2e1a47; border-color: #6b21a8; }
.dark .layer-orange { background: #3d2a1a; border-color: #c2410c; }
.dark .layer-label { color: #f9fafb; }
.dark .layer-owner { color: #d1d5db; }
.dark .layer-body :deep(span) { background: rgba(0, 0, 0, 0.35); color: #f9fafb; }
.dark .verdict-build { background: #fff; color: #000; }
</style>
