document.addEventListener('DOMContentLoaded', function () {
    //Botón para abrir y cerrar el menú 
    const btnClaro_Oscuro = document.getElementById('menu-toggle');
    const menuContenido = document.getElementById('dropdownContenido');

    if (!btnClaro_Oscuro || !menuContenido) return;

    btnClaro_Oscuro.checked = false;
    menuContenido.style.display = 'none'; 
    //El campo display empieza en none para que no se mueste el menú al abrir la pagína

    //Función que se activa al hacer click en el botón
    btnClaro_Oscuro.addEventListener('change', () => {
        if (btnClaro_Oscuro.checked) {
            //Despliegue del menú usando add() y modificando los campos necesarios
            menuContenido.classList.remove('fondo-cierra-menu');
            menuContenido.classList.add('dropdown-contenido');
            //display = flex permite mostrar el menú, los otros campos organizan la posición del menú
            menuContenido.style.display = 'flex';
            menuContenido.style.flexDirection = 'column';
            menuContenido.style.alignItems = 'center';
        } else {
            //Cierre del menú, eliminando la clase que permite que se muestre
            menuContenido.classList.remove('dropdown-contenido');
            menuContenido.classList.add('fondo-cierra-menu');
            menuContenido.style.display = 'none';
        }
    });


});