//Menú Hamburguesa
window.onload = () => {
    //Obtener una referencia del botón y del menú propio
    const botonMenu =
    document.getElementById("btn-hamburguer");

    const menu =
        document.getElementById("menu-navegacion");
    
    //Aplicar una función para poder hacer click en el botón
    botonMenu.addEventListener("click",()=>{
        //Activamos el dezplamiento y muestra del menú en CSS
        menu.classList.toggle("active");
        botonMenu.classList.toggle("active");
    })
}