<script setup lang="ts">
import { computed } from 'vue'
import { useBoxes, wire } from '../utils/fx'

// A typical first factory line: ticket to merged PR.
// Each station leaves an artifact on the work item. Review is human, and
// comments send the work item back to Implement.
// Clicks: 1 Plan, 2 Build, 3 Review + the fix loop, 4 Release.
const stations = [
  { id: 's0', name: 'Intake', sub: 'work item', icon: 'i-carbon-task', tone: 'blue' as const, step: 0 },
  { id: 's1', name: 'Plan', sub: 'agent', icon: 'i-carbon-flow', tone: 'blue' as const, step: 1 },
  { id: 's2', name: 'Build', sub: 'agent', icon: 'i-carbon-build-tool', tone: 'blue' as const, step: 2 },
  { id: 's3', name: 'Review', sub: 'human', icon: 'i-carbon-user', tone: 'amber' as const, step: 3 },
  { id: 's4', name: 'Release', sub: 'workflow', icon: 'i-carbon-branch', tone: 'blue' as const, step: 4 },
]
const artifacts = [
  { id: 'a0', label: 'JIRA / Linear', icon: 'i-carbon-chat' },
  { id: 'a1', label: 'spec.md', icon: 'i-carbon-document' },
  { id: 'a2', label: 'PR', icon: 'i-carbon-pull-request' },
  { id: 'a3', label: 'Comments', icon: 'i-carbon-chat-launch' },
  { id: 'a4', label: 'Production checks', icon: 'i-carbon-checkmark-outline' },
]

const { root, reg, boxes, size } = useBoxes()

const wires = computed(() => {
  const b = boxes.value
  const out = []
  for (let i = 0; i < stations.length; i++) {
    const s = b[`s${i}`]
    const a = b[`a${i}`]
    // dashed, no arrowhead; hidden until the same click that reveals its station
    out.push({ d: s && a ? wire([[s.cx, s.b + 2], [a.cx, a.t - 2]]) : '', tone: 'purple' as const, step: stations[i].step || undefined, ghost: false, arrow: false, dash: '6 6' })
    // always push, even before measuring: FxWires binds v-click on mount, so the
    // list must keep the same length and order or steps get attached to the wrong path
    const n = b[`s${i + 1}`]
    if (i < stations.length - 1)
      out.push({ d: s && n ? wire([[s.r + 2, s.cy], [n.l - 5, n.cy]]) : '', step: stations[i + 1].step })
  }
  // the fix loop: out of Review's top, back into Implement's top
  const r = b.s3
  const im = b.s2
  out.push({
    d: r && im ? wire([[r.cx, r.t - 2], [r.cx, r.t - 30], [im.cx, im.t - 30], [im.cx, im.t - 6]]) : '',
    tone: 'amber' as const,
    step: 3,
    ghost: false,
  })
  return out
})

const loopLabel = computed(() => {
  const r = boxes.value.s3
  const im = boxes.value.s2
  return r && im ? { left: `${(r.cx + im.cx) / 2}px`, top: `${im.t - 30}px` } : { display: 'none' }
})
</script>

<template>
  <div ref="root" class="ui-line">
    <template v-for="(s, i) in stations" :key="s.id">
      <FxStation
        :ref="reg(s.id)"
        v-click="s.step || false"
        class="ul-station"
        :class="{ 'fx-ghost': s.step }"
        :style="{ gridColumn: i + 1 }"
        :name="s.name"
        :sub="s.sub"
        :icon="s.icon"
        :tone="s.tone"
        size="sm"
      />
      <FxContract
        :ref="reg(artifacts[i].id)"
        v-click="s.step || false"
        class="ul-artifact"
        :class="{ 'fx-ghost': s.step }"
        :style="{ gridColumn: i + 1 }"
        :label="artifacts[i].label"
        :icon="artifacts[i].icon"
      />
    </template>
    <FxWires :wires="wires" :w="size.w" :h="size.h" />
    <div v-click="3" class="ul-loop-label fx-reveal" :style="loopLabel">
      <span class="i-carbon-renew" />comments → agent fixes
    </div>
  </div>
</template>

<style scoped>
.ui-line {
  position: relative;
  flex: 1; /* fills the slide body and centres its rows vertically */
  align-content: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto auto;
  column-gap: 2.2rem;
  row-gap: 1.6rem;
}

.ul-station { grid-row: 1; }
.ul-artifact { grid-row: 2; min-height: 3.2rem; }

.ul-loop-label {
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.6rem;
  border: 1.5px solid var(--fx-amber);
  border-radius: 999px;
  background: var(--fx-card);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--fx-amber);
  white-space: nowrap;
}
.ui-line :deep(.fx-contract) {
  --tone: var(--q-acc);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35), 0 10px 24px -10px rgba(0, 0, 0, 0.7);
  background: var(--q-acc-soft);
  color: var(--q-acc);
}

.ui-line :deep(.fx-station) {
  width: min(9.5rem, 100%);
  min-height: 0;
  aspect-ratio: 1;
  justify-self: center;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 2px 6px rgba(0, 0, 0, 0.5), 0 18px 44px -10px rgba(0, 0, 0, 0.9);
}

/* no card border; Review keeps its orange ring because it marks the human step */
.ui-line :deep(.fx-station.fx-tone-blue) {
  border: none;
}
</style>
