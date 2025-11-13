<template>
    <div v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" @click.self="$emit('close')">
        <div class="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300"
            :class="isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
            <!-- Header -->
            <div class="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

            <div class="p-6 max-h-[80vh] overflow-y-auto">
                <!-- Note Header -->
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-2xl font-bold text-light-text dark:text-dark-text pr-4 break-words">{{ note.title }}
                    </h2>
                    <button @click="$emit('close')"
                        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 ml-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Note Content -->
                <div class="prose dark:prose-invert max-w-none mb-6">
                    <div
                        class="text-light-text/80 dark:text-dark-text/80 leading-relaxed whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        {{ note.content }}
                    </div>
                </div>

                <!-- Note Image -->
                <div v-if="note.image" class="mb-6">
                    <div class="flex justify-center">
                        <img :src="note.image" class="max-w-full max-h-96 object-contain rounded-xl shadow-lg">
                    </div>
                </div>

                <!-- Note Metadata -->
                <div
                    class="flex items-center justify-between text-sm text-light-text/60 dark:text-dark-text/60 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div class="flex items-center space-x-4 flex-wrap">
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            <span>Создано: {{ formatDateTime(note.createdAt) }}</span>
                        </div>
                        <div class="flex items-center space-x-1" v-if="note.updatedAt !== note.createdAt">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                            <span>Обновлено: {{ formatDateTime(note.updatedAt) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div
                class="flex justify-between space-x-3 p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div class="flex space-x-3">
                    <button @click="handleEdit"
                        class="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                        <span>Изменить</span>
                    </button>

                    <button @click="handleDelete"
                        class="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                        <span>Удалить</span>
                    </button>
                </div>

                <div class="flex space-x-3">
                    <button @click="handleCopy"
                        class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span>{{ copyButtonText }}</span>
                    </button>

                    <button @click="$emit('close')"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
    note: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['close', 'copy', 'edit', 'delete'])

const copyButtonText = ref('Копировать')

const handleCopy = async () => {
    const content = `Заголовок: ${props.note.title}\n\n${props.note.content}`

    try {
        await navigator.clipboard.writeText(content)
        copyButtonText.value = 'Скопировано!'
        setTimeout(() => {
            copyButtonText.value = 'Копировать'
        }, 2000)
    } catch (err) {
        console.error('Ошибка копирования: ', err)
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea')
        textArea.value = content
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        copyButtonText.value = 'Скопировано!'
        setTimeout(() => {
            copyButtonText.value = 'Копировать'
        }, 2000)
    }
}

const handleEdit = () => {
    emit('edit', props.note)
    emit('close')
}

const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
        emit('delete', props.note.id)
        emit('close')
    }
}

const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>