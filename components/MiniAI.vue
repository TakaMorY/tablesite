<template>
    <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden h-fit">
        <div class="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-center space-x-3 mb-4">
                <div
                    class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                        </path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-semibold text-light-text dark:text-dark-text">AI Помощник</h3>
                    <p class="text-xs text-light-text/60 dark:text-dark-text/60">Готов помочь с идеями</p>
                </div>
            </div>

            <!-- Chat Messages -->
            <div class="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2" ref="chatContainer">
                <div v-for="(message, index) in chatHistory" :key="index"
                    :class="['flex', message.sender === 'user' ? 'justify-end' : 'justify-start']">
                    <div :class="[
                        'max-w-xs rounded-2xl p-3 shadow-sm',
                        message.sender === 'user'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-none'
                            : 'bg-gray-100 dark:bg-gray-800 text-light-text dark:text-dark-text rounded-bl-none'
                    ]">
                        <p class="text-sm leading-relaxed">{{ message.text }}</p>
                    </div>
                </div>
            </div>

            <!-- Quick Prompts -->
            <div class="grid grid-cols-2 gap-2 mb-4">
                <button v-for="prompt in quickPrompts" :key="prompt" @click="userInput = prompt; sendMessage()"
                    class="text-xs p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-light-text dark:text-dark-text transition text-left line-clamp-2">
                    {{ prompt }}
                </button>
            </div>

            <!-- Input -->
            <div class="flex space-x-2">
                <input v-model="userInput" @keyup.enter="sendMessage" type="text" placeholder="Спросите о чем-нибудь..."
                    class="flex-1 p-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 text-sm">
                <button @click="sendMessage" :disabled="!userInput.trim()"
                    class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:scale-100 disabled:shadow">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const userInput = ref('')
const chatHistory = ref([
    {
        sender: 'ai',
        text: 'Привет! Я ваш AI помощник. Чем могу помочь с вашими заметками?'
    }
])
const chatContainer = ref(null)

const quickPrompts = [
    'Идеи для заметок',
    'Как организовать мысли',
    'Советы по продуктивности',
    'Помоги с формулировкой'
]

const aiResponses = {
    greeting: [
        "Привет! Как ваши дела? Чем могу помочь с заметками? 📝",
        "Здравствуйте! Рад вас видеть. Есть ли вопросы по организации заметок?",
        "Приветствую! Готов помочь вам с любыми вопросами о ваших заметках ✨"
    ],
    help: [
        "Конечно! Расскажите, что вас интересует?",
        "С удовольствием помогу! Что конкретно вас беспокоит?",
        "Я здесь чтобы помочь! Задавайте ваш вопрос 😊"
    ],
    ideas: [
        "Попробуйте темы: цели на неделю, идеи для проектов, благодарности, интересные цитаты 📚",
        "Как насчет заметок о прочитанных книгах, встреченных людях или посещенных местах? 🌍",
        "Можете вести дневник настроения, список желаний или планы на будущее ✨"
    ],
    organization: [
        "Разбейте большие задачи на мелкие шаги - так проще начать действовать 🎯",
        "Используйте теги и категории для сортировки заметок. Это поможет быстрее находить нужное 🏷️",
        "Создавайте шаблоны для часто используемых типов заметок - это сэкономит время ⚡"
    ],
    productivity: [
        "Ставьте таймер на 25 минут для фокусировки на одной задаче (техника Pomodoro) ⏰",
        "Начинайте день с самой важной задачи - это даст чувство accomplishment ☀️",
        "Регулярно пересматривайте старые заметки - это помогает освежить идеи 🔄"
    ],
    motivation: [
        "Каждая маленькая заметка - это шаг к большим целям! Продолжайте в том же духе 💪",
        "Помните: даже самые успешные люди начинали с маленьких шагов. Вы на правильном пути! 🌟",
        "Ваши мысли ценны - продолжайте их записывать! Каждая идея может изменить мир ✨"
    ],
    default: [
        "Интересный вопрос! Давайте подумаем вместе... Может, попробовать разбить задачу на этапы?",
        "Хм, хорошая мысль! Что если посмотреть на это под другим углом?",
        "Отличный вопрос! Давайте рассмотрим несколько возможных подходов..."
    ]
}

const sendMessage = () => {
    if (!userInput.value.trim()) return

    // Добавление сообщения пользователя
    chatHistory.value.push({
        sender: 'user',
        text: userInput.value
    })

    const userMessage = userInput.value.toLowerCase()
    userInput.value = ''

    // Имитация загрузки
    const loadingMessage = {
        sender: 'ai',
        text: 'Думаю...'
    }
    chatHistory.value.push(loadingMessage)

    scrollToBottom()

    // Имитация ответа ИИ с задержкой
    setTimeout(() => {
        chatHistory.value.pop() // Удаляем сообщение "Думаю..."

        let response = ''

        // Определяем тип запроса и выбираем соответствующий ответ
        if (userMessage.includes('привет') || userMessage.includes('здравствуй') || userMessage.includes('hi') || userMessage.includes('hello')) {
            response = getRandomResponse(aiResponses.greeting)
        } else if (userMessage.includes('помощ') || userMessage.includes('help') || userMessage.includes('?')) {
            response = getRandomResponse(aiResponses.help)
        } else if (userMessage.includes('иде') || userMessage.includes('тема') || userMessage.includes('о чем')) {
            response = getRandomResponse(aiResponses.ideas)
        } else if (userMessage.includes('организац') || userMessage.includes('структур') || userMessage.includes('сортиров')) {
            response = getRandomResponse(aiResponses.organization)
        } else if (userMessage.includes('продуктив') || userMessage.includes('эффектив') || userMessage.includes('сосредоточ')) {
            response = getRandomResponse(aiResponses.productivity)
        } else if (userMessage.includes('мотивац') || userMessage.includes('вдохнов') || userMessage.includes('устал')) {
            response = getRandomResponse(aiResponses.motivation)
        } else {
            response = getRandomResponse(aiResponses.default)
        }

        chatHistory.value.push({
            sender: 'ai',
            text: response
        })

        scrollToBottom()
    }, 1000 + Math.random() * 1000) // Случайная задержка между 1-2 секундами
}

const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
}

const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}
</script>