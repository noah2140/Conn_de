document.addEventListener('DOMContentLoaded', () => {
    const helpModal = document.getElementById('help-modal');
    const settingsModal = document.getElementById('settings-modal');
    const backdrop = document.getElementById('backdrop');
    const closeHelp = document.getElementById('close-help');
    const closeSettings = document.getElementById('close-settings');
    const helpIcon = document.getElementById('help-icon');
    const settingsIcon = document.getElementById('settings-icon');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

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
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        document.querySelector('.top-bar').classList.toggle('dark-mode');
        document.querySelector('.top-bar').classList.toggle('light-mode');
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.toggle('dark-mode');
            modal.classList.toggle('light-mode');
        });
        document.querySelectorAll('.color-box').forEach(box => {
            box.classList.toggle('dark-mode');
            box.classList.toggle('light-mode');
        });
    }

    // Event listener for dark mode toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);
});