<template>
    <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg transition-all duration-300 hover:scale-105">
        <div class="flex items-center justify-between mb-4">
            <div class="text-2xl">{{ icon }}</div>
            <div v-if="trend" class="flex items-center space-x-1 text-sm px-2 py-1 rounded-full"
                :class="positive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'">
                <span>{{ trend }}</span>
            </div>
        </div>

        <div class="space-y-2">
            <p class="text-3xl font-bold text-light-text dark:text-dark-text">
                {{ value }}<span v-if="unit" class="text-lg">{{ unit }}</span>
            </p>
            <p class="text-light-text/60 dark:text-dark-text/60 text-sm">{{ title }}</p>
        </div>

        <div v-if="percentage" class="mt-4">
            <div class="flex justify-between text-xs text-light-text/60 dark:text-dark-text/60 mb-1">
                <span>Прогресс</span>
                <span>{{ percentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${percentage}%` }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    value: [Number, String],
    icon: String,
    trend: String,
    positive: Boolean,
    percentage: Number,
    unit: String
})
</script>