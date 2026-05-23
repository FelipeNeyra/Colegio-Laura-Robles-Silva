// =========================================
// SISTEMA DE PESTAÑAS CON ARIA DINÁMICO
// =========================================

document.addEventListener('DOMContentLoaded', function () {
    const tablist = document.querySelector('[role="tablist"]');
    if (!tablist) return;

    const tabs = tablist.querySelectorAll('[role="tab"]');
    const tabInputs = document.querySelectorAll('input[name="pestanas"]');

    // Inicializar estado de tabs
    updateTabStates();

    // Event listeners para cambios de radio inputs
    tabInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateTabStates();
            
            // Anunciar cambio de pestaña
            const tabId = input.id;
            const tab = tablist.querySelector(`[for="${tabId}"]`);
            if (tab) {
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.style.position = 'absolute';
                announcement.style.left = '-10000px';
                announcement.textContent = `Pestaña seleccionada: ${tab.textContent}`;
                document.body.appendChild(announcement);
                setTimeout(() => announcement.remove(), 1000);
            }
        });
    });

    // Event listeners para navegación por teclado
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let targetTab = null;

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetTab = index === 0 ? tabs[tabs.length - 1] : tabs[index - 1];
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetTab = index === tabs.length - 1 ? tabs[0] : tabs[index + 1];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetTab = tabs[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetTab = tabs[tabs.length - 1];
                    break;
            }

            if (targetTab) {
                // Activar el radio input correspondiente
                const radioId = targetTab.getAttribute('for');
                const radio = document.getElementById(radioId);
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change', { bubbles: true }));
                    targetTab.focus();
                }
            }
        });

        tab.addEventListener('click', () => {
            const radioId = tab.getAttribute('for');
            const radio = document.getElementById(radioId);
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    });

    function updateTabStates() {
        const activeInput = document.querySelector('input[name="pestanas"]:checked');
        
        tabs.forEach(tab => {
            const tabInputId = tab.getAttribute('for');
            const isActive = tabInputId === activeInput.id;
            
            // Actualizar aria-selected
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            
            // Actualizar tabindex para navegación por teclado
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
            
            // Actualizar panel correspondiente
            const panelId = tab.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            if (panel) {
                if (isActive) {
                    panel.removeAttribute('hidden');
                } else {
                    panel.setAttribute('hidden', '');
                }
            }
        });
    }
});
