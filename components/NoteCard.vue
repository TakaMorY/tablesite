<template>
    <div class="group relative bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
        @click="handleCardClick">
        <!-- Accent Border -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

        <div class="p-5">
            <!-- Header -->
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-bold text-light-text dark:text-dark-text text-lg leading-tight pr-8 line-clamp-2">{{
                    note.title }}</h3>
                <div class="flex space-x-1" @click.stop>
                    <button @click.stop="handleEdit"
                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-500 hover:text-blue-700"
                        title="Редактировать">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                    </button>
                    <button @click.stop="handleDelete"
                        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 hover:text-red-700"
                        title="Удалить">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <p class="text-light-text/70 dark:text-dark-text/70 text-sm leading-relaxed mb-4 line-clamp-3">{{
                note.content }}</p>

            <!-- Image -->
            <div v-if="note.image" class="mb-4 rounded-xl overflow-hidden shadow-inner">
                <img :src="note.image"
                    class="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105">
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between text-xs text-light-text/50 dark:text-dark-text/50">
                <span>{{ formatDate(note.updatedAt) }}</span>
                <div class="flex items-center space-x-2">
                    <button @click.stop="handleCopy"
                        class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-500">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span>{{ copyText }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Hover Effect -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['delete', 'view', 'copy', 'edit'])

const copyText = ref('Копировать')

// Клик по карточке - открываем полный просмотр
const handleCardClick = () => {
    console.log('Card clicked, opening full view for note:', props.note.id)
    emit('view', props.note)
}

// ФУНКЦИЯ УДАЛЕНИЯ
const handleDelete = () => {
    console.log('Delete button clicked for note:', props.note.id)
    emit('delete', props.note.id)
}

const handleEdit = () => {
    console.log('Edit button clicked for note:', props.note.id)
    emit('edit', props.note)
}

const handleCopy = async () => {
    console.log('Copy button clicked for note:', props.note.id)

    // Копируем текст в буфер обмена
    const content = `Заголовок: ${props.note.title}\n\n${props.note.content}`
    try {
        await navigator.clipboard.writeText(content)
        copyText.value = 'Скопировано!'
        setTimeout(() => {
            copyText.value = 'Копировать'
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
        copyText.value = 'Скопировано!'
        setTimeout(() => {
            copyText.value = 'Копировать'
        }, 2000)
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    })
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>