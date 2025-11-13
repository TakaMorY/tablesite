<template>
    <!-- Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-50 md:hidden">
        <!-- Animated Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md transition-opacity duration-500"
            :class="isOpen ? 'opacity-100' : 'opacity-0'" @click="$emit('close')">
        </div>

        <!-- Menu Panel -->
        <div class="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-dark-surface/95 backdrop-blur-2xl shadow-2xl border-l border-white/30 dark:border-gray-700/50 transform transition-transform duration-500 ease-out"
            :class="isOpen ? 'translate-x-0' : 'translate-x-full'">

            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5 pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"></div>
            </div>

            <div class="relative p-6 h-full flex flex-col overflow-hidden">
                <!-- Header with Animated Close Button -->
                <div class="flex justify-between items-center mb-8">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <h2
                            class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Меню
                        </h2>
                    </div>
                    <button @click="$emit('close')"
                        class="p-3 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/50 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- User Profile Card -->
                <div class="relative group mb-8">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200">
                    </div>
                    <div
                        class="relative flex items-center space-x-4 p-4 bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-white/50 dark:border-gray-600/30">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden ring-2 ring-white/50"
                            :style="userAvatarStyle">
                            <span v-if="!userProfile.avatar" class="drop-shadow-sm">{{ userInitials }}</span>
                            <img v-else :src="userProfile.avatar" class="w-full h-full object-cover" alt="Аватар">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-gray-800 dark:text-white truncate text-lg">
                                {{ userProfile.name }} {{ userProfile.lastName }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                {{ userProfile.email }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <nav class="flex-1 space-y-3 mb-6">
                    <NuxtLink v-for="(link, index) in navigationLinks" :key="link.name" :to="link.path"
                        class="flex items-center space-x-4 py-4 px-4 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 rounded-xl transition-all duration-300 group relative overflow-hidden"
                        :class="{
                            'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-600 dark:text-purple-400 shadow-md': $route.path === link.path
                        }" @click="$emit('close')" :style="`transition-delay: ${index * 50}ms`">

                        <!-- Animated Background -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left">
                        </div>

                        <!-- Icon -->
                        <div class="relative w-8 h-8 flex items-center justify-center">
                            <div class="w-2 h-2 rounded-full bg-current transition-all duration-500 group-hover:w-3 group-hover:h-3 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500"
                                :class="{
                                    'w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500': $route.path === link.path
                                }">
                            </div>
                        </div>

                        <!-- Link Text -->
                        <span class="relative z-10">{{ link.name }}</span>

                        <!-- Active Indicator -->
                        <div v-if="$route.path === link.path"
                            class="absolute right-4 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
                        </div>
                    </NuxtLink>
                </nav>

                <!-- Bottom Actions -->
                <div class="space-y-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                    <!-- Theme Toggle -->
                    <button @click="$emit('toggle-theme')"
                        class="flex items-center justify-between w-full py-4 px-4 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-all duration-300 hover:shadow-md group">
                        <span class="flex items-center space-x-4">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                                    </path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                                    </path>
                                </svg>
                            </div>
                            <span>{{ isDark ? 'Светлая тема' : 'Тёмная тема' }}</span>
                        </span>
                        <div
                            class="w-14 h-7 flex items-center bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full p-1 transition-all duration-500 shadow-inner">
                            <div class="bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-500"
                                :class="isDark ? 'translate-x-7' : 'translate-x-0'">
                            </div>
                        </div>
                    </button>

                    <!-- Profile Settings -->
                    <NuxtLink to="/profile"
                        class="flex items-center space-x-4 py-4 px-4 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-all duration-300 hover:shadow-md group"
                        @click="$emit('close')">
                        <div
                            class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <span>Настройки профиля</span>
                    </NuxtLink>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"></div>
                <div class="absolute -top-20 -right-20 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    isDark: Boolean,
    navigationLinks: {
        type: Array,
        default: () => []
    },
    userProfile: {
        type: Object,
        default: () => ({
            name: 'User',
            lastName: 'Name',
            email: 'user@email.com',
            avatar: null
        })
    },
    userInitials: {
        type: String,
        default: 'UN'
    }
})

defineEmits(['close', 'toggle-theme'])

const userAvatarStyle = computed(() => {
    if (props.userProfile.avatar) return {}
    return {
        background: 'linear-gradient(135deg, #8B5CF6, #EC4899)'
    }
})
</script>

<style scoped>
.animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

/* Smooth transitions for all interactive elements */
* {
    transition-property: color, background-color, border-color, transform, box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>