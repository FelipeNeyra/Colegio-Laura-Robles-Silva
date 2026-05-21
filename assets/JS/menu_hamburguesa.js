//Menú Hamburguesa
window.onload = () => {
    const botonMenu =
    document.getElementById("btn-hamburguer");

    const menu =
        document.getElementById("menu-navegacion");
        
    function toggleMenu() {
        menu.classList.toggle("active");
        botonMenu.classList.toggle("active");

    }

    botonMenu.addEventListener(
        "click",
        toggleMenu
    );
}