<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Глобальные настройки приложения
useHead({
  title: 'Notionize - Умные заметки',
  meta: [
    { name: 'description', content: 'Современное приложение для создания и управления заметками с AI помощником' },
  ],
})
</script>