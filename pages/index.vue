<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Welcome Header -->
    <div class="text-center space-y-4">
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Ваши мысли имеют значение
      </h1>
      <p class="text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
        Создавайте, организуйте и вдохновляйтесь. Все ваши заметки в одном прекрасном месте.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Daily Streak -->
      <!-- <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-light-text/60 dark:text-dark-text/60 font-medium">Дневная серия</p>
            <p class="text-2xl font-bold text-light-text dark:text-dark-text mt-1">{{ dailyNotesCount }}/5</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2">
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${(dailyNotesCount / 5) * 100}%` }"></div>
        </div>
        <p class="text-xs text-light-text/40 dark:text-dark-text/40 mt-2">
          {{ dailyNotesCount >= 5 ? '🎉 Серия завершена!' : `Осталось ${5 - dailyNotesCount} заметок` }}
        </p>
      </div> -->

      <!-- Total Notes -->
      <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-light-text/60 dark:text-dark-text/60 font-medium">Всего заметок</p>
            <p class="text-2xl font-bold text-light-text dark:text-dark-text mt-1">{{ notes.length }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-light-text/40 dark:text-dark-text/40 mt-2">+{{ weeklyNotesCount }} на этой неделе</p>
      </div>

      <!-- With Images -->
      <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-light-text/60 dark:text-dark-text/60 font-medium">С фото</p>
            <p class="text-2xl font-bold text-light-text dark:text-dark-text mt-1">{{ notesWithImages }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-light-text/40 dark:text-dark-text/40 mt-2">{{ notesWithImagesPercentage }}% от общего
          числа</p>
      </div>

      <!-- Recent Activity -->
      <div
        class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-light-text/60 dark:text-dark-text/60 font-medium">Активность</p>
            <p class="text-lg font-bold text-light-text dark:text-dark-text mt-1">{{ lastActivity }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6">
              </path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-light-text/40 dark:text-dark-text/40 mt-2"
          :class="{ 'text-green-500': dailyNotesCount > 0 }">
          {{ dailyNotesCount > 0 ? 'Вы продуктивны сегодня!' : 'Создайте первую заметку' }}
        </p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Note Creation & List -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Create Note Card -->
        <div
          class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div class="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-light-text dark:text-dark-text mb-4">
              {{ editingNote ? 'Редактировать заметку' : 'Новая заметка' }}
            </h2>

            <form @submit.prevent="editingNote ? updateNote() : addNote()" class="space-y-4">
              <div>
                <input v-model="newNote.title" type="text" placeholder="О чем думаете?"
                  class="w-full p-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400"
                  required>
              </div>

              <div>
                <textarea v-model="newNote.content" placeholder="Расскажите подробнее..." rows="4"
                  class="w-full p-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-light-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 resize-none"></textarea>
              </div>

              <!-- Image Upload -->
              <div class="space-y-2">
                <label
                  class="flex items-center space-x-2 text-sm font-medium text-light-text dark:text-dark-text cursor-pointer">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                  <span>Добавить фото</span>
                </label>
                <input type="file" @change="handleImageUpload" accept="image/*" class="hidden" id="image-upload"
                  ref="fileInput">
                <div @click="openFileInput"
                  class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition group">
                  <div v-if="!newNote.imagePreview" class="space-y-2">
                    <svg class="w-8 h-8 mx-auto text-gray-400 group-hover:text-purple-500 transition" fill="none"
                      stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Нажмите для загрузки изображения</p>
                  </div>
                  <div v-else class="relative">
                    <img :src="newNote.imagePreview" class="max-h-48 mx-auto rounded-lg shadow-lg">
                    <button @click.stop="removeImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition">
                      ×
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-3">
                <button v-if="editingNote" type="button" @click="cancelEdit"
                  class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Отмена
                </button>
                <button type="button" @click="resetForm"
                  class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Очистить
                </button>
                <button type="submit"
                  class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {{ editingNote ? 'Обновить заметку' : 'Создать заметку' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Notes Grid -->
        <div v-if="notes.length > 0" class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-light-text dark:text-dark-text">Ваши заметки</h3>
            <div class="flex items-center space-x-2 text-sm text-light-text/60 dark:text-dark-text/60">
              <span>Сортировка:</span>
              <select v-model="sortBy" class="bg-transparent border-none focus:ring-0" @change="sortNotes">
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NoteCard v-for="note in sortedNotes" :key="note.id" :note="note" @delete="deleteNote" @view="openNoteModal"
              @copy="copyNoteContent" @edit="editNote" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div
            class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center">
            <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Пока нет заметок</h3>
          <p class="text-light-text/60 dark:text-dark-text/60">Создайте свою первую заметку и начните творить!</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- AI Assistant -->
        <MiniAI />

        <!-- Daily Progress -->
        <div
          class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div class="p-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
          <div class="p-6">
            <h3 class="font-semibold text-light-text dark:text-dark-text mb-4 flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Дневной прогресс</span>
            </h3>

            <div class="space-y-4">
              <div v-for="day in weeklyProgress" :key="day.day" class="flex items-center justify-between">
                <span class="text-sm text-light-text dark:text-dark-text capitalize">{{ day.day }}</span>
                <div class="flex items-center space-x-2">
                  <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full transition-all duration-500"
                      :style="{ width: `${(day.notes / 5) * 100}%` }"></div>
                  </div>
                  <span class="text-xs text-light-text/60 dark:text-dark-text/60 w-6 text-right">{{ day.notes
                  }}/5</span>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-sm">
                <span class="text-light-text/60 dark:text-dark-text/60">Текущая серия:</span>
                <span class="font-semibold text-light-text dark:text-dark-text">{{ currentStreak }} дней</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div
          class="bg-white/70 dark:bg-dark-surface/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div class="p-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <div class="p-6">
            <h3 class="font-semibold text-light-text dark:text-dark-text mb-4 flex items-center space-x-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                </path>
              </svg>
              <span>Быстрая статистика</span>
            </h3>

            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-light-text/60 dark:text-dark-text/60">Всего символов:</span>
                <span class="font-semibold text-light-text dark:text-dark-text">{{ totalCharacters }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-light-text/60 dark:text-dark-text/60">Средняя длина:</span>
                <span class="font-semibold text-light-text dark:text-dark-text">{{ averageNoteLength }} симв.</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-light-text/60 dark:text-dark-text/60">Заметок сегодня:</span>
                <span class="font-semibold text-light-text dark:text-dark-text">{{ todayNotesCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Note Modal -->
    <NoteModal :isOpen="showNoteModal" :note="selectedNote" @close="closeNoteModal" @copy="copyNoteContent"
      @edit="editNote" @delete="deleteNoteFromModal" />
  </div>
</template>

<script setup>
// Состояние для новой заметки
const newNote = ref({
  title: '',
  content: '',
  image: null,
  imagePreview: ''
})

// Заметки и состояние
const notes = ref([])
const dailyNotesCount = ref(0)
const weeklyNotesCount = ref(0)
const sortBy = ref('newest')
const showNoteModal = ref(false)
const selectedNote = ref(null)
const fileInput = ref(null)
const editingNote = ref(null)

// Вычисляемые свойства
const sortedNotes = computed(() => {
  const sorted = [...notes.value]
  if (sortBy.value === 'newest') {
    return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else {
    return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }
})

const notesWithImages = computed(() => {
  return notes.value.filter(note => note.image).length
})

const notesWithImagesPercentage = computed(() => {
  return notes.value.length > 0 ? Math.round((notesWithImages.value / notes.value.length) * 100) : 0
})

const lastActivity = computed(() => {
  if (notes.value.length === 0) return 'Нет активности'
  const lastNote = sortedNotes.value[0]
  return formatRelativeTime(lastNote.updatedAt)
})

const weeklyProgress = computed(() => {
  const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  const today = new Date().getDay()
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - today + (today === 0 ? -6 : 1))

  return days.map((day, index) => {
    const dayDate = new Date(weekStart)
    dayDate.setDate(weekStart.getDate() + index)
    const dayString = dayDate.toDateString()

    const dayNotes = notes.value.filter(note => {
      const noteDate = new Date(note.createdAt).toDateString()
      return noteDate === dayString
    }).length

    return {
      day,
      notes: dayNotes
    }
  })
})

const currentStreak = computed(() => {
  // Простая логика для демонстрации
  return Math.min(dailyNotesCount.value, 7)
})

const totalCharacters = computed(() => {
  return notes.value.reduce((sum, note) => sum + (note.content?.length || 0), 0)
})

const averageNoteLength = computed(() => {
  return notes.value.length > 0 ? Math.round(totalCharacters.value / notes.value.length) : 0
})

const todayNotesCount = computed(() => {
  const today = new Date().toDateString()
  return notes.value.filter(note => new Date(note.createdAt).toDateString() === today).length
})

// Загрузка данных из localStorage
onMounted(() => {
  loadNotes()
  loadDailyStats()
})

// Функции
const openFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 5MB')
      return
    }

    newNote.value.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      newNote.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  newNote.value.image = null
  newNote.value.imagePreview = ''
  fileInput.value.value = ''
}

const resetForm = () => {
  newNote.value = {
    title: '',
    content: '',
    image: null,
    imagePreview: ''
  }
  editingNote.value = null
  fileInput.value.value = ''
}

const cancelEdit = () => {
  resetForm()
}

const addNote = () => {
  const note = {
    id: Date.now().toString(),
    title: newNote.value.title,
    content: newNote.value.content,
    image: newNote.value.imagePreview,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  notes.value.unshift(note)
  saveNotes()

  // Обновление ежедневного счетчика
  updateDailyStats()

  resetForm()
}

const updateNote = () => {
  if (!editingNote.value) return

  const index = notes.value.findIndex(note => note.id === editingNote.value.id)
  if (index !== -1) {
    notes.value[index] = {
      ...notes.value[index],
      title: newNote.value.title,
      content: newNote.value.content,
      image: newNote.value.imagePreview,
      updatedAt: new Date().toISOString()
    }
    saveNotes()
    resetForm()
  }
}

// ФУНКЦИЯ УДАЛЕНИЯ ЗАМЕТОК
const deleteNote = (noteId) => {
  console.log('Deleting note with ID:', noteId)

  if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
    // Удаляем заметку из массива
    const noteIndex = notes.value.findIndex(note => note.id === noteId)
    if (noteIndex !== -1) {
      notes.value.splice(noteIndex, 1)

      // Сохраняем изменения
      saveNotes()

      // Обновляем статистику
      updateStats()

      console.log('Заметка успешно удалена')

      // Если удаляемая заметка открыта в модальном окне, закрываем его
      if (selectedNote.value && selectedNote.value.id === noteId) {
        closeNoteModal()
      }
    } else {
      console.error('Заметка для удаления не найдена')
    }
  }
}

// Удаление из модального окна
const deleteNoteFromModal = (noteId) => {
  deleteNote(noteId)
}

const editNote = (note) => {
  editingNote.value = note
  newNote.value = {
    title: note.title,
    content: note.content,
    image: null,
    imagePreview: note.image
  }
  closeNoteModal()
  // Прокрутка к форме редактирования
  nextTick(() => {
    document.querySelector('.bg-white\\/70').scrollIntoView({ behavior: 'smooth' })
  })
}

const openNoteModal = (note) => {
  selectedNote.value = note
  showNoteModal.value = true
}

const closeNoteModal = () => {
  showNoteModal.value = false
  selectedNote.value = null
}

const copyNoteContent = async (note = null) => {
  const noteToCopy = note || selectedNote.value
  if (!noteToCopy) return

  const content = `Заголовок: ${noteToCopy.title}\n\n${noteToCopy.content}`

  try {
    await navigator.clipboard.writeText(content)
    console.log('Заметка скопирована в буфер обмена')
    return true
  } catch (err) {
    console.error('Ошибка копирования: ', err)
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea')
    textArea.value = content
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    console.log('Заметка скопирована (fallback)')
    return true
  }
}

const sortNotes = () => {
  // sortedNotes обновляется автоматически через computed свойство
}

const loadNotes = () => {
  const savedNotes = localStorage.getItem('notes')
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes)
  }
}

const loadDailyStats = () => {
  const savedDailyCount = localStorage.getItem('dailyNotesCount')
  if (savedDailyCount) {
    dailyNotesCount.value = parseInt(savedDailyCount)
  }

  // Расчет недельной статистики
  weeklyNotesCount.value = notes.value.filter(note => {
    const noteDate = new Date(note.createdAt)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return noteDate > weekAgo
  }).length

  // Сброс ежедневного счетчика если день изменился
  const lastDate = localStorage.getItem('lastNoteDate')
  const today = new Date().toDateString()
  if (lastDate !== today) {
    dailyNotesCount.value = 0
    localStorage.setItem('lastNoteDate', today)
  }
}

const updateDailyStats = () => {
  dailyNotesCount.value++
  localStorage.setItem('dailyNotesCount', dailyNotesCount.value.toString())
  localStorage.setItem('lastNoteDate', new Date().toDateString())

  // Обновление недельной статистики
  weeklyNotesCount.value = notes.value.filter(note => {
    const noteDate = new Date(note.createdAt)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return noteDate > weekAgo
  }).length
}

const updateStats = () => {
  // Обновляем все вычисляемые свойства
  weeklyNotesCount.value = notes.value.filter(note => {
    const noteDate = new Date(note.createdAt)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return noteDate > weekAgo
  }).length
}

const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

  if (diffInHours < 1) return 'Только что'
  if (diffInHours < 24) return `${diffInHours} ч. назад`
  if (diffInHours < 48) return 'Вчера'
  return `${Math.floor(diffInHours / 24)} дн. назад`
}
</script>