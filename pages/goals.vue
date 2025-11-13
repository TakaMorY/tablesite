<template>
    <div class="max-w-6xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ваши цели
            </h1>
            <p class="text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
                Ставьте цели, отслеживайте прогресс и достигайте большего
            </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ totalGoals }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Всего целей</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ completedGoals }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Выполнено</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ progressPercentage }}%
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Общий прогресс</p>
            </div>

            <div
                class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
                <div class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    {{ activeGoals }}
                </div>
                <p class="text-light-text/60 dark:text-dark-text/60">Активные цели</p>
            </div>
        </div>

        <!-- Add Goal -->
        <div
            class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div class="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div class="p-6">
                <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">Новая цель</h2>

                <form @submit.prevent="addGoal" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Название
                                цели</label>
                            <input v-model="newGoal.title" type="text" placeholder="Чего вы хотите достичь?"
                                class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400"
                                required>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Категория</label>
                            <select v-model="newGoal.category"
                                class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                                <option value="personal">Личное</option>
                                <option value="work">Работа</option>
                                <option value="health">Здоровье</option>
                                <option value="education">Образование</option>
                                <option value="finance">Финансы</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Описание</label>
                        <textarea v-model="newGoal.description" placeholder="Опишите вашу цель подробнее..." rows="3"
                            class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 resize-none"></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Дедлайн</label>
                            <input v-model="newGoal.deadline" type="date"
                                class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Приоритет</label>
                            <select v-model="newGoal.priority"
                                class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                                <option value="low">Низкий</option>
                                <option value="medium">Средний</option>
                                <option value="high">Высокий</option>
                            </select>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Прогресс</label>
                            <div class="flex items-center space-x-3">
                                <input v-model="newGoal.progress" type="range" min="0" max="100"
                                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                                <span class="text-sm font-medium text-light-text dark:text-dark-text w-12">{{
                                    newGoal.progress }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="resetGoalForm"
                            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            Очистить
                        </button>
                        <button type="submit"
                            class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Добавить цель
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Goals List -->
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text">Мои цели</h3>
                <div class="flex items-center space-x-2">
                    <select v-model="filterCategory"
                        class="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="all">Все категории</option>
                        <option value="personal">Личное</option>
                        <option value="work">Работа</option>
                        <option value="health">Здоровье</option>
                        <option value="education">Образование</option>
                        <option value="finance">Финансы</option>
                        <option value="other">Другое</option>
                    </select>

                    <select v-model="filterStatus"
                        class="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option value="all">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="completed">Завершенные</option>
                    </select>
                </div>
            </div>

            <!-- Goals Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GoalCard v-for="goal in filteredGoals" :key="goal.id" :goal="goal" @update="updateGoal"
                    @delete="deleteGoal" @complete="toggleGoalCompletion" />
            </div>

            <!-- Empty State -->
            <div v-if="filteredGoals.length === 0" class="text-center py-12">
                <div
                    class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Целей пока нет</h3>
                <p class="text-light-text/60 dark:text-dark-text/60">Добавьте свою первую цель и начните двигаться к
                    успеху!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// Состояние для новой цели
const newGoal = ref({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    deadline: '',
    progress: 0
})

// Цели и фильтры
const goals = ref([])
const filterCategory = ref('all')
const filterStatus = ref('all')

// Вычисляемые свойства
const totalGoals = computed(() => goals.value.length)
const completedGoals = computed(() => goals.value.filter(goal => goal.progress === 100).length)
const activeGoals = computed(() => goals.value.filter(goal => goal.progress < 100).length)
const progressPercentage = computed(() => {
    if (goals.value.length === 0) return 0
    const totalProgress = goals.value.reduce((sum, goal) => sum + goal.progress, 0)
    return Math.round(totalProgress / goals.value.length)
})

const filteredGoals = computed(() => {
    let filtered = goals.value

    if (filterCategory.value !== 'all') {
        filtered = filtered.filter(goal => goal.category === filterCategory.value)
    }

    if (filterStatus.value === 'active') {
        filtered = filtered.filter(goal => goal.progress < 100)
    } else if (filterStatus.value === 'completed') {
        filtered = filtered.filter(goal => goal.progress === 100)
    }

    return filtered
})

// Загрузка целей из localStorage
onMounted(() => {
    const savedGoals = localStorage.getItem('goals')
    if (savedGoals) {
        goals.value = JSON.parse(savedGoals)
    }
})

// Функции
const addGoal = () => {
    const goal = {
        id: Date.now().toString(),
        title: newGoal.value.title,
        description: newGoal.value.description,
        category: newGoal.value.category,
        priority: newGoal.value.priority,
        deadline: newGoal.value.deadline,
        progress: parseInt(newGoal.value.progress),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: newGoal.value.progress === 100
    }

    goals.value.unshift(goal)
    saveGoals()
    resetGoalForm()
}

const updateGoal = (updatedGoal) => {
    const index = goals.value.findIndex(goal => goal.id === updatedGoal.id)
    if (index !== -1) {
        goals.value[index] = {
            ...updatedGoal,
            updatedAt: new Date().toISOString(),
            completed: updatedGoal.progress === 100
        }
        saveGoals()
    }
}

const deleteGoal = (id) => {
    if (confirm('Вы уверены, что хотите удалить эту цель?')) {
        goals.value = goals.value.filter(goal => goal.id !== id)
        saveGoals()
    }
}

const toggleGoalCompletion = (goal) => {
    const updatedGoal = {
        ...goal,
        progress: goal.progress === 100 ? 0 : 100,
        updatedAt: new Date().toISOString(),
        completed: goal.progress !== 100
    }
    updateGoal(updatedGoal)
}

const resetGoalForm = () => {
    newGoal.value = {
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        deadline: '',
        progress: 0
    }
}

const saveGoals = () => {
    localStorage.setItem('goals', JSON.stringify(goals.value))
}
</script>