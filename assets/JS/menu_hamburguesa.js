//Menú Hamburguesa
window.onload = () => {
    //Obtener una referencia del botón y del menú propio
    const botonMenu = document.getElementById("btn-hamburguer");
    const menu = document.getElementById("menu-navegacion");
    
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
    });
}