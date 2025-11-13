<template>
    <div class="max-w-4xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Профиль
            </h1>
            <p class="text-xl text-light-text/80 dark:text-dark-text/80">
                Управляйте вашими настройками и персональными данными
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile Info -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Personal Info -->
                <div
                    class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    <div class="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div class="p-6">
                        <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">Личная информация</h2>

                        <form @submit.prevent="saveProfile" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Имя</label>
                                    <input v-model="profile.name" type="text"
                                        class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Фамилия</label>
                                    <input v-model="profile.lastName" type="text"
                                        class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                                </div>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">Email</label>
                                <input v-model="profile.email" type="email"
                                    class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-light-text dark:text-dark-text mb-2">О
                                    себе</label>
                                <textarea v-model="profile.bio" rows="3" placeholder="Расскажите немного о себе..."
                                    class="w-full p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 resize-none"></textarea>
                            </div>

                            <div class="flex justify-end">
                                <button type="submit"
                                    class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Preferences -->
                <div
                    class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    <div class="p-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <div class="p-6">
                        <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">Настройки</h2>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-light-text dark:text-dark-text">Тёмная тема</p>
                                    <p class="text-sm text-light-text/60 dark:text-dark-text/60">Переключение между
                                        светлой и тёмной темой</p>
                                </div>
                                <button @click="toggleTheme"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
                                    :class="isDark ? 'bg-purple-600' : 'bg-gray-200'">
                                    <span class="sr-only">Переключить тему</span>
                                    <span
                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                        :class="isDark ? 'translate-x-6' : 'translate-x-1'"></span>
                                </button>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-medium text-light-text dark:text-dark-text">Уведомления</p>
                                    <p class="text-sm text-light-text/60 dark:text-dark-text/60">Получать уведомления о
                                        новых функциях</p>
                                </div>
                                <button @click="profile.notifications = !profile.notifications"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                                    :class="profile.notifications ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'">
                                    <span class="sr-only">Переключить уведомления</span>
                                    <span
                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                        :class="profile.notifications ? 'translate-x-6' : 'translate-x-1'"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avatar Section -->
            <div class="space-y-6">
                <!-- Avatar -->
                <div
                    class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    <div class="p-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
                    <div class="p-6">
                        <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">Аватар</h2>

                        <div class="space-y-4">
                            <!-- Current Avatar -->
                            <div class="flex flex-col items-center space-y-4">
                                <div class="relative">
                                    <div
                                        class="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                                        <img v-if="profile.avatar" :src="profile.avatar"
                                            class="w-full h-full object-cover" alt="Аватар">
                                        <span v-else>{{ profileInitials }}</span>
                                    </div>

                                    <button @click="removeAvatar" v-if="profile.avatar"
                                        class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition">
                                        ×
                                    </button>
                                </div>

                                <p class="text-sm text-light-text/60 dark:text-dark-text/60 text-center">
                                    {{ profile.avatar ? 'Текущий аватар' : 'Аватар не установлен' }}
                                </p>
                            </div>

                            <!-- Upload Controls -->
                            <div class="space-y-3">
                                <input type="file" @change="handleAvatarUpload" accept="image/*" class="hidden"
                                    id="avatar-upload" ref="avatarInput">

                                <button @click="$refs.avatarInput.click()"
                                    class="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-400 transition text-light-text dark:text-dark-text">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                    </svg>
                                    <span>Загрузить фото</span>
                                </button>

                                <div class="grid grid-cols-3 gap-2">
                                    <button v-for="color in avatarColors" :key="color" @click="setAvatarColor(color)"
                                        class="h-8 rounded-lg transition-transform hover:scale-110"
                                        :style="{ backgroundColor: color }"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats -->
                <div
                    class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    <div class="p-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                    <div class="p-6">
                        <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">Статистика</h2>

                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-light-text/60 dark:text-dark-text/60">Заметок создано</span>
                                <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.notes }}</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-light-text/60 dark:text-dark-text/60">Активных целей</span>
                                <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.goals }}</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-light-text/60 dark:text-dark-text/60">Ачивок получено</span>
                                <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.achievements
                                    }}</span>
                            </div>

                            <div class="flex justify-between items-center">
                                <span class="text-light-text/60 dark:text-dark-text/60">В системе</span>
                                <span class="font-semibold text-light-text dark:text-dark-text">{{ stats.days }}
                                    дней</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const isDark = ref(false)

// Состояние профиля
const profile = ref({
    name: 'User',
    lastName: 'Name',
    email: 'user@email.com',
    bio: '',
    avatar: null,
    notifications: true
})

const stats = ref({
    notes: 0,
    goals: 0,
    achievements: 0,
    days: 15
})

const avatarColors = [
    '#8B5CF6', // purple-500
    '#EC4899', // pink-500
    '#10B981', // emerald-500
    '#3B82F6', // blue-500
    '#F59E0B', // amber-500
    '#EF4444'  // red-500
]

// Вычисляемые свойства
const profileInitials = computed(() => {
    const first = profile.value.name?.charAt(0) || 'U'
    const last = profile.value.lastName?.charAt(0) || 'N'
    return first + last
})

// Загрузка профиля из localStorage
onMounted(() => {
    const savedProfile = localStorage.getItem('profile')
    if (savedProfile) {
        profile.value = JSON.parse(savedProfile)
    }

    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark'

    // Загрузка статистики
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
        stats.value.notes = JSON.parse(savedNotes).length
    }

    const savedGoals = localStorage.getItem('goals')
    if (savedGoals) {
        stats.value.goals = JSON.parse(savedGoals).length
    }

    const savedAchievements = localStorage.getItem('achievements')
    if (savedAchievements) {
        stats.value.achievements = JSON.parse(savedAchievements).filter(a => a.unlocked).length
    }
})

// Функции
const saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile.value))
    // Можно добавить уведомление об успешном сохранении
    console.log('Профиль сохранен')
}

const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profile.value.avatar = e.target.result
            saveProfile()
        }
        reader.readAsDataURL(file)
    }
}

const removeAvatar = () => {
    profile.value.avatar = null
    saveProfile()
}

const setAvatarColor = (color) => {
    // Создаем градиентный аватар на основе выбранного цвета
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')

    // Создаем градиент
    const gradient = ctx.createLinearGradient(0, 0, 200, 200)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, adjustColor(color, 40))

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 200, 200)

    // Добавляем инициалы
    ctx.fillStyle = 'white'
    ctx.font = 'bold 80px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(profileInitials.value, 100, 100)

    profile.value.avatar = canvas.toDataURL()
    saveProfile()
}

const adjustColor = (color, amount) => {
    // Простая функция для изменения яркости цвета
    let usePound = false
    if (color[0] === "#") {
        color = color.slice(1)
        usePound = true
    }

    const num = parseInt(color, 16)
    let r = (num >> 16) + amount
    if (r > 255) r = 255
    else if (r < 0) r = 0

    let b = ((num >> 8) & 0x00FF) + amount
    if (b > 255) b = 255
    else if (b < 0) b = 0

    let g = (num & 0x0000FF) + amount
    if (g > 255) g = 255
    else if (g < 0) g = 0

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    // Обновляем тему на странице
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}
</script>