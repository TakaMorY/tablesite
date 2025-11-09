<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Фокус-режим</h1>
            <p class="text-gray-600 dark:text-gray-400">Сфокусируйтесь на текущей задаче</p>
        </div>

        <!-- Таймер Pomodoro -->
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <div class="text-center mb-6">
                <div class="text-6xl font-mono font-bold text-purple-600 mb-4">
                    {{ formatTime(timer) }}
                </div>
                <div class="flex justify-center space-x-4 mb-4">
                    <button @click="startTimer(25 * 60)"
                        class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Pomodoro 25м
                    </button>
                    <button @click="startTimer(5 * 60)"
                        class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Перерыв 5м
                    </button>
                    <button @click="startTimer(15 * 60)"
                        class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Отдых 15м
                    </button>
                </div>
                <div class="flex justify-center space-x-2">
                    <button @click="toggleTimer"
                        class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        {{ isRunning ? 'Пауза' : 'Старт' }}
                    </button>
                    <button @click="resetTimer"
                        class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Сброс
                    </button>
                </div>
            </div>

            <!-- Статистика Pomodoro -->
            <div class="grid grid-cols-3 gap-4 text-center">
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div class="text-2xl font-bold text-purple-600">{{ stats.today }}</div>
                    <div class="text-sm text-purple-600">Сегодня</div>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div class="text-2xl font-bold text-purple-600">{{ stats.week }}</div>
                    <div class="text-sm text-purple-600">За неделю</div>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div class="text-2xl font-bold text-purple-600">{{ stats.total }}</div>
                    <div class="text-sm text-purple-600">Всего</div>
                </div>
            </div>
        </div>

        <!-- Текущая задача -->
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Текущая задача</h3>
            <textarea v-model="currentTask" placeholder="Опишите вашу текущую задачу..."
                class="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"></textarea>
            <button @click="saveTask"
                class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
                Сохранить задачу
            </button>
        </div>

        <!-- Фоновая музыка -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Фоновая музыка</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button v-for="sound in backgroundSounds" :key="sound.id" @click="toggleSound(sound)"
                    class="p-4 border rounded-lg text-center transition-colors" :class="activeSound?.id === sound.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'">
                    <div class="text-lg mb-2">{{ sound.emoji }}</div>
                    <div class="text-sm font-medium">{{ sound.name }}</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const timer = ref(25 * 60) // 25 минут в секундах
const isRunning = ref(false)
const currentTask = ref('')
const activeSound = ref(null)
const stats = ref({
    today: 0,
    week: 0,
    total: 0
})

const backgroundSounds = [
    { id: 1, name: 'Дождь', emoji: '🌧️', url: 'https://assets.mixkit.co/sfx/preview/mixkit-rain-against-window-239.mp3' },
    { id: 2, name: 'Лес', emoji: '🌲', url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-1291.mp3' },
    { id: 3, name: 'Кофе', emoji: '☕', url: 'https://assets.mixkit.co/sfx/preview/mixkit-coffee-shop-ambience-445.mp3' },
    { id: 4, name: 'Белый шум', emoji: '📻', url: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-2441.mp3' }
]

let timerInterval = null
let audio = null

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const startTimer = (duration) => {
    timer.value = duration
    isRunning.value = true
}

const toggleTimer = () => {
    isRunning.value = !isRunning.value
}

const resetTimer = () => {
    isRunning.value = false
    timer.value = 25 * 60
}

const toggleSound = (sound) => {
    if (activeSound.value?.id === sound.id) {
        // Останавливаем звук
        if (audio) {
            audio.pause()
            audio = null
        }
        activeSound.value = null
    } else {
        // Запускаем новый звук
        if (audio) {
            audio.pause()
        }
        activeSound.value = sound
        audio = new Audio(sound.url)
        audio.loop = true
        audio.volume = 0.3
        audio.play()
    }
}

const saveTask = () => {
    if (currentTask.value.trim()) {
        localStorage.setItem('currentFocusTask', currentTask.value)
        // Можно сохранить в историю задач
        const focusTasks = JSON.parse(localStorage.getItem('focusTasks') || '[]')
        focusTasks.unshift({
            id: Date.now(),
            task: currentTask.value,
            timestamp: new Date().toISOString(),
            duration: 25 // minutes
        })
        localStorage.setItem('focusTasks', JSON.stringify(focusTasks))
    }
}

// Таймер
watchEffect(() => {
    if (isRunning.value && timer.value > 0) {
        timerInterval = setInterval(() => {
            timer.value--
            if (timer.value === 0) {
                isRunning.value = false
                // Уведомление о завершении
                if (Notification.permission === 'granted') {
                    new Notification('Pomodoro завершен!', {
                        body: 'Время для перерыва',
                        icon: '/icon.png'
                    })
                }
            }
        }, 1000)
    } else {
        clearInterval(timerInterval)
    }
})

onMounted(() => {
    // Запрашиваем разрешение на уведомления
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
    }

    // Загружаем сохраненную задачу
    const savedTask = localStorage.getItem('currentFocusTask')
    if (savedTask) {
        currentTask.value = savedTask
    }

    // Загружаем статистику
    loadStats()
})

const loadStats = () => {
    // Простая имитация статистики
    stats.value = {
        today: Math.floor(Math.random() * 5) + 1,
        week: Math.floor(Math.random() * 20) + 5,
        total: Math.floor(Math.random() * 100) + 50
    }
}
</script>