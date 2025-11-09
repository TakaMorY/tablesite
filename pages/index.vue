<template>
    <div class="max-w-6xl mx-auto px-4 py-8">
        <!-- AI Ассистент -->
        <AIAssistant />

        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Notion<span class="text-purple-600">Purple</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Минималистичные заметки с AI-ассистентом и фокус-режимом
            </p>
        </div>

        <!-- Быстрый доступ -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <NuxtLink to="/notes"
                class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg group">
                <div
                    class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Заметки</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Создавайте и организуйте заметки</p>
            </NuxtLink>

            <NuxtLink to="/templates"
                class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg group">
                <div
                    class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Шаблоны</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Готовые форматы заметок</p>
            </NuxtLink>

            <NuxtLink to="/focus"
                class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg group">
                <div
                    class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Фокус-режим</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Таймер Pomodoro и музыка</p>
            </NuxtLink>

            <NuxtLink to="/analytics"
                class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg group">
                <div
                    class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Аналитика</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Статистика продуктивности</p>
            </NuxtLink>
        </div>

        <!-- Последние заметки -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Последние заметки</h2>
                <NuxtLink to="/notes" class="text-purple-600 hover:text-purple-700 font-medium">
                    Все заметки →
                </NuxtLink>
            </div>

            <div v-if="recentNotes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="note in recentNotes" :key="note.id"
                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <h3 class="font-semibold text-gray-800 dark:text-white mb-2">{{ note.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{{ note.content }}</p>
                    <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{{ formatDate(note.createdAt) }}</span>
                        <NuxtLink :to="`/notes#note-${note.id}`" class="text-purple-600 hover:text-purple-700">
                            Открыть
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-else class="text-center py-8">
                <p class="text-gray-500 dark:text-gray-400">У вас пока нет заметок</p>
                <NuxtLink to="/notes" class="text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block">
                    Создать первую заметку
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const recentNotes = ref([])

onMounted(() => {
    const saved = localStorage.getItem('notes')
    if (saved) {
        const allNotes = JSON.parse(saved)
        recentNotes.value = allNotes.slice(0, 6).map(note => ({
            ...note,
            createdAt: note.createdAt || new Date().toISOString()
        }))
    }
})

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    })
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>