import { ref, onMounted } from 'vue'

export const useNotes = () => {
    const notes = ref([])

    // Загрузка заметок из localStorage
    const loadNotes = () => {
        const savedNotes = localStorage.getItem('purple-notes')
        if (savedNotes) {
            notes.value = JSON.parse(savedNotes)
        }
    }

    // Сохранение заметок в localStorage
    const saveNotes = () => {
        localStorage.setItem('purple-notes', JSON.stringify(notes.value))
    }

    // Добавление заметки
    const addNote = (note) => {
        notes.value.unshift(note)
        saveNotes()
    }

    // Удаление заметки
    const deleteNote = (id) => {
        notes.value = notes.value.filter(note => note.id !== id)
        saveNotes()
    }

    // Обновление заметки
    const updateNote = (id, updatedNote) => {
        const index = notes.value.findIndex(note => note.id === id)
        if (index !== -1) {
            notes.value[index] = { ...notes.value[index], ...updatedNote }
            saveNotes()
        }
    }

    // Загрузка при монтировании
    onMounted(() => {
        loadNotes()
    })

    return {
        notes,
        addNote,
        deleteNote,
        updateNote
    }
}