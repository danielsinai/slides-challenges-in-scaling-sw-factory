<script setup lang="ts">
import { avatarStyle, speakers } from '../utils/speakers'

// "Who we are": one wide card per speaker, photo on the left.
const order = ['Dor Meiri', 'Daniel Sinai']
const list = order.map(n => speakers.find(s => s.name === n)!).filter(Boolean)
</script>

<template>
  <div class="sc">
    <div v-for="s in list" :key="s.name" class="sc-card">
      <div class="sc-photo" role="img" :aria-label="s.name" :style="avatarStyle(s)">
        <span v-if="!s.avatar">{{ s.initials }}</span>
      </div>
      <div class="sc-body">
        <div class="sc-name">{{ s.name }}</div>
        <div class="sc-role">{{ s.role }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sc {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 5rem;
}

.sc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  text-align: center;
}

.sc-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background-color: var(--q-tint);
  background-repeat: no-repeat;
  font-size: 4rem;
  font-weight: 800;
  color: var(--q-acc);
}

.sc-name {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--q-ink);
}

.sc-role {
  margin-top: 0.4rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--q-muted);
}

</style>
