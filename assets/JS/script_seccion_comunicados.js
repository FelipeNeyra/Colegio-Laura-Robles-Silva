document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // SISTEMA DE COMUNICADOS Y FAVORITOS
    // =========================================
    const comunicadosData = [
        //Lista de comunicados establecidos
        {
            id: 1,
            titulo: "Suspensión de clases por mantenimiento",
            fecha: "2026-05-25",
            tipo: "aviso",
            descripcion: "Se suspenden las clases el próximo lunes para realizar mantenimiento de las instalaciones."
        },
        {
            id: 2,
            titulo: "Acto cívico - Aniversario de la escuela",
            fecha: "2026-05-28",
            tipo: "evento",
            descripcion: "Invitamos a toda la comunidad educativa a celebrar el 166 aniversario de nuestro establecimiento."
        },
        {
            id: 3,
            titulo: "Entrega de calificaciones parciales",
            fecha: "2026-05-20",
            tipo: "noticia",
            descripcion: "Se entregarán las evaluaciones parciales del primer semestre el próximo viernes en el horario habitual."
        },
        {
            id: 4,
            titulo: "Aviso importante: Cambio de horario PIE",
            fecha: "2026-05-18",
            tipo: "aviso",
            descripcion: "El Programa de Integración Escolar modificará sus horarios de atención a partir del próximo mes."
        },
        {
            id: 5,
            titulo: "Actividad extracurricular: Taller de artes visuales",
            fecha: "2026-06-01",
            tipo: "evento",
            descripcion: "Se abre inscripción para el nuevo taller de artes visuales. Plazas limitadas, interesados acercarse a inspectoría."
        },
        {
            id: 6,
            titulo: "Cierre por feriado nacional",
            fecha: "2026-06-10",
            tipo: "aviso",
            descripcion: "La escuela permanecerá cerrada por feriado nacional el 10 de junio."
        }
    ];

    //Función para marcar un comunicado como favorito
    const FAVORITES_KEY = 'comunicadosFavoritos';

    function obtenerFavoritos() {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    }

    function guardarFavoritos(favoritos) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
    }

    function toggleFavorito(id) {
        const favoritos = obtenerFavoritos();
        const index = favoritos.findIndex(f => f.id === id);
        console.log(index)
        if (index > -1) {
            favoritos.splice(index, 1);
        } else {
            const comunicado = comunicadosData.find(c => c.id === id);
            if (comunicado) favoritos.push(comunicado);
        }
        guardarFavoritos(favoritos);
        renderizarComunicados();
        renderizarFavoritos();
    }

    function esFavorito(id) {
        return obtenerFavoritos().some(f => f.id === id);
    }

    function filtrarComunicados() {
        const busqueda = document.getElementById('buscar-comunicados').value.toLowerCase();
        const tipo = document.getElementById('filtro-tipo').value;
        const fecha = document.getElementById('filtro-fecha').value;

        return comunicadosData.filter(comunicado => {
            const cumpleBusqueda = comunicado.titulo.toLowerCase().includes(busqueda) || 
                                   comunicado.descripcion.toLowerCase().includes(busqueda);
            const cumpleTipo = !tipo || comunicado.tipo === tipo;
            const cumpleFecha = !fecha || comunicado.fecha === fecha;
            return cumpleBusqueda && cumpleTipo && cumpleFecha;
        });
    }

    function obtenerFechaLocal(fechaISO) {
        const [year, month, day] = fechaISO.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function mostrarFecha(fechaISO) {
        return obtenerFechaLocal(fechaISO).toLocaleDateString('es-CL');
    }

    function renderizarComunicados() {
        const container = document.getElementById('lista-comunicados');
        const comunicados = filtrarComunicados();

        if (comunicados.length === 0) {
            container.innerHTML = '<p class="cargando">No se encontraron comunicados con los filtros seleccionados.</p>';
            return;
        }

        container.innerHTML = comunicados.map(comunicado => `
            <div class="comunicado-card" data-id="${comunicado.id}">
                <div class="comunicado-contenido">
                    <div class="comunicado-fecha">${mostrarFecha(comunicado.fecha)}</div>
                    <h4 class="comunicado-titulo">${comunicado.titulo}</h4>
                    <span class="comunicado-tipo">${comunicado.tipo.charAt(0).toUpperCase() + comunicado.tipo.slice(1)}</span>
                    <p class="comunicado-descripcion">${comunicado.descripcion}</p>
                </div>
                <div class="comunicado-botones">
                    <button class="btn-favorito ${esFavorito(comunicado.id) ? 'activo' : ''}" data-id="${comunicado.id}">
                        ${esFavorito(comunicado.id) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `).join('');

        // Agregar event listeners a botones de favorito
        document.querySelectorAll('.btn-favorito').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id, 10);
                toggleFavorito(id);
            });
        });
    }

    function renderizarFavoritos() {
        const container = document.getElementById('favoritos-lista');
        const favoritos = obtenerFavoritos();

        if (favoritos.length === 0) {
            container.innerHTML = '<p class="lista-vacia">Aún no tienes favoritos. Marca comunicados con ❤️</p>';
            return;
        }

        container.innerHTML = favoritos.map(favorito => `
            <div class="favorito-item" data-id="${favorito.id}">
                <div class="favorito-titulo">${favorito.titulo}</div>
                <div class="favorito-fecha">${mostrarFecha(favorito.fecha)}</div>
            </div>
        `).join('');

        // Scroll a comunicado al hacer click en favorito
        document.querySelectorAll('.favorito-item').forEach(item => {
            item.addEventListener('click', () => {
                const comunicadoCard = document.querySelector(`.comunicado-card[data-id="${item.dataset.id}"]`);
                if (comunicadoCard) {
                    comunicadoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    comunicadoCard.style.backgroundColor = 'rgba(219, 53, 61, 0.1)';
                    setTimeout(() => {
                        comunicadoCard.style.backgroundColor = '';
                    }, 1000);
                }
            });
        });
    }

    // Event listeners para filtros
    const buscarInput = document.getElementById('buscar-comunicados');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroFecha = document.getElementById('filtro-fecha');
    const btnLimpiar = document.getElementById('btn-limpiar');

    if (buscarInput) buscarInput.addEventListener('input', renderizarComunicados);
    if (filtroTipo) filtroTipo.addEventListener('change', renderizarComunicados);
    if (filtroFecha) filtroFecha.addEventListener('change', renderizarComunicados);
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            if (buscarInput) buscarInput.value = '';
            if (filtroTipo) filtroTipo.value = '';
            if (filtroFecha) filtroFecha.value = '';
            renderizarComunicados();
        });
    }

    // Renderizar comunicados y favoritos al cargar
    renderizarComunicados();
    renderizarFavoritos();
});
