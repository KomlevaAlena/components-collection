// Функция для загрузки HTML компонентов
async function loadHTMLComponent(componentName) {
    try {
        const response = await fetch(`/src/html/${componentName}.html`)
        if (!response.ok) throw new Error('Компонент не найден')
        const html = await response.text()
        return html
    } catch (error) {
        console.error(`Ошибка загрузки компонента ${componentName}:`, error)
        return `<div>Ошибка загрузки ${componentName}</div>`
    }
}

// Загружаем компоненты при загрузке страницы
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔄 Загружаем компоненты...')
    
    // Загружаем хедер
    const headerPlaceholder = document.getElementById('header-placeholder')
    if (headerPlaceholder) {
        const headerHTML = await loadHTMLComponent('header')
        headerPlaceholder.innerHTML = headerHTML
    }
    
    // Загружаем футер
    const footerPlaceholder = document.getElementById('footer-placeholder')
    if (footerPlaceholder) {
        const footerHTML = await loadHTMLComponent('footer')
        footerPlaceholder.innerHTML = footerHTML
    }
    
    console.log('✅ Компоненты загружены!')
})