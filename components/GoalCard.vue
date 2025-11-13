<template>
    <div
        class="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <!-- Priority Indicator -->
        <div class="absolute top-0 left-0 w-full h-1" :class="{
            'bg-green-500': goal.priority === 'low',
            'bg-yellow-500': goal.priority === 'medium',
            'bg-red-500': goal.priority === 'high'
        }"></div>

        <div class="p-5">
            <!-- Header -->
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-light-text dark:text-dark-text text-lg leading-tight pr-8 line-clamp-2">{{
                        goal.title }}</h3>
                    <div class="flex items-center space-x-2 mt-1">
                        <span class="px-2 py-1 text-xs rounded-full capitalize"
                            :class="getCategoryClasses(goal.category)">
                            {{ getCategoryLabel(goal.category) }}
                        </span>
                        <span v-if="goal.deadline"
                            class="flex items-center space-x-1 text-xs text-light-text/60 dark:text-dark-text/60">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            <span>{{ formatDate(goal.deadline) }}</span>
                        </span>
                    </div>
                </div>

                <button @click="handleDelete"
                    class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Description -->
            <p v-if="goal.description"
                class="text-light-text/70 dark:text-dark-text/70 text-sm leading-relaxed mb-4 line-clamp-2">
                {{ goal.description }}
            </p>

            <!-- Progress -->
            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-xs text-light-text/60 dark:text-dark-text/60">
                    <span>Прогресс</span>
                    <span>{{ goal.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="h-2 rounded-full transition-all duration-500" :class="getProgressColor(goal.progress)"
                        :style="{ width: `${goal.progress}%` }"></div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <button @click="handleComplete"
                        class="flex items-center space-x-1 text-xs px-3 py-1 rounded-lg transition"
                        :class="goal.progress === 100
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        <span>{{ goal.progress === 100 ? 'Выполнено' : 'Завершить' }}</span>
                    </button>

                    <button @click="editProgress"
                        class="flex items-center space-x-1 text-xs px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                        <span>Изменить</span>
                    </button>
                </div>

                <div class="text-xs text-light-text/40 dark:text-dark-text/40">
                    {{ formatRelativeTime(goal.updatedAt) }}
                </div>
            </div>
        </div>

        <!-- Completed Overlay -->
        <div v-if="goal.progress === 100"
            class="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 pointer-events-none rounded-2xl">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    goal: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update', 'delete', 'complete'])

const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить эту цель?')) {
        emit('delete', props.goal.id)
    }
}

const handleComplete = () => {
    emit('complete', props.goal)
}

const editProgress = () => {
    const newProgress = prompt('Введите новый прогресс (0-100):', props.goal.progress)
    if (newProgress !== null) {
        const progress = parseInt(newProgress)
        if (!isNaN(progress) && progress >= 0 && progress <= 100) {
            const updatedGoal = {
                ...props.goal,
                progress: progress
            }
            emit('update', updatedGoal)
        } else {
            alert('Пожалуйста, введите число от 0 до 100')
        }
    }
}

const getCategoryClasses = (category) => {
    const classes = {
        personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        work: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        health: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        education: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        finance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
        other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
    return classes[category] || classes.other
}

const getCategoryLabel = (category) => {
    const labels = {
        personal: 'Личное',
        work: 'Работа',
        health: 'Здоровье',
        education: 'Образование',
        finance: 'Финансы',
        other: 'Другое'
    }
    return labels[category] || 'Другое'
}

const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-emerald-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-red-500'
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    })
}

const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Только что'
    if (diffInHours < 24) return `${diffInHours} ч. назад`
    if (diffInHours < 48) return 'Вчера'
    return `${Math.floor(diffInHours / 24)} дн. назад`
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