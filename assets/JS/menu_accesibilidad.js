document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    //Apartado para abrir y cerrar el menú 
    const btnMenu_Accesibilidad = document.getElementById('menu-toggle');
    const menuContenido = document.getElementById('dropdownContenido');
    const accesibilidadLabel = document.querySelector('label[for="menu-toggle"]');

    if (!btnMenu_Accesibilidad || !menuContenido) return;

    btnMenu_Accesibilidad.checked = false;
    menuContenido.style.display = 'none'; 
    menuContenido.setAttribute('aria-hidden', 'true');
    //El campo display empieza en none para que no se mueste el menú al abrir la pagína

    //Función que se activa al hacer click en el botón
    btnMenu_Accesibilidad.addEventListener('change', () => {
        if (btnMenu_Accesibilidad.checked) {
            //Despliegue del menú usando add() y modificando los campos necesarios
            menuContenido.classList.remove('fondo-cierra-menu');
            menuContenido.classList.add('dropdown-contenido');
            //display = flex permite mostrar el menú, los otros campos organizan la posición del menú
            menuContenido.style.display = 'flex';
            menuContenido.style.flexDirection = 'column';
            menuContenido.style.alignItems = 'center';
            
            // Actualizar atributos ARIA
            menuContenido.setAttribute('aria-hidden', 'false');
            if (accesibilidadLabel) {
                accesibilidadLabel.setAttribute('aria-expanded', 'true');
            }
        } else {
            //Cierre del menú, eliminando la clase que permite que se muestre
            menuContenido.classList.remove('dropdown-contenido');
            menuContenido.classList.add('fondo-cierra-menu');
            menuContenido.style.display = 'none';
            
            // Actualizar atributos ARIA
            menuContenido.setAttribute('aria-hidden', 'true');
            if (accesibilidadLabel) {
                accesibilidadLabel.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ============================================
    //Apartado para el modo claro y oscuro
    const miStorage = window.localStorage;
    const temaGuardado = miStorage.getItem('theme');

    //Verificar último estado almacenado en localStorage
    if (temaGuardado === 'tema_oscuro') {
        document.body.classList.add('tema-oscuro');
    } else {
        document.body.classList.remove('tema-oscuro');
    }

    const btnTheme_Claro = document.getElementById('btnTheme_Claro');
    const btnTheme_Oscuro = document.getElementById('btnTheme_Oscuro');

    //Se cambia el tono de fondo según el botón que se seleccione
    if (btnTheme_Claro) {
        btnTheme_Claro.addEventListener('click', () => {
            document.body.classList.remove('tema-oscuro');
            //Almacenmiento del estado en localStorage
            miStorage.setItem('theme', 'tema_claro');
            // Anunciar cambio de tema con aria-live
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = 'Modo claro activado';
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    }

    if (btnTheme_Oscuro) {
        btnTheme_Oscuro.addEventListener('click', () => {
            document.body.classList.add('tema-oscuro');
            //Almacenmiento del estado en localStorage
            miStorage.setItem('theme', 'tema_oscuro');
            // Anunciar cambio de tema con aria-live
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = 'Modo oscuro activado';
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    }

    // ============================================
    // Apartado para cambio de tamaño de letra
    const fontSizeGuardado = miStorage.getItem('fontSize') || 'font-normal';

    // Cargar tamaño de letra guardado al iniciar la página
    document.body.classList.remove('font-pequena', 'font-normal', 'font-grande');
    document.body.classList.add(fontSizeGuardado);

    const btnFont_Pequena = document.getElementById('font-pequena');
    const btnFont_Normal = document.getElementById('font-normal');
    const btnFont_Grande = document.getElementById('font-grande');

    // Manejador para botón de letra pequeña
    if (btnFont_Pequena) {
        btnFont_Pequena.addEventListener('change', () => {
            if (btnFont_Pequena.checked) {
                document.body.classList.remove('font-normal', 'font-grande');
                document.body.classList.add('font-pequena');
                miStorage.setItem('fontSize', 'font-pequena');
                announceTextSize('Tamaño de texto reducido');
            }
        });
    }

    // Manejador para botón de letra normal
    if (btnFont_Normal) {
        btnFont_Normal.addEventListener('change', () => {
            if (btnFont_Normal.checked) {
                document.body.classList.remove('font-pequena', 'font-grande');
                document.body.classList.add('font-normal');
                miStorage.setItem('fontSize', 'font-normal');
                announceTextSize('Tamaño de texto normal');
            }
        });
    }

    // Manejador para botón de letra grande
    if (btnFont_Grande) {
        btnFont_Grande.addEventListener('change', () => {
            if (btnFont_Grande.checked) {
                document.body.classList.remove('font-pequena', 'font-normal');
                document.body.classList.add('font-grande');
                miStorage.setItem('fontSize', 'font-grande');
                announceTextSize('Tamaño de texto aumentado');
            }
        });
    }

    // Función auxiliar para anunciar cambios de tamaño de texto
    function announceTextSize(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
});