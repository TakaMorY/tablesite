<template>
    <div class="fixed bottom-6 right-6 z-50">
        <button @click="showChat = !showChat"
            class="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        </button>

        <div v-if="showChat"
            class="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <!-- Заголовок чата -->
            <div class="bg-purple-600 text-white p-4 rounded-t-lg">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold">AI Ассистент</h3>
                    <button @click="showChat = false" class="text-white hover:text-purple-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Сообщения -->
            <div class="h-64 overflow-y-auto p-4 space-y-3">
                <div v-for="message in messages" :key="message.id" class="flex"
                    :class="message.isAI ? 'justify-start' : 'justify-end'">
                    <div class="max-w-xs p-3 rounded-lg"
                        :class="message.isAI ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' : 'bg-purple-600 text-white'">
                        {{ message.text }}
                    </div>
                </div>
                <div v-if="isTyping" class="flex justify-start">
                    <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <div class="flex space-x-1">
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s">
                            </div>
                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ввод сообщения -->
            <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex space-x-2">
                    <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Задайте вопрос..."
                        class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
                    <button @click="sendMessage"
                        class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-wrap gap-1 mt-2">
                    <button v-for="suggestion in quickSuggestions" :key="suggestion"
                        @click="sendQuickSuggestion(suggestion)"
                        class="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors">
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const showChat = ref(false)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)

const quickSuggestions = [
    'Помоги с идеей',
    'Сгенерируй текст',
    'Структурируй заметку',
    'Придумай заголовок'
]

const aiResponses = {
    'помоги с идеей': 'Попробуйте использовать технику "мозгового штурма": запишите все идеи, даже самые безумные, затем отберите лучшие и доработайте их.',
    'сгенерируй текст': 'Вот пример структурированного текста:\n\n1. Введение с основной идеей\n2. Ключевые аргументы\n3. Примеры и доказательства\n4. Вывод и рекомендации',
    'структурируй заметку': 'Рекомендую структуру:\n- Заголовок\n- Основная мысль\n- Подпункты\n- Действия\n- Дата следующего просмотра',
    'придумай заголовок': 'Вот несколько вариантов:\n"Эффективные стратегии работы"\n"Путь к продуктивности"\n"Искусство концентрации"\n"Методы организации времени"',
    'default': 'Я могу помочь с генерацией идей, структурированием заметок, созданием текстов и организацией мыслей. Что именно вас интересует?'
}

const sendMessage = () => {
    if (!userInput.value.trim()) return

    // Добавляем сообщение пользователя
    messages.value.push({
        id: Date.now(),
        text: userInput.value,
        isAI: false
    })

    const userMessage = userInput.value.toLowerCase()
    userInput.value = ''
    isTyping.value = true

    // Имитация задержки ответа AI
    setTimeout(() => {
        let response = aiResponses.default

        for (const [key, value] of Object.entries(aiResponses)) {
            if (userMessage.includes(key)) {
                response = value
                break
            }
        }

        messages.value.push({
            id: Date.now() + 1,
            text: response,
            isAI: true
        })

        isTyping.value = false
    }, 1000)
}

const sendQuickSuggestion = (suggestion) => {
    userInput.value = suggestion
    sendMessage()
}

// Автоматическое приветствие
onMounted(() => {
    setTimeout(() => {
        messages.value.push({
            id: 1,
            text: 'Привет! Я ваш AI-ассистент. Могу помочь с генерацией идей, структурированием заметок и другими задачами.',
            isAI: true
        })
    }, 500)
})
</script>