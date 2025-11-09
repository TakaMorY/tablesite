<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Аналитика заметок</h1>
            <p class="text-gray-600 dark:text-gray-400">Статистика вашей продуктивности и активности</p>
        </div>

        <!-- Общая статистика -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Всего заметок</p>
                        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ stats.totalNotes }}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Заметок с фото</p>
                        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ stats.notesWithImages }}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Самый длинный текст</p>
                        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ stats.longestNoteChars }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">символов</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Активность</p>
                        <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ stats.notesThisWeek }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">за эту неделю</p>
                    </div>
                    <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Распределение по цветам -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Распределение по цветам</h3>
                <div class="space-y-3">
                    <div v-for="color in colorStats" :key="color.name" class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded" :class="color.class"></div>
                            <span class="text-gray-700 dark:text-gray-300">{{ color.name }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-600 dark:text-gray-400">{{ color.count }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-500">({{ color.percentage }}%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- График активности -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Активность по дням</h3>
                <div class="space-y-3">
                    <div v-for="day in weeklyActivity" :key="day.name" class="flex items-center justify-between">
                        <span class="text-gray-700 dark:text-gray-300 w-20">{{ day.name }}</span>
                        <div class="flex-1 mx-4">
                            <div class="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full transition-all duration-500"
                                    :style="{ width: day.percentage + '%' }"></div>
                            </div>
                        </div>
                        <span class="text-gray-600 dark:text-gray-400 w-8 text-right">{{ day.count }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Самые популярные заметки -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Самые длинные заметки</h3>
            <div class="space-y-3">
                <div v-for="note in longestNotes" :key="note.id"
                    class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-800 dark:text-white">{{ note.title }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{{ note.content }}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-semibold text-purple-600 dark:text-purple-400">{{ note.charCount }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">символов</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const stats = ref({
    totalNotes: 0,
    notesWithImages: 0,
    longestNoteChars: 0,
    notesThisWeek: 0
})

const colorStats = ref([])
const weeklyActivity = ref([])
const longestNotes = ref([])

const colorMap = {
    'bg-white dark:bg-gray-800': 'Белый',
    'bg-purple-50 dark:bg-purple-900/20': 'Фиолетовый',
    'bg-pink-50 dark:bg-pink-900/20': 'Розовый',
    'bg-blue-50 dark:bg-blue-900/20': 'Голубой',
    'bg-green-50 dark:bg-green-900/20': 'Зеленый',
    'bg-yellow-50 dark:bg-yellow-900/20': 'Желтый',
    'bg-orange-50 dark:bg-orange-900/20': 'Оранжевый'
}

onMounted(() => {
    calculateStats()
})

const calculateStats = () => {
    const saved = localStorage.getItem('notes')
    if (!saved) return

    const notes = JSON.parse(saved)

    // Основная статистика
    stats.value.totalNotes = notes.length
    stats.value.notesWithImages = notes.filter(note => note.image).length

    const longestNote = notes.reduce((longest, note) =>
        note.content.length > longest.content.length ? note : longest, { content: '' }
    )
    stats.value.longestNoteChars = longestNote.content.length

    // Активность за неделю
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    stats.value.notesThisWeek = notes.filter(note => {
        const noteDate = new Date(note.createdAt || Date.now())
        return noteDate >= oneWeekAgo
    }).length

    // Статистика по цветам
    const colorCount = {}
    notes.forEach(note => {
        const colorName = colorMap[note.color] || 'Белый'
        colorCount[colorName] = (colorCount[colorName] || 0) + 1
    })

    colorStats.value = Object.entries(colorCount).map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / notes.length) * 100),
        class: getColorClassByName(name)
    }))

    // Активность по дням
    const dayCount = {}
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    days.forEach(day => dayCount[day] = 0)

    notes.forEach(note => {
        const date = new Date(note.createdAt || Date.now())
        const dayIndex = (date.getDay() + 6) % 7 // Начинаем с понедельника
        days[dayIndex] = days[dayIndex]
        dayCount[days[dayIndex]] = (dayCount[days[dayIndex]] || 0) + 1
    })

    const maxCount = Math.max(...Object.values(dayCount))
    weeklyActivity.value = days.map(day => ({
        name: day,
        count: dayCount[day],
        percentage: maxCount ? (dayCount[day] / maxCount) * 100 : 0
    }))

    // Самые длинные заметки
    longestNotes.value = notes
        .map(note => ({
            ...note,
            charCount: note.content.length
        }))
        .sort((a, b) => b.charCount - a.charCount)
        .slice(0, 5)
}

const getColorClassByName = (name) => {
    const reverseMap = {
        'Белый': 'bg-white dark:bg-gray-800',
        'Фиолетовый': 'bg-purple-50 dark:bg-purple-900/20',
        'Розовый': 'bg-pink-50 dark:bg-pink-900/20',
        'Голубой': 'bg-blue-50 dark:bg-blue-900/20',
        'Зеленый': 'bg-green-50 dark:bg-green-900/20',
        'Желтый': 'bg-yellow-50 dark:bg-yellow-900/20',
        'Оранжевый': 'bg-orange-50 dark:bg-orange-900/20'
    }
    return reverseMap[name] || 'bg-white dark:bg-gray-800'
}
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>