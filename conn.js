// script.js
document.addEventListener('DOMContentLoaded', () => {
    const helpModal = document.getElementById('help-modal');
    const settingsModal = document.getElementById('settings-modal');
    const backdrop = document.getElementById('backdrop');
    const closeHelp = document.getElementById('close-help');
    const closeSettings = document.getElementById('close-settings');
    const helpIcon = document.getElementById('help-icon');
    const settingsIcon = document.getElementById('settings-icon');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const colorPickers = document.querySelectorAll('.color-picker');

    // Function to show a modal
    function showModal(modal) {
        modal.style.display = 'block';
        backdrop.style.display = 'block';
    }

    // Function to hide a modal
    function hideModal(modal) {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
    }

    // Event listeners for the help modal
    helpIcon.addEventListener('click', () => showModal(helpModal));
    closeHelp.addEventListener('click', () => hideModal(helpModal));
    backdrop.addEventListener('click', () => {
        hideModal(helpModal);
        hideModal(settingsModal);
    });

    // Event listeners for the settings modal
    settingsIcon.addEventListener('click', () => showModal(settingsModal));
    closeSettings.addEventListener('click', () => hideModal(settingsModal));

    function toggleDarkMode() {
        const isDarkMode = darkModeToggle.checked;
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.querySelector('.top-bar').classList.toggle('dark-mode', isDarkMode);
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.toggle('dark-mode', isDarkMode);
        });
        document.querySelectorAll('.color-box').forEach(box => {
            box.classList.toggle('dark-mode', isDarkMode);
        });
        // Save Dark Mode setting to cookie
        document.cookie = `darkMode=${isDarkMode}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    // Event listener for dark mode toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);

    function saveColorSettings() {
        colorPickers.forEach((picker, index) => {
            const colorValue = picker.value;
            document.cookie = `color${index + 1}=${colorValue}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        });
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('change', saveColorSettings);
    });

    function loadSettings() {
        const cookies = document.cookie.split('; ');
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name === 'darkMode') {
                darkModeToggle.checked = value === 'true';
                toggleDarkMode();
            } else if (name.startsWith('color')) {
                const index = parseInt(name.substring(5)) - 1;
                colorPickers[index].value = value;
            }
        });
    }

    loadSettings();
});
