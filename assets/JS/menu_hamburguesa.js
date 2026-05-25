//Menú Hamburguesa
window.onload = () => {
    //Obtener una referencia del botón y del menú propio
    const botonMenu = document.getElementById("btn-hamburguer");
    const menu = document.getElementById("menu-navegacion");
    console.log(menu.getAttribute("aria-hidden"))
    
    //Aplicar una función para poder hacer click en el botón
    botonMenu.addEventListener("click", () => {
        //Activamos el desplazamiento y muestra del menú en CSS
        menu.classList.toggle("active");
        botonMenu.classList.toggle("active");
        
        // Actualizar atributos ARIA dinámicamente
        const isExpanded = botonMenu.classList.contains("active");
        botonMenu.setAttribute("aria-expanded", isExpanded);
        
        // Actualizar atributo aria-hidden del menú
        if (isExpanded) {
            menu.removeAttribute("aria-hidden");
        } else {
            menu.setAttribute("aria-hidden", "true");
        }
        console.log(menu.getAttribute("aria-hidden"))
    });
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && botonMenu.classList.contains('active')) {
            botonMenu.click();
        }
    });
    
    // Cerrar menú al hacer click en un enlace de navegación (excepto dropdown)
    const navLinks = menu.querySelectorAll('.nav-link:not([for="menu-toggle"])');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (botonMenu.classList.contains('active')) {
                botonMenu.click();
            }
        });
    });
}