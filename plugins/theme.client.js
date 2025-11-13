export default defineNuxtPlugin(() => {
    // Установка темы при загрузке приложения
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
        document.documentElement.classList.remove('dark')
    } else {
        // Системная тема по умолчанию
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }
})