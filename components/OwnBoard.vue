<script setup lang="ts">
import { reactive } from 'vue'

// Closing slide: the six challenges as small cards around the main question
// (the slide's title, centered by .own-slide), each with a Build / Buy switch.
// Click a side to mark it while presenting.
// Positions are % of the slide, clockwise from the top left around the title.
const questions = [
  { q: 1, text: 'Can another team build a line?', x: 3, y: 5, r: -3 },
  { q: 2, text: 'What happens when it breaks?', x: 37.5, y: 4, r: 2 },
  { q: 3, text: 'Is this line worth it?', x: 72, y: 5, r: -2 },
  { q: 4, text: 'Who reviews all of this?', x: 72, y: 64, r: 2.5 },
  { q: 5, text: 'How do you put guardrails on it?', x: 37.5, y: 65, r: -2 },
  { q: 6, text: 'How does the factory keep improving?', x: 3, y: 64, r: 1.5 },
]
const pick = reactive<Record<number, 'build' | 'buy' | undefined>>({})
const toggle = (q: number, v: 'build' | 'buy') => { pick[q] = pick[q] === v ? undefined : v }
</script>

<template>
  <div class="ob">
    <div
      v-for="c in questions" :key="c.q" class="ob-card"
      :style="{ left: `${c.x}%`, top: `${c.y}%`, transform: `rotate(${c.r}deg)` }"
    >
      <span class="ob-q">C{{ c.q }}</span>
      <div class="ob-text">{{ c.text }}</div>
      <div class="ob-switch">
        <button :class="{ on: pick[c.q] === 'build' }" class="build" @click="toggle(c.q, 'build')">
          <span class="i-carbon-tools" />Build
        </button>
        <button :class="{ on: pick[c.q] === 'buy' }" class="buy" @click="toggle(c.q, 'buy')">
          <span class="i-carbon-shopping-cart" />Buy
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ob {
  position: absolute;
  inset: 0;
}

.ob-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 15rem;
  padding: 0.9rem 1rem 0.95rem;
  border: 1px solid var(--q-line);
  border-radius: 14px;
  background: var(--q-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 14px 30px -18px rgba(15, 23, 42, 0.45);
  text-align: left;
}

.ob-q {
  align-self: flex-start;
  padding: 0.1rem 0.6rem;
  border-radius: 7px;
  background: var(--q-acc-soft);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--q-acc);
}

.ob-text {
  min-height: 2.8rem;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.25;
  color: var(--q-ink);
}

.ob-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.15rem;
  border-radius: 9px;
  background: var(--q-tint);
}

.ob-switch button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.32rem 0;
  border: none;
  border-radius: 7px;
  background: transparent;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--q-muted);
  cursor: pointer;
}

.ob-switch button:focus-visible {
  outline: 2px solid var(--q-acc);
  outline-offset: 1px;
}

.ob-switch button.build.on {
  background: var(--q-ink);
  color: var(--q-card);
}

.ob-switch button.buy.on {
  background: var(--q-acc);
  color: #fff;
}
</style>
