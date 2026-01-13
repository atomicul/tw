const menuToggle = document.getElementById('menu-toggle')
const navMenu = document.getElementById('nav-menu')
const iframe = document.querySelector('iframe')

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-active')
})

const themeToggle = {
    get currentTheme() { 
        return localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light')
    },
    set currentTheme(theme) {
        localStorage.setItem('theme', theme);
        this.updateUi(); 
    },
    updateUi: function() {
        document.documentElement.setAttribute('data-theme', this.currentTheme)
        iframe.contentWindow.document.documentElement
            .setAttribute('data-theme', this.currentTheme)

        this.icon.innerText = {
            dark: "sunny", 
            light: "bedtime"
        }[this.currentTheme]
    },
    cycleTheme: function() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
    },
    get icon() { return document.querySelector('#theme-toggle span') },
}

requestAnimationFrame(() => themeToggle.updateUi());
setTimeout(() => themeToggle.updateUi(), 500);
setTimeout(() => themeToggle.updateUi(), 1000);
iframe.onload = () => themeToggle.updateUi();

document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isInput = target.matches('input, textarea') || target.isContentEditable;
    const contentIframe = document.querySelector('iframe');

    if (isInput) {
        return;
    }

    if (event.key === '?') {
        contentIframe.contentWindow.location.href = 'doggo/';
    }
});
