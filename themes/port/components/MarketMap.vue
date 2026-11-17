<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * The software factory stack, following Port's market landscape map
 * (Zohar Einy, "How to choose your software factory stack", Nov 2026):
 * DevOps platform at the base, the AI software factory platform on top,
 * AI infrastructure at the center. Port components get a Port badge,
 * AWS ones an AWS badge.
 *
 * With `build`, the whole stack is shown greyed out and lights up bottom up
 * (the slide needs `clicks: 2`): DevOps platform from the start,
 * click 1 AI infrastructure, click 2 Factory platform.
 */
const props = defineProps({ build: { type: Boolean, default: false } })
const { $clicks } = useSlideContext()
const show = n => computed(() => !props.build || $clicks.value >= n)
const showInfra = show(1)
const showPlatform = show(2)
const platform = [
  { name: 'Governance', port: true },
  { name: 'Human in the loop', port: true },
  { name: 'Orchestration', port: true },
  { name: 'AI registry', port: true },
  { name: 'SDLC context', port: true },
  { name: 'Code context' },
  { name: 'Engineering intelligence', port: true },
]
const infra = [
  { name: 'Models', ex: 'Claude, GPT, Gemini', aws: 'Bedrock' },
  { name: 'Agent harness', ex: 'Claude Code, Codex, Cursor', aws: 'AgentCore harness' },
  { name: 'Environments', ex: 'E2B, Modal, Daytona', aws: 'AgentCore' },
  { name: 'Cloud coding agents', ex: 'Claude Managed, Devin, Copilot' },
  { name: 'Proactive agents', ex: 'watch signals, start work' },
  { name: 'Vertical SDLC agents', ex: 'security, review, SRE', aws: 'AWS DevOps Agent' },
  { name: 'AI gateway', ex: 'Kong, LiteLLM, Portkey', aws: 'AgentCore Gateway' },
  { name: 'Observability and evals', ex: 'Langfuse, Braintrust, Arize' },
]
const devops = ['CI/CD', 'Observability', 'Incident management', 'IaC', 'Runtime and cloud', 'Issue tracking']
</script>

<template>
  <div class="mm">
    <div class="mm-platform" :class="{ 'mm-off': !showPlatform }">
      <div class="mm-zone-title mm-step" :class="{ 'mm-dim': !showPlatform }">
        <span>Factory platform</span>
      </div>
      <div class="mm-row mm-step" :class="{ 'mm-dim': !showPlatform }">
        <div v-for="b in platform" :key="b.name" class="mm-box mm-box-f">
          <span class="mm-name">{{ b.name }}</span>
          <span v-if="b.port" class="mm-badge port">Port</span>
        </div>
      </div>
      <div class="mm-infra mm-step" :class="{ 'mm-dim': !showInfra }">
        <div class="mm-zone-title small">
          <span>AI infrastructure</span>
        </div>
        <div class="mm-grid">
          <div v-for="b in infra" :key="b.name" class="mm-box mm-box-a">
            <span class="mm-name">{{ b.name }}</span>
            <span class="mm-ex">{{ b.ex }}</span>
            <span v-if="b.aws" class="mm-badge aws">{{ b.aws }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mm-devops">
      <span class="mm-devops-title">DevOps platform</span>
      <span v-for="d in devops" :key="d" class="mm-devops-item">{{ d }}</span>
    </div>
  </div>
</template>

<style scoped>
.mm { font-size: 0.878rem; }

.mm-step {
  transition: opacity 0.45s ease, filter 0.45s ease;
}

/* not reached yet: greyed out, a bit brighter than the Day one slide */
.mm-dim {
  opacity: 0.3;
  filter: grayscale(1);
}

.mm-platform {
  transition: background-color 0.45s ease, border-color 0.45s ease;
}

/* before click 2 the purple layer is grey */
.mm-platform.mm-off {
  background: #f3f4f6 !important;
  border-color: #e5e7eb !important;
}

.dark .mm-platform.mm-off {
  background: #1f2937 !important;
  border-color: #374151 !important;
}

.mm-platform {
  background: #ede4ff;
  border: 2px solid #c9b2ff;
  border-radius: 18px 18px 6px 6px;
  padding: 1.4rem 1.6rem 1.45rem;
}

.mm-zone-title {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
  font-size: 1.12rem;
  font-weight: 800;
  color: #3f2370;
}

.mm-zone-title.small {
  font-size: 0.952rem;
  margin-bottom: 1.1rem;
  color: #1f3a6d;
}

.mm-sub {
  font-size: 0.83rem;
  font-weight: 500;
  color: #55308f;
}

.mm-zone-title.small .mm-sub { color: #4b6390; }

.mm-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}

.mm-infra {
  padding: 1.25rem 1.3rem 1.3rem;
  border: 1.5px solid #bfd3fb;
  border-radius: 14px;
  background: #ffffff;
}

.mm-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem 0.8rem;
}

.mm-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.1rem;
  min-height: 3.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
}

.mm-box-f {
  align-items: center;
  padding-inline: 0.3rem;
  border: 1.5px solid #8b5cf6;
  background: #ffffff;
  text-align: center;
}

.mm-box-a {
  padding-top: 0.8rem;
  min-height: 3.8rem;
  padding-inline: 0.6rem;
  border: 1px solid #dbe6fb;
  background: #f5f8fe;
}

.mm-name {
  font-weight: 700;
  line-height: 1.15;
  color: #1f2937;
}

.mm-ex {
  font-size: 0.756rem;
  line-height: 1.15;
  color: #6b7280;
}

.mm-badge {
  position: absolute;
  top: -0.45rem;
  right: 0.4rem;
  padding: 0.05rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.671rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #fff;
  white-space: nowrap;
}

.mm-badge.port { background: linear-gradient(135deg, #3b82f6, #8b5cf6); }
.mm-badge.aws { background: #f97316; }

.mm-devops {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  white-space: nowrap;
  margin-top: 1.1rem;
  padding: 1.1rem 1.6rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 6px 6px 14px 14px;
  background: #eef2f6;
}

.mm-devops-title {
  margin-right: 0.3rem;
  font-size: 1rem;
  font-weight: 800;
  color: #1e293b;
}

.mm-devops-item {
  padding: 0.2rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #fff;
  font-weight: 600;
  color: #334155;
}

.mm-devops-note {
  margin-left: auto;
  font-size: 0.805rem;
  color: #64748b;
}

.dark .mm-platform { background: #2e1a47; border-color: #6b21a8; }
.dark .mm-zone-title, .dark .mm-sub { color: #e9d5ff; }
.dark .mm-zone-title.small, .dark .mm-zone-title.small .mm-sub { color: #bfdbfe; }
.dark .mm-infra { background: #111827; border-color: #1e40af; }
.dark .mm-box-f { background: #1c1c1f; }
.dark .mm-box-a { background: #1a2238; border-color: #1e3a8a; }
.dark .mm-name, .dark .mm-devops-title { color: #f9fafb; }
.dark .mm-ex, .dark .mm-devops-note { color: #d1d5db; }
.dark .mm-devops { background: #1f2937; border-color: #374151; }
.dark .mm-devops-item { background: #111827; border-color: #374151; color: #e5e7eb; }
</style>
