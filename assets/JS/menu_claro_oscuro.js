document.addEventListener('DOMContentLoaded', function () {
    //Botón para abrir y cerrar el menú 
    const btnMenu_Accesibilidad = document.getElementById('menu-toggle');
    const menuContenido = document.getElementById('dropdownContenido');

    if (!btnMenu_Accesibilidad || !menuContenido) return;

    btnMenu_Accesibilidad.checked = false;
    menuContenido.style.display = 'none'; 
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
        } else {
            //Cierre del menú, eliminando la clase que permite que se muestre
            menuContenido.classList.remove('dropdown-contenido');
            menuContenido.classList.add('fondo-cierra-menu');
            menuContenido.style.display = 'none';
        }
    });

    miStorage = window.localStorage;
    const temaGuardado = miStorage.getItem('theme');
    console.log(temaGuardado)

    if (temaGuardado == "tema_oscuro") {
        document.body.classList.add('tema-oscuro');
    }

    const btnTheme_Claro = document.getElementById('btnTheme_Claro');
    const btnTheme_Oscuro = document.getElementById('btnTheme_Oscuro');

    btnTheme_Claro.addEventListener('click', () => {
        document.body.classList.remove('tema-oscuro');
        let temaActual = ["tema_claro"]
        miStorage.setItem("theme", JSON.stringify(temaActual));
    })
    
    btnTheme_Oscuro.addEventListener('click', () => {
        document.body.classList.add('tema-oscuro');
        let temaActual = ["tema_oscuro"]
        miStorage.setItem("theme", JSON.stringify(temaActual));
    })


})