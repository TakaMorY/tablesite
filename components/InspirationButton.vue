<template>
    <button @click="getInspiration"
        class="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
        title="Получить вдохновение">
        <svg class="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span
            class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-purple-900 animate-pulse">
            💡
        </span>
    </button>

    <!-- Модальное окно с цитатой -->
    <div v-if="showQuote" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-auto transform transition-all duration-500 scale-95 hover:scale-100">
            <div class="text-center">
                <div
                    class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4">Вдохновение!</h3>
                <p class="text-gray-600 dark:text-gray-300 text-lg italic mb-6 leading-relaxed">"{{ currentQuote }}"</p>
                <button @click="showQuote = false"
                    class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-colors">
                    Спасибо! 💜
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const showQuote = ref(false)
const currentQuote = ref('')

const inspirationalQuotes = [
    "Каждая великая мечта начинается с мечтателя. Всегда помните, что внутри вас есть сила, терпение и страсть, чтобы дотянуться до звезд и изменить мир.",
    "Единственный способ сделать великую работу — любить то, что вы делаете.",
    "Не ждите подходящего момента. Возьмите момент и сделайте его подходящим.",
    "Успех — это не окончательная точка, неудача — не фатально: важно мужество продолжать.",
    "Ваше время ограничено, не тратьте его, живя чужой жизнью.",
    "Будущее принадлежит тем, кто верит в красоту своей мечты.",
    "Единственные ограничения, которые существуют, — это те, что вы установили в своем сознании.",
    "Делайте то, что можете, с тем, что имеете, там, где находитесь.",
    "Не бойтесь отказываться от хорошего в пользу великого.",
    "Лучший способ предсказать будущее — создать его.",
    "Именно в самые темные моменты мы должны сосредоточиться, чтобы увидеть свет.",
    "Творчество требует смелости.",
    "Путь к успеху — это действие.",
    "Мечты не работают, пока не работаете вы.",
    "Начните оттуда, где вы находитесь. Используйте то, что у вас есть. Делайте то, что можете."
]

const getInspiration = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
    currentQuote.value = inspirationalQuotes[randomIndex]
    showQuote.value = true

    // Автоматически закрыть через 8 секунд
    setTimeout(() => {
        showQuote.value = false
    }, 8000)
}
</script>