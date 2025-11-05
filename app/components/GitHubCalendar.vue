<template>
  <div v-if="!loading">
      <div class="github-heatmap">
        <CalendarHeatmap
          :values="calendarData"
          :endDate="today"
          :round="5"
          :dark-mode="true"
          :tooltip="true"
          tooltip-unit="contributions"
          :max="maxCount">
          <template #vch__legend-left>
            <div class="custom-legend-left">
              <div v-if="success">
                <span>{{ totalCount }} Contributions</span>
              </div>
              <div v-else>
                <span>Can't get contributions</span>
              </div>
            </div>
          </template>
        </CalendarHeatmap>
    </div>
  </div>
  <div v-else>Loading contributions...</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import 'vue3-calendar-heatmap/dist/style.css'
import type { Commit } from '~/lib/github';

const props = defineProps<{
	username: string
  events: Commit[] | null | undefined
}>();


const calendarData = ref<{ date: Date | string; count: number }[]>([])
const today = new Date().toISOString().split('T')[0]
const maxCount = ref<number | undefined>(undefined)
const totalCount = ref<number>(0)
const loading = ref(true)
const success = ref(true)

async function loadHeatmap(events: Commit[]) {
  try {
    //const res = await fetch('/heatmap_test.json') //test data
    const res = await fetch(`https://raw.githubusercontent.com/${props.username}/${props.username}.github.io/master/public/heatmap.json`)
    if (!res.ok) throw new Error(`Failed to load: ${res.status}`)
    const graphData = await res.json()

    // Collect historic events
    const counts: Record<string, number> = {}
    for (const d of graphData) {
      const value = d.contributionCount ?? d.count ?? 0
      counts[d.date] = (counts[d.date] || 0) + value
      totalCount.value += value
    }

    // Add today's contributions from the REST events API
    if (events?.length) {
      for (const e of events) {
        const date = new Date(e.commit.author.date).toISOString().split('T')[0]
        if (date && date === today) {
          counts[date] = (counts[date] || 0) + 1
          totalCount.value += 1
        }
      }
    }

    // Convert to sorted array
    calendarData.value = Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    maxCount.value = Math.max(...calendarData.value.map((d) => d.count))
  } catch (err) {
    success.value = false
    console.error('Failed to load heatmap data', err)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.events,
  (newEvents) => {
    if (newEvents) loadHeatmap(newEvents)
  },
  { immediate: true }
)
</script>

<style scoped>
.github-heatmap {
  text-align: center;
  padding: 1rem 0;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #e4e4e4;
}

.loading {
  color: #aaa;
  font-style: italic;
}
</style>
