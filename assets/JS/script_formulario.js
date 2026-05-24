document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // SISTEMA DE FORMULARIO - GESTIÓN DE SALA 
    // =========================================
    const form = document.getElementById('form-solicitud-sala');
    const successMessage = document.getElementById('success-message');
    const solicitudesContainer = document.getElementById('solicitudes-listado');
    const STORAGE_KEY = 'solicitudesSala';

    //
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    function getSolicitudes() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    //Mostrar las solicitudes ya registradas en panel 'Solicitudes registradas'
    function renderSolicitudes() {
        if (!solicitudesContainer) return;
        const solicitudes = getSolicitudes();

        //Mensaje que se muestra si no hay solicitudes
        if (!solicitudes.length) {
            solicitudesContainer.innerHTML = '<p class="lista-vacia">Aún no hay reservas registradas. Envía una solicitud para verlas aquí.</p>';
            solicitudesContainer.setAttribute('aria-busy', 'false');
            return;
        }

        //Graficación de las solicitudes almacenadas
        solicitudesContainer.innerHTML = solicitudes.map((solicitud, index) => {
            return `
                <article class="solicitud-card" role="article" aria-label="Reserva ${index + 1}: ${solicitud.asignatura}">
                    <h4>Reserva ${index + 1}: ${solicitud.asignatura}</h4>
                    <p><span>Profesor/a:</span> ${solicitud.nombre}</p>
                    <p><span>Fecha:</span> ${solicitud.fecha}</p>
                    <p><span>Hora de inicio:</span> ${solicitud.hora_inicio}</p>
                    <p><span>Duración:</span> ${solicitud.duracion} minutos</p>
                    <p><span>Estudiantes:</span> ${solicitud.cantidad}</p>
                    <p><span>Motivo:</span> ${solicitud.descripcion || 'No especificado'}</p>
                </article>
            `;
        }).join('');
        solicitudesContainer.setAttribute('aria-busy', 'false');
    }

    //Mostrar mensajes de error según cada input
    function setError(input, message) {
        const err = document.getElementById('error-' + input.id);
        if (err) {
            err.textContent = message;
            // Establecer el rol de alerta para que se anuncie inmediatamente
            err.setAttribute('role', 'alert');
            err.setAttribute('aria-live', 'assertive');
        }
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
    }

    //Establecer estado ARIA de error en una entrada del formulario
    function clearError(input) {
        const err = document.getElementById('error-' + input.id);
        if (err) {
            err.textContent = '';
            err.removeAttribute('role');
            err.removeAttribute('aria-live');
        }
        input.classList.remove('input-error');
        input.setAttribute('aria-invalid', 'false');
    }

    //Validar estado de Email ingresado
    function validateEmail(email) {
        // Regex sencillo, suficiente para validación en cliente
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    //Función para envíar la solicitud (almacenarla en localStorage)
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //Actualización de atributos ARIA
        successMessage.hidden = true;
        successMessage.textContent = '';
        successMessage.setAttribute('aria-live', 'polite');

        const fields = [
            'nombre', 'asignatura', 'correo', 'fecha', 'hora_inicio', 'duracion', 'cantidad'
        ];

        let firstInvalid = null;
        let valid = true;

        //Validación de campos del formulario
        fields.forEach(function (id) {
            const input = document.getElementById(id);
            clearError(input);

            const value = (input && input.value) ? input.value.trim() : '';

            //Validar campos vacíos
            if (!value) {
                setError(input, 'Este campo es obligatorio.');
                valid = false;
                if (!firstInvalid) firstInvalid = input;
                return;
            }

            // Validaciones específicas
            if (id === 'correo' && !validateEmail(value)) {
                setError(input, 'Ingrese un correo electrónico válido (ejemplo@correo.com)');
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            }

            if (id === 'duracion') {
                const n = parseInt(value, 10);
                if (isNaN(n) || n < 30 || n > 480) {
                    setError(input, 'Duración entre 30 y 480 minutos.');
                    valid = false;
                    if (!firstInvalid) firstInvalid = input;
                }
            }

            if (id === 'cantidad') {
                const n = parseInt(value, 10);
                if (isNaN(n) || n < 1 || n > 200) {
                    setError(input, 'Ingrese una cantidad válida (1-200).');
                    valid = false;
                    if (!firstInvalid) firstInvalid = input;
                }
            }
        });

        if (!valid) {
            if (firstInvalid) {
                firstInvalid.focus();
                // Anunciar que hay errores en el formulario
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'alert');
                announcement.setAttribute('aria-live', 'assertive');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.style.position = 'absolute';
                announcement.style.left = '-10000px';
                announcement.textContent = 'El formulario tiene errores. Por favor, corrija los campos resaltados.';
                document.body.appendChild(announcement);
                setTimeout(() => announcement.remove(), 1000);
            }
            return;
        }

        // Si todo es válido, sanitizar y preparar objeto (simulación de envío)
        const solicitud = {
            nombre: escapeHTML(document.getElementById('nombre').value.trim()),
            asignatura: escapeHTML(document.getElementById('asignatura').value.trim()),
            correo: escapeHTML(document.getElementById('correo').value.trim()),
            fecha: escapeHTML(document.getElementById('fecha').value),
            hora_inicio: escapeHTML(document.getElementById('hora_inicio').value),
            duracion: parseInt(document.getElementById('duracion').value, 10),
            cantidad: parseInt(document.getElementById('cantidad').value, 10),
            descripcion: escapeHTML(document.getElementById('descripcion').value.trim())
        };

        // Guardar en localStorage
        try {
            const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            existing.push(solicitud);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

            successMessage.textContent = `Solicitud guardada localmente. Total guardadas: ${existing.length}`;
            successMessage.hidden = false;
            successMessage.focus && successMessage.focus();

            // Anunciar éxito
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = 'Solicitud guardada exitosamente';
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);

            // Limpiar formulario
            form.reset();
            renderSolicitudes();
        } catch (err) {
            console.error('Error guardando en localStorage', err);
            successMessage.textContent = 'La solicitud fue procesada, pero no se pudo guardar localmente.';
            successMessage.hidden = false;
            
            // Anunciar error
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'alert');
            announcement.setAttribute('aria-live', 'assertive');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.textContent = 'Hubo un error al guardar la solicitud';
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        }
    });

    renderSolicitudes();

    // Bloquear la letra 'e' en inputs de número (duración y cantidad)
    const inputsNumero = document.querySelectorAll('#duracion, #cantidad');
    inputsNumero.forEach(function (input) {
        input.addEventListener('keydown', function (e) {
            // Bloquear 'e', 'E' y caracteres de notación científica
            if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
            }
        });
    });

    // Limpieza inline al modificar campos
    form.querySelectorAll('input, textarea').forEach(function (el) {
        el.addEventListener('input', function () { clearError(el); });
    });
});
