<template>
    <div class="relative">
        <button @click="showActions = !showActions"
            class="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>

        <div v-if="showActions"
            class="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 w-48 z-50">
            <button @click="createQuickNote"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Быстрая заметка</span>
            </button>
            <button @click="startPomodoro"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pomodoro 25м</span>
            </button>
            <button @click="toggleFocusMode"
                class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Фокус-режим</span>
            </button>
        </div>
    </div>
</template>

<script setup>
const showActions = ref(false)

const createQuickNote = () => {
    const quickNote = {
        title: 'Быстрая заметка',
        content: 'Записано: ' + new Date().toLocaleString('ru-RU'),
        color: 'bg-white dark:bg-gray-800',
        createdAt: new Date().toISOString()
    }

    const saved = localStorage.getItem('notes')
    const notes = saved ? JSON.parse(saved) : []
    notes.unshift({
        id: Date.now(),
        ...quickNote
    })
    localStorage.setItem('notes', JSON.stringify(notes))

    showActions.value = false
    navigateTo('/notes')
}

const startPomodoro = () => {
    localStorage.setItem('pomodoroStartTime', new Date().toISOString())
    showActions.value = false
    navigateTo('/focus')
}

const toggleFocusMode = () => {
    showActions.value = false
    navigateTo('/focus')
}

// Закрываем меню при клике вне его
onClickOutside(document.body, () => {
    showActions.value = false
})
</script>