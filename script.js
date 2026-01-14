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

const loginContainer = document.getElementById('login-container');
const sessionContainer = document.getElementById('session-container');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const clearBtn = document.getElementById('clear-btn');
const displayName = document.getElementById('display-name');
const streakCount = document.getElementById('streak-count');

const STORAGE_KEY_USER = 'memestalgia_user';
const STORAGE_KEY_STREAK = 'memestalgia_streak';
const STORAGE_KEY_LAST_VISIT = 'memestalgia_last_visit';

function initSession() {
    const user = localStorage.getItem(STORAGE_KEY_USER);
    
    if (user) {
        updateStreak();
        showSessionUI(user);
    } else {
        showLoginUI();
    }
}

function updateStreak() {
    const lastVisit = localStorage.getItem(STORAGE_KEY_LAST_VISIT);
    const today = new Date().toDateString();
    let currentStreak = parseInt(localStorage.getItem(STORAGE_KEY_STREAK) || 0);

    if (!lastVisit) {
        currentStreak = 1;
    } else if (lastVisit !== today) {
        const lastDate = new Date(lastVisit);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentStreak++;
        } else {
            currentStreak = 1;
        }
    }

    localStorage.setItem(STORAGE_KEY_STREAK, currentStreak);
    localStorage.setItem(STORAGE_KEY_LAST_VISIT, today);
    

    streakCount.innerText = currentStreak;
}

function handleLogin() {
    const name = usernameInput.value.trim();
    if (!name) return;

    localStorage.setItem(STORAGE_KEY_USER, name);

    localStorage.setItem(STORAGE_KEY_STREAK, 1);
    localStorage.setItem(STORAGE_KEY_LAST_VISIT, new Date().toDateString());
    
    showSessionUI(name);
    streakCount.innerText = 1;
}

function handleClear() {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_STREAK);
    localStorage.removeItem(STORAGE_KEY_LAST_VISIT);
    usernameInput.value = '';
    showLoginUI();
}

function showLoginUI() {
    loginContainer.classList.remove('hidden');
    sessionContainer.classList.add('hidden');
}

function showSessionUI(name) {
    displayName.innerText = name;
    loginContainer.classList.add('hidden');
    sessionContainer.classList.remove('hidden');
}

loginBtn.addEventListener('click', handleLogin);
clearBtn.addEventListener('click', handleClear);

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

initSession();
