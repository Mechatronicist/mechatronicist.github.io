<script setup lang="ts">
import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import 'vue3-calendar-heatmap/dist/style.css'
import HeatmapData from '@/data/heatmap.json';

interface HeatmapDataPoint {
	date: string;
	count: number;
}

const heatmap =  HeatmapData.map(d => ({
    date: d.date,
    count: d.contributionCount
}) as HeatmapDataPoint);
</script>

<template>
    <CalendarHeatmap 
        :values="heatmap" 
        :end-date="new Date()"
        :round="3"
        :tooltip="true"
        :dark-mode="true"
        :range-color="[ 'rgb(0, 0, 0)', 'rgb(0, 20, 0)', 'rgb(0, 100, 0)', 'rgb(0, 180, 0)', 'rgb(0, 220, 0)', 'rgb(0, 255, 0)' ]"
        >
    </CalendarHeatmap>
</template>

<style>
.vch__day__square {
	stroke-width: 1px;
	stroke: rgba(255, 255, 255, 0.12);
}
</style>