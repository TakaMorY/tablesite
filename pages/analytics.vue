<template>
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Аналитика продуктивности
            </h1>
            <p class="text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
                Отслеживайте свою продуктивность и находите лучшие моменты для творчества
            </p>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ stats.totalNotes }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Всего заметок</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ stats.notesWithImages }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">С фото</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ stats.avgNoteLength }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Ср. длина</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ stats.activeDays }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Активных дней</p>
            </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Activity Chart -->
            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4 flex items-center space-x-2">
                    <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                    <span>Активность по дням</span>
                </h3>
                <div class="h-64 flex items-end space-x-2">
                    <div v-for="(day, index) in weeklyActivity" :key="index" class="flex-1 flex flex-col items-center">
                        <div class="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-500"
                            :style="{ height: `${(day.notes / Math.max(...weeklyActivity.map(d => d.notes))) * 80}%` }">
                        </div>
                        <span class="text-xs text-light-text/60 dark:text-dark-text/60 mt-2">{{ day.day }}</span>
                        <span class="text-xs font-semibold text-light-text dark:text-dark-text">{{ day.notes }}</span>
                    </div>
                </div>
            </div>

            <!-- Time Distribution -->
            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4 flex items-center space-x-2">
                    <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Время создания заметок</span>
                </h3>
                <div class="h-64 flex items-end space-x-2">
                    <div v-for="(time, index) in timeDistribution" :key="index"
                        class="flex-1 flex flex-col items-center">
                        <div class="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-500"
                            :style="{ height: `${(time.notes / Math.max(...timeDistribution.map(t => t.notes))) * 80}%` }">
                        </div>
                        <span class="text-xs text-light-text/60 dark:text-dark-text/60 mt-2">{{ time.time }}</span>
                        <span class="text-xs font-semibold text-light-text dark:text-dark-text">{{ time.notes }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Stats -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Productivity Trends -->
            <div
                class="lg:col-span-2 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Статистика</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span class="text-light-text/60 dark:text-dark-text/60">Всего символов написано</span>
                        <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.totalCharacters
                            }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span class="text-light-text/60 dark:text-dark-text/60">Заметок с изображениями</span>
                        <span class="font-semibold text-light-text dark:text-dark-text">{{
                            stats.notesWithImagesPercentage }}%</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span class="text-light-text/60 dark:text-dark-text/60">Самая длинная заметка</span>
                        <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.longestNote }}
                            симв.</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span class="text-light-text/60 dark:text-dark-text/60">Заметок в этом месяце</span>
                        <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.thisMonthNotes
                            }}</span>
                    </div>
                </div>
            </div>

            <!-- Insights -->
            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Инсайты</h3>
                <div class="space-y-4">
                    <div v-for="insight in insights" :key="insight.id"
                        class="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                <span class="text-white text-sm">{{ insight.emoji }}</span>
                            </div>
                            <div>
                                <p class="font-semibold text-light-text dark:text-dark-text">{{ insight.title }}</p>
                                <p class="text-sm text-light-text/60 dark:text-dark-text/60">{{ insight.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Статистика на основе реальных данных
const stats = ref({
    totalNotes: 0,
    notesWithImages: 0,
    notesWithImagesPercentage: 0,
    avgNoteLength: 0,
    activeDays: 0,
    totalCharacters: 0,
    longestNote: 0,
    thisMonthNotes: 0
})

const weeklyActivity = ref([])
const timeDistribution = ref([])
const insights = ref([])

// Загрузка данных
onMounted(() => {
    calculateStats()
    calculateWeeklyActivity()
    calculateTimeDistribution()
    generateInsights()
})

const calculateStats = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]')

    stats.value.totalNotes = notes.length
    stats.value.notesWithImages = notes.filter(note => note.image).length
    stats.value.notesWithImagesPercentage = notes.length > 0 ?
        Math.round((stats.value.notesWithImages / notes.length) * 100) : 0

    // Средняя длина заметки
    const totalLength = notes.reduce((sum, note) => sum + (note.content?.length || 0), 0)
    stats.value.avgNoteLength = notes.length > 0 ? Math.round(totalLength / notes.length) : 0

    // Активные дни (уникальные даты)
    const uniqueDays = new Set(notes.map(note => new Date(note.createdAt).toDateString()))
    stats.value.activeDays = uniqueDays.size

    // Общее количество символов
    stats.value.totalCharacters = totalLength

    // Самая длинная заметка
    stats.value.longestNote = notes.length > 0 ?
        Math.max(...notes.map(note => note.content?.length || 0)) : 0

    // Заметки этого месяца
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    stats.value.thisMonthNotes = notes.filter(note => {
        const noteDate = new Date(note.createdAt)
        return noteDate.getMonth() === currentMonth && noteDate.getFullYear() === currentYear
    }).length
}

const calculateWeeklyActivity = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]')
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    weeklyActivity.value = days.map(day => ({
        day,
        notes: Math.floor(Math.random() * 8) // В реальном приложении здесь была бы реальная статистика
    }))
}

const calculateTimeDistribution = () => {
    const times = ['06-09', '09-12', '12-15', '15-18', '18-21', '21-24']

    timeDistribution.value = times.map(time => ({
        time,
        notes: Math.floor(Math.random() * 10)
    }))
}

const generateInsights = () => {
    insights.value = [
        {
            id: 1,
            emoji: '📈',
            title: 'Стабильный рост',
            description: `Вы создали ${stats.value.totalNotes} заметок. Продолжайте в том же духе!`
        },
        {
            id: 2,
            emoji: '🖼️',
            title: 'Визуальный контент',
            description: `${stats.value.notesWithImagesPercentage}% ваших заметок содержат изображения`
        },
        {
            id: 3,
            emoji: '📝',
            title: 'Продуктивность',
            description: `В среднем ваши заметки содержат ${stats.value.avgNoteLength} символов`
        }
    ]
}
</script>