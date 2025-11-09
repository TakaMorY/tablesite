<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Шапка -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800 dark:text-white">Notion<span
                  class="text-purple-600">Purple</span></h1>
              <p class="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Минималистичные заметки</p>
            </div>
          </div>

          <!-- Навигация -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/"
              class="text-gray-600 dark:text-gray-400 hover:text-purple-600 font-medium transition-colors"
              active-class="text-purple-600">
              Главная
            </NuxtLink>
            <NuxtLink to="/notes"
              class="text-gray-600 dark:text-gray-400 hover:text-purple-600 font-medium transition-colors"
              active-class="text-purple-600">
              Заметки
            </NuxtLink>
            <NuxtLink to="/templates"
              class="text-gray-600 dark:text-gray-400 hover:text-purple-600 font-medium transition-colors"
              active-class="text-purple-600">
              Шаблоны
            </NuxtLink>
            <NuxtLink to="/analytics"
              class="text-gray-600 dark:text-gray-400 hover:text-purple-600 font-medium transition-colors"
              active-class="text-purple-600">
              Аналитика
            </NuxtLink>
          </nav>

          <div class="flex items-center space-x-4">
            <QuickActions />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>

    <!-- Основное содержимое -->
    <main class="flex-grow">
      <NuxtPage @update:notes-count="updateNotesCount" />
    </main>

    <!-- Подвал -->
    <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">NotionPurple</h3>
            <p class="text-gray-600 dark:text-gray-400 max-w-md">
              Минималистичное приложение для заметок с фокусом на продуктивность и чистый дизайн.
            </p>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Функции</h4>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                <span>Фокус-режим</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                <span>AI-ассистент</span>
              </li>
              <li class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                <span>Таймер Pomodoro</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Технологии</h4>
            <div class="flex flex-wrap gap-2">
              <span class="bg-purple-600 text-white px-2 py-1 rounded text-xs">Nuxt 3</span>
              <span class="bg-purple-600 text-white px-2 py-1 rounded text-xs">Vue 3</span>
              <span class="bg-purple-600 text-white px-2 py-1 rounded text-xs">Tailwind</span>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            &copy; 2024 NotionPurple. Минимализм и продуктивность.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const notesCount = ref(0)

const updateNotesCount = (count) => {
  notesCount.value = count
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark')
  }

  const saved = localStorage.getItem('notes')
  if (saved) {
    notesCount.value = JSON.parse(saved).length
  }
})
</script>