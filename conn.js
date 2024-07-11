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
        console.log(isDarkMode);
        // Save Dark Mode setting to cookie
        document.cookie = `darkMode=${isDarkMode}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    // Event listener for dark mode toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);

    function saveSettings() {
        localStorage.setItem('darkMode', darkModeToggle.checked ? 'true' : 'false');
        colorPickers.forEach((picker, index) => {
            localStorage.setItem(`color${index + 1}`, picker.value);
        });
    }

    function loadSettings() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        darkModeToggle.checked = isDarkMode;
        toggleDarkMode(); // Function to apply dark mode based on the toggle state
        colorPickers.forEach((picker, index) => {
            const colorValue = localStorage.getItem(`color${index + 1}`);
            if (colorValue) {
                picker.value = colorValue;
            }
        });
    }

    darkModeToggle.addEventListener('change', () => {
        saveSettings();
        toggleDarkMode(); // Function to apply dark mode based on the toggle state
    });

    // Event listener for color picker change
    colorPickers.forEach(picker => {
        picker.addEventListener('change', saveSettings);
    });

    loadSettings();
});
