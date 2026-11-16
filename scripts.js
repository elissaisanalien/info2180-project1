document.addEventListener('DOMContentLoaded', () => {
    /* =====================================================
        Dark / light mode toggle
        The button is created here so index.html needs no
        changes (the project forbids editing the HTML).
        ===================================================== */
    const root = document.documentElement;
    const STORAGE_KEY = 'theme';

    function getSavedTheme() {
        try {
        return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
        return null;
        }
    }

    function saveTheme(theme) {
        try {
        localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
        /* storage unavailable - ignore */
        }
    }

    // Light mode is the original theme; only use dark if the user chose it before
    let theme = getSavedTheme() === 'dark' ? 'dark' : 'light';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';

    function applyTheme(next) {
        theme = next;
        root.setAttribute('data-theme', theme);
        const isDark = theme === 'dark';
        toggle.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    toggle.addEventListener('click', () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveTheme(next);
    });

    const headerBar = document.querySelector('header .container') ||
                        document.querySelector('header');
    if (headerBar) {
        headerBar.appendChild(toggle);
    }
    applyTheme(theme);

    /* =====================================================
        Newsletter subscription
        ===================================================== */
    const form = document.querySelector('.newsletter form');
    const emailInput = document.querySelector('.newsletter input');
    const message = document.querySelector('.message');

    if (form && emailInput && message) {
        // Let our own messages handle validation instead of the browser popup
        form.noValidate = true;

        form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!looksValid) {
            message.textContent = 'Please enter a valid email address.';
            return;
        }

        message.textContent =
            `Thank you! Your email address ${email} has been added to our mailing list!`;
        emailInput.value = '';
        });
    }
});