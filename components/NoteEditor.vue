<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Форма создания заметки -->
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {{ editingNoteId ? 'Редактировать заметку' : 'Создать новую заметку' }}
            </h2>

            <div class="space-y-4">
                <!-- Заголовок -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Заголовок
                    </label>
                    <input v-model="currentNote.title" placeholder="Введите заголовок..."
                        class="w-full text-lg font-medium p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                </div>

                <!-- Текст заметки -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Текст заметки
                    </label>
                    <textarea v-model="currentNote.content" placeholder="Начните писать свою заметку здесь..."
                        class="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"></textarea>
                </div>

                <!-- Выбор цвета заметки -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Цвет заметки
                    </label>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="color in noteColors" :key="color.name" @click="currentNote.color = color.class"
                            class="w-8 h-8 rounded border transition-colors" :class="[
                                color.class,
                                currentNote.color === color.class
                                    ? 'ring-2 ring-purple-500 ring-offset-2'
                                    : 'border-gray-300 dark:border-gray-600'
                            ]" :title="color.name"></button>
                    </div>
                </div>

                <!-- Напоминание -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Напоминание
                    </label>
                    <div class="flex flex-col sm:flex-row gap-3">
                        <input v-model="currentNote.reminderDate" type="datetime-local"
                            class="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                        <button v-if="currentNote.reminderDate" @click="clearReminder"
                            class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
                            Удалить напоминание
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Установите дату и время для напоминания
                    </p>
                </div>

                <!-- Загрузка изображения -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Добавить изображение
                    </label>
                    <input type="file" accept="image/*" @change="handleImageUpload"
                        class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-purple-500 file:text-white hover:file:bg-purple-600" />
                </div>

                <!-- Предпросмотр изображения -->
                <div v-if="currentNote.image" class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Предпросмотр:</p>
                    <div class="relative inline-block">
                        <img :src="currentNote.image" class="max-w-xs rounded border">
                        <button @click="removeImage"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Кнопки действий -->
                <div class="flex gap-3 pt-2">
                    <button @click="saveNote"
                        class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        {{ editingNoteId ? 'Обновить' : 'Создать' }} заметку
                    </button>

                    <button v-if="editingNoteId" @click="cancelEdit"
                        class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Отмена
                    </button>

                    <button v-if="!editingNoteId" @click="clearForm"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
                        Очистить
                    </button>

                    <!-- Кнопка применения шаблона -->
                    <button v-if="!editingNoteId" @click="applyTemplateFromStorage"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Использовать шаблон
                    </button>
                </div>
            </div>
        </div>

        <!-- Список заметок -->
        <div v-if="notes.length > 0" class="mb-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                    Мои заметки
                </h2>
                <div class="flex items-center space-x-4">
                    <div
                        class="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                        Всего: {{ notes.length }}
                    </div>
                    <div v-if="pendingRemindersCount > 0"
                        class="text-sm text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded">
                        Напоминаний: {{ pendingRemindersCount }}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="note in notes" :key="note.id"
                    class="rounded-lg border shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md"
                    :class="[note.color, 'border-gray-200 dark:border-gray-600']" :id="`note-${note.id}`">
                    <div class="p-4 flex-grow">
                        <!-- Заголовок с напоминанием -->
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="font-semibold text-gray-800 dark:text-white flex-1">
                                {{ note.title }}
                            </h3>
                            <div v-if="note.reminderDate" class="flex items-center space-x-1 text-orange-500 ml-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Текст -->
                        <p class="text-gray-600 dark:text-gray-300 mb-3 whitespace-pre-wrap line-clamp-3">
                            {{ note.content }}
                        </p>

                        <!-- Напоминание -->
                        <div v-if="note.reminderDate"
                            class="mb-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                            <div class="flex items-center space-x-2 text-sm">
                                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-orange-700 dark:text-orange-300">
                                    {{ formatReminderDate(note.reminderDate) }}
                                </span>
                            </div>
                        </div>

                        <!-- Изображение -->
                        <img v-if="note.image" :src="note.image"
                            class="w-full h-40 object-cover rounded mb-3 border border-gray-200 dark:border-gray-600" />
                    </div>

                    <!-- Кнопки действий -->
                    <div
                        class="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                        <button @click="editNote(note)"
                            class="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Редактировать</span>
                        </button>
                        <button @click="deleteNote(note.id)"
                            class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Удалить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Сообщение когда нет заметок -->
        <div v-else class="text-center py-12">
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Заметок пока нет</h3>
                <p class="text-gray-500 dark:text-gray-400">Создайте свою первую заметку!</p>
            </div>
        </div>

        <!-- Уведомления о напоминаниях -->
        <div v-if="activeReminder"
            class="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p class="font-semibold">Напоминание!</p>
                    <p class="text-sm">{{ activeReminder.title }}</p>
                </div>
                <button @click="dismissReminder" class="text-white hover:text-orange-200 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// Цвета для заметок
const noteColors = [
    { name: 'Белый', class: 'bg-white dark:bg-gray-800' },
    { name: 'Фиолетовый', class: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Розовый', class: 'bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Голубой', class: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Зеленый', class: 'bg-green-50 dark:bg-green-900/20' },
    { name: 'Желтый', class: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { name: 'Оранжевый', class: 'bg-orange-50 dark:bg-orange-900/20' }
]

const notes = ref([])
const currentNote = ref({
    title: '',
    content: '',
    image: null,
    color: noteColors[0].class,
    reminderDate: '',
    createdAt: new Date().toISOString()
})
const editingNoteId = ref(null)
const activeReminder = ref(null)
const pendingRemindersCount = ref(0)

// Загрузка заметок из localStorage
onMounted(() => {
    const saved = localStorage.getItem('notes')
    if (saved) {
        notes.value = JSON.parse(saved)
        checkReminders()
    }

    // Проверяем напоминания каждую минуту
    setInterval(checkReminders, 60000)

    // Применяем шаблон если он был выбран
    applyTemplateFromStorage()
})

// Проверка напоминаний
const checkReminders = () => {
    const now = new Date()
    const upcomingReminders = notes.value.filter(note => {
        if (!note.reminderDate) return false
        const reminderTime = new Date(note.reminderDate)
        const timeDiff = reminderTime.getTime() - now.getTime()
        // Показываем уведомление за 1 минуту до и в течение 5 минут после
        return timeDiff <= 300000 && timeDiff >= -300000
    })

    pendingRemindersCount.value = notes.value.filter(note => {
        if (!note.reminderDate) return false
        return new Date(note.reminderDate) > now
    }).length

    if (upcomingReminders.length > 0 && !activeReminder.value) {
        activeReminder.value = upcomingReminders[0]
    }
}

const dismissReminder = () => {
    activeReminder.value = null
}

const formatReminderDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Сохранение в localStorage при изменении
watch(notes, (newVal) => {
    localStorage.setItem('notes', JSON.stringify(newVal))
}, { deep: true })

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('Размер изображения не должен превышать 5MB')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            currentNote.value.image = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeImage = () => {
    currentNote.value.image = null
}

const clearReminder = () => {
    currentNote.value.reminderDate = ''
}

const saveNote = () => {
    if (!currentNote.value.title.trim()) {
        alert('Пожалуйста, введите заголовок заметки')
        return
    }

    if (editingNoteId.value) {
        const index = notes.value.findIndex(note => note.id === editingNoteId.value)
        if (index !== -1) {
            notes.value[index] = {
                ...currentNote.value,
                updatedAt: new Date().toISOString()
            }
        }
    } else {
        notes.value.unshift({
            id: Date.now(),
            ...currentNote.value,
            createdAt: new Date().toISOString()
        })
    }

    resetForm()
    checkReminders()
}

const editNote = (note) => {
    currentNote.value = { ...note }
    editingNoteId.value = note.id
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteNote = (id) => {
    if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
        notes.value = notes.value.filter(note => note.id !== id)
        checkReminders()
    }
}

const cancelEdit = () => {
    resetForm()
}

const clearForm = () => {
    if (confirm('Очистить форму?')) {
        resetForm()
    }
}

const applyTemplateFromStorage = () => {
    const templateJson = localStorage.getItem('selectedTemplate')
    if (templateJson) {
        const template = JSON.parse(templateJson)
        currentNote.value.content = template.content
        currentNote.value.title = template.title
        localStorage.removeItem('selectedTemplate')
    }
}

const resetForm = () => {
    currentNote.value = {
        title: '',
        content: '',
        image: null,
        color: noteColors[0].class,
        reminderDate: '',
        createdAt: new Date().toISOString()
    }
    editingNoteId.value = null
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
}
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>