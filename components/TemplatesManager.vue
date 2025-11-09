<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Шаблоны заметок</h1>
            <p class="text-gray-600 dark:text-gray-400">Используйте готовые форматы для быстрого создания заметок</p>
        </div>

        <!-- Список шаблонов -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-for="template in templates" :key="template.id"
                class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                @click="applyTemplate(template)">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="template.color">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span
                        class="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                        {{ template.category }}
                    </span>
                </div>

                <h3
                    class="text-xl font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ template.title }}
                </h3>

                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {{ template.description }}
                </p>

                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ template.fields.length }} полей
                    </span>
                    <button
                        class="text-purple-500 hover:text-purple-600 font-medium text-sm flex items-center space-x-1">
                        <span>Использовать</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Создание кастомного шаблона -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Создать свой шаблон</h3>
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Название шаблона
                        </label>
                        <input v-model="newTemplate.title" type="text"
                            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="Например: Ежедневный план">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Категория
                        </label>
                        <select v-model="newTemplate.category"
                            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                            <option value="Работа">Работа</option>
                            <option value="Учеба">Учеба</option>
                            <option value="Личное">Личное</option>
                            <option value="Проекты">Проекты</option>
                            <option value="Другое">Другое</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Описание
                    </label>
                    <textarea v-model="newTemplate.description"
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                        rows="2" placeholder="Краткое описание шаблона..."></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Содержимое шаблона
                    </label>
                    <textarea v-model="newTemplate.content"
                        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none font-mono text-sm"
                        rows="6"
                        placeholder="Введите текст шаблона. Используйте [поле] для заменяемых полей."></textarea>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Используйте квадратные скобки для обозначения полей, например: [Дата], [Задача]
                    </p>
                </div>

                <button @click="createTemplate"
                    class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    Создать шаблон
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const templates = ref([
    {
        id: 1,
        title: 'Ежедневный план',
        category: 'Работа',
        description: 'Шаблон для планирования задач на день',
        color: 'bg-yellow-50 dark:bg-yellow-900/20',
        content: `📅 Ежедневный план - [Дата]

🎯 Главные цели дня:
1. [Цель 1]
2. [Цель 2]
3. [Цель 3]

✅ Задачи:
- [ ] [Задача 1]
- [ ] [Задача 2]
- [ ] [Задача 3]

💡 Идеи и заметки:
[Ваши мысли]`,
        fields: ['Дата', 'Цель 1', 'Цель 2', 'Цель 3', 'Задача 1', 'Задача 2', 'Задача 3', 'Ваши мысли']
    },
    {
        id: 2,
        title: 'Встреча',
        category: 'Работа',
        description: 'Шаблон для заметок о встрече',
        color: 'bg-blue-50 dark:bg-blue-900/20',
        content: `👥 Встреча: [Тема]

📅 Дата: [Дата встречи]
👥 Участники: [Участники]

🎯 Повестка:
1. [Пункт 1]
2. [Пункт 2]
3. [Пункт 3]

📝 Обсужденные вопросы:
• [Вопрос 1] - [Решение]
• [Вопрос 2] - [Решение]

✅ Решения и действия:
- [ ] [Действие 1] - [Ответственный] - [Срок]
- [ ] [Действие 2] - [Ответственный] - [Срок]`,
        fields: ['Тема', 'Дата встречи', 'Участники', 'Пункт 1', 'Пункт 2', 'Пункт 3', 'Вопрос 1', 'Решение', 'Вопрос 2', 'Решение', 'Действие 1', 'Ответственный', 'Срок', 'Действие 2', 'Ответственный', 'Срок']
    },
    {
        id: 3,
        title: 'Конспект книги',
        category: 'Учеба',
        description: 'Шаблон для конспектирования книг',
        color: 'bg-green-50 dark:bg-green-900/20',
        content: `📚 Конспект: "[Название книги]"
✍️ Автор: [Автор]

🌟 Основные идеи:
• [Идея 1]
• [Идея 2]
• [Идея 3]

💡 Ключевые цитаты:
"[Цитата 1]"
"[Цитата 2]"

📝 Выводы и мысли:
[Ваши мысли о книге]

⭐ Оценка: [Оценка]/10`,
        fields: ['Название книги', 'Автор', 'Идея 1', 'Идея 2', 'Идея 3', 'Цитата 1', 'Цитата 2', 'Ваши мысли о книге', 'Оценка']
    },
    {
        id: 4,
        title: 'План проекта',
        category: 'Проекты',
        description: 'Шаблон для планирования проекта',
        color: 'bg-purple-50 dark:bg-purple-900/20',
        content: `🚀 Проект: [Название проекта]

🎯 Цель проекта:
[Описание цели]

📅 Сроки:
• Начало: [Дата начала]
• Завершение: [Дата завершения]

👥 Команда:
[Участники команды]

📋 Основные этапы:
1. [Этап 1] - [Срок]
2. [Этап 2] - [Срок]
3. [Этап 3] - [Срок]

💰 Ресурсы:
[Необходимые ресурсы]

⚠️ Риски:
[Потенциальные риски]`,
        fields: ['Название проекта', 'Описание цели', 'Дата начала', 'Дата завершения', 'Участники команды', 'Этап 1', 'Срок', 'Этап 2', 'Срок', 'Этап 3', 'Срок', 'Необходимые ресурсы', 'Потенциальные риски']
    },
    {
        id: 5,
        title: 'Личные цели',
        category: 'Личное',
        description: 'Шаблон для постановки личных целей',
        color: 'bg-pink-50 dark:bg-pink-900/20',
        content: `🎯 Личные цели - [Период]

🏆 Основные цели:
1. [Цель 1] - [Срок]
2. [Цель 2] - [Срок]
3. [Цель 3] - [Срок]

📈 Показатели прогресса:
• [Показатель 1]: [Текущее значение] → [Целевое значение]
• [Показатель 2]: [Текущее значение] → [Целевое значение]

🛠️ Действия для достижения:
- [ ] [Действие 1]
- [ ] [Действие 2]
- [ ] [Действие 3]

💭 Рефлексия:
[Ваши мысли и наблюдения]`,
        fields: ['Период', 'Цель 1', 'Срок', 'Цель 2', 'Срок', 'Цель 3', 'Срок', 'Показатель 1', 'Текущее значение', 'Целевое значение', 'Показатель 2', 'Текущее значение', 'Целевое значение', 'Действие 1', 'Действие 2', 'Действие 3', 'Ваши мысли и наблюдения']
    },
    {
        id: 6,
        title: 'Идеи и вдохновение',
        category: 'Личное',
        description: 'Шаблон для записи идей и вдохновения',
        color: 'bg-orange-50 dark:bg-orange-900/20',
        content: `💡 Идея: [Название идеи]

📝 Описание:
[Подробное описание идеи]

🎯 Возможности:
• [Возможность 1]
• [Возможность 2]

🛠️ Реализация:
[Шаги для реализации]

🤔 Вопросы для размышления:
[Вопросы и сомнения]

⭐ Приоритет: [Приоритет]`,
        fields: ['Название идеи', 'Подробное описание идеи', 'Возможность 1', 'Возможность 2', 'Шаги для реализации', 'Вопросы и сомнения', 'Приоритет']
    }
])

const newTemplate = ref({
    title: '',
    category: 'Работа',
    description: '',
    content: ''
})

const applyTemplate = (template) => {
    // Сохраняем выбранный шаблон в localStorage
    localStorage.setItem('selectedTemplate', JSON.stringify(template))

    // Переходим на страницу заметок
    navigateTo('/notes')
}

const createTemplate = () => {
    if (!newTemplate.value.title || !newTemplate.value.content) {
        alert('Пожалуйста, заполните название и содержимое шаблона')
        return
    }

    const fields = extractFields(newTemplate.value.content)

    const template = {
        id: Date.now(),
        title: newTemplate.value.title,
        category: newTemplate.value.category,
        description: newTemplate.value.description,
        color: 'bg-gray-50 dark:bg-gray-900/20',
        content: newTemplate.value.content,
        fields: fields
    }

    templates.value.push(template)

    // Сбрасываем форму
    newTemplate.value = {
        title: '',
        category: 'Работа',
        description: '',
        content: ''
    }

    alert('Шаблон успешно создан!')
}

const extractFields = (content) => {
    const fieldRegex = /\[(.*?)\]/g
    const fields = []
    let match
    while ((match = fieldRegex.exec(content)) !== null) {
        if (!fields.includes(match[1])) {
            fields.push(match[1])
        }
    }
    return fields
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