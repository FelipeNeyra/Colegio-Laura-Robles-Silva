document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // SISTEMA DE FORMULARIO - GESTIÓN DE SALA 
    // =========================================
    const form = document.getElementById('form-solicitud-sala');
    const successMessage = document.getElementById('success-message');
    const solicitudesContainer = document.getElementById('solicitudes-listado');
    const STORAGE_KEY = 'solicitudesSala';

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }
 
    function validateEmail(email) {
        // Regex sencillo, suficiente para validación en cliente
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function getSolicitudes() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function renderSolicitudes() {
        if (!solicitudesContainer) return;
        const solicitudes = getSolicitudes();
        if (!solicitudes.length) {
            solicitudesContainer.innerHTML = '<p class="lista-vacia">Aún no hay reservas registradas. Envía una solicitud para verlas aquí.</p>';
            return;
        }

        solicitudesContainer.innerHTML = solicitudes.map((solicitud, index) => {
            return `
                <article class="solicitud-card">
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
    }

    function setError(input, message) {
        const err = document.getElementById('error-' + input.id);
        if (err) err.textContent = message;
        input.classList.add('input-error');
    }

    function clearError(input) {
        const err = document.getElementById('error-' + input.id);
        if (err) err.textContent = '';
        input.classList.remove('input-error');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        successMessage.hidden = true;
        successMessage.textContent = '';

        const fields = [
            'nombre', 'asignatura', 'correo', 'fecha', 'hora_inicio', 'duracion', 'cantidad'
        ];

        let firstInvalid = null;
        let valid = true;

        fields.forEach(function (id) {
            const input = document.getElementById(id);
            clearError(input);

            const value = (input && input.value) ? input.value.trim() : '';

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
            if (firstInvalid) firstInvalid.focus();
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

            // Limpiar formulario
            form.reset();
            renderSolicitudes();
        } catch (err) {
            console.error('Error guardando en localStorage', err);
            successMessage.textContent = 'La solicitud fue procesada, pero no se pudo guardar localmente.';
            successMessage.hidden = false;
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
