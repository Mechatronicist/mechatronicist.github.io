<template>
  <div class="github-heatmap">
    <CalendarHeatmap
    :values="calendarData"
      :endDate="endDate"
      :round="5"
      :dark-mode="true"
      :tooltip="true"
      tooltip-unit="contributions"
      :max="maxCount">
    <template #vch__legend-left>
      <div class="custom-legend-left">
        <span>{{ events?.length }} Contributions</span>
      </div>
    </template>
    </CalendarHeatmap>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import 'vue3-calendar-heatmap/dist/style.css'
import type { UserEvent } from '~/lib/github';

const props = defineProps<{
	username: string
  events: UserEvent[] | null | undefined
}>();


const calendarData = ref<{ date: Date | string; count: number }[]>([])
const endDate = new Date().toISOString().split('T')[0]
const maxCount = ref<number | undefined>(undefined)


function updateHeatmap(events: UserEvent[]) {
  if (!events?.length) return

  const counts: Record<string, number> = {}

  for (const e of events) {
    const date = new Date(e.created_at).toISOString().split('T')[0]
    if(!date) continue
    counts[date] = (counts[date] || 0) + 1
  }

  calendarData.value = Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))

  maxCount.value = Math.max(...calendarData.value.map((d) => d.count))
}

// ✅ react to both initial mount and later updates
watch(
  () => props.events,
  (newEvents) => {
    if (newEvents) updateHeatmap(newEvents)
  },
  { immediate: true } // run once on mount even if already populated
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
