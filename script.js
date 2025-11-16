const menuToggle = document.getElementById('menu-toggle')
const navMenu = document.getElementById('nav-menu')
const iframe = document.querySelector('iframe')

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-active')
})

const themeToggle = {
    themes: ['light', 'dark', 'system'],
    get currentTheme() { return localStorage.getItem('theme') || 'system' },
    set currentTheme(theme) {
        localStorage.setItem('theme', theme);
        this.updateUi(); 
    },
    updateUi: function() {
        document.documentElement.setAttribute('data-theme', this.currentTheme)
        iframe.contentWindow.document.documentElement
            .setAttribute('data-theme', this.currentTheme)

        this.element.textContent = 
            this.currentTheme.charAt(0).toUpperCase() +
            this.currentTheme.slice(1)
    },
    cycleTheme: function() {
        const currentIndex = this.themes.indexOf(this.currentTheme)
        const nextIndex = (currentIndex + 1) % this.themes.length
        this.currentTheme = this.themes[nextIndex]
    },
    get element() { return document.getElementById('theme-toggle') },
}

iframe.onload = () => themeToggle.updateUi();
