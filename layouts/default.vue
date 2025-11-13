<template>
    <div :class="isDark ? 'dark' : ''"
        class="min-h-screen bg-gradient-to-br from-light-primary via-light-secondary to-purple-50 dark:from-dark-primary dark:via-dark-secondary dark:to-purple-900/20 transition-colors duration-300">
        <!-- Header -->
        <header
            class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-surface/80 border-b border-white/20 shadow-sm transition-colors duration-300">
            <div class="container mx-auto px-4 py-3">
                <div class="flex justify-between items-center">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center space-x-3 group">
                        <div
                            class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <h1
                            class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Заметки</h1>
                    </NuxtLink>

                    <!-- Navigation & Controls -->
                    <div class="flex items-center space-x-4">
                        <!-- Desktop Navigation -->
                        <nav class="hidden md:flex items-center space-x-1">
                            <NuxtLink v-for="link in navigationLinks" :key="link.name" :to="link.path"
                                class="relative group text-light-text dark:text-dark-text font-medium transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-dark-surface/50"
                                :class="{ 'text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-dark-surface/50': $route.path === link.path }">
                                {{ link.name }}
                                <span v-if="$route.path === link.path"
                                    class="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                            </NuxtLink>
                        </nav>

                        <!-- Theme Toggle -->
                        <ThemeToggle :isDark="isDark" @toggle="toggleTheme" />

                        <!-- User Avatar -->
                        <div class="relative group">
                            <button
                                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer shadow-lg transition-transform hover:scale-105 overflow-hidden"
                                :style="userAvatarStyle">
                                <span v-if="!userProfile.avatar">{{ userInitials }}</span>
                                <img v-else :src="userProfile.avatar" class="w-full h-full object-cover" alt="Аватар">
                            </button>
                            <div
                                class="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                                    <p class="font-semibold text-gray-800 dark:text-white">{{ userProfile.name }} {{
                                        userProfile.lastName }}</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ userProfile.email }}</p>
                                </div>
                                <div class="p-2 space-y-1">
                                    <NuxtLink to="/profile"
                                        class="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        <span>Профиль</span>
                                    </NuxtLink>
                                    <NuxtLink to="/goals"
                                        class="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Цели</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button @click="showMobileMenu = true"
                            class="md:hidden p-2 rounded-lg bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 transition-colors">
                            <svg class="w-5 h-5 text-light-text dark:text-dark-text" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-6 min-h-[calc(100vh-80px)]">
            <NuxtPage />
        </main>

        <!-- Mobile Menu -->
        <MobileMenu :isOpen="showMobileMenu" @close="showMobileMenu = false" :isDark="isDark"
            @toggle-theme="toggleTheme" :navigationLinks="navigationLinks" :userProfile="userProfile"
            :userInitials="userInitials" />

        <!-- Floating Background Elements -->
        <div
            class="fixed top-1/4 left-10 w-72 h-72 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 animate-float pointer-events-none">
        </div>
        <div class="fixed bottom-1/4 right-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl -z-10 animate-float pointer-events-none"
            style="animation-delay: 2s;"></div>
    </div>
</template>

<script setup>
const isDark = ref(false)
const showMobileMenu = ref(false)
const route = useRoute()

const navigationLinks = [
    { name: 'Заметки', path: '/' },
    { name: 'Цели', path: '/goals' },
    { name: 'Аналитика', path: '/analytics' },

]

// Данные пользователя
const userProfile = ref({
    name: 'User',
    lastName: 'Name',
    email: 'user@email.com',
    avatar: null
})


watch(() => route.path, () => {
    showMobileMenu.value = false

    // Обновляем профиль при изменении маршрута
    const savedProfile = localStorage.getItem('profile')
    if (savedProfile) {
        userProfile.value = { ...userProfile.value, ...JSON.parse(savedProfile) }
    }
})

// Вычисляемые свойства
const userInitials = computed(() => {
    const first = userProfile.value.name?.charAt(0) || 'U'
    const last = userProfile.value.lastName?.charAt(0) || 'N'
    return first + last
})

const userAvatarStyle = computed(() => {
    if (userProfile.value.avatar) return {}
    return {
        background: 'linear-gradient(135deg, #8B5CF6, #EC4899)'
    }
})

// Загрузка темы и профиля из localStorage
onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        isDark.value = savedTheme === 'dark'
    } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const savedProfile = localStorage.getItem('profile')
    if (savedProfile) {
        userProfile.value = { ...userProfile.value, ...JSON.parse(savedProfile) }
    }
})

const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Закрытие мобильного меню при изменении маршрута
watch(() => route.path, () => {
    showMobileMenu.value = false
})
</script>