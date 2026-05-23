# Documentación de Atributos ARIA Implementados

## Resumen Ejecutivo

Se han implementado atributos ARIA dinámicos completos en el sitio web de la Escuela Laura Robles Silva para mejorar la accesibilidad para usuarios con discapacidades visuales y motoras, proporcionando una experiencia más inclusiva y conforme a WCAG 2.1.

---

## 1. Menú Hamburguesa

### Atributos Implementados

```html
<button class="hamburguer" id="btn-hamburguer" 
        aria-expanded="false" 
        aria-controls="menu-navegacion" 
        aria-label="Abrir menú de navegación">
```

### Atributos Dinámicos

- **`aria-expanded`**: Se actualiza entre `"false"` y `"true"` según el estado del menú
- **`aria-controls`**: Indica qué elemento controla el botón
- **`aria-label`**: Proporciona una etiqueta descriptiva para lectores de pantalla

### Funcionamiento

```javascript
// Cuando se hace click:
// - aria-expanded se cambia según si el menú está abierto o cerrado
// - menu-navegacion recibe aria-hidden="true/false"
```

---

## 2. Dropdown de Accesibilidad

### Atributos Implementados

```html
<button type="button" 
        aria-expanded="false" 
        aria-haspopup="menu" 
        aria-controls="dropdownContenido">

<div class="dropdown-contenido" 
     id="dropdownContenido" 
     role="menu" 
     aria-hidden="true">
```

### Atributos Dinámicos

- **`aria-expanded`**: Cambia entre `"true"` y `"false"` cuando se abre/cierra el menú
- **`aria-hidden`**: Controlado dinámicamente para ocultar/mostrar el contenido
- **`aria-haspopup`**: Indica que el botón abre un menú
- **`role="menu"`**: Define el rol semántico del contenedor

### Anuncios Dinámicos

Se implementó un sistema de anuncios para informar cambios de:
- Modo claro/oscuro: "Modo claro activado" / "Modo oscuro activado"
- Tamaño de texto: "Tamaño de texto reducido" / "Tamaño de texto normal" / "Tamaño de texto aumentado"

---

## 3. Sistema de Pestañas

### Atributos Implementados en HTML

```html
<aside class="menu-lateral" role="tablist" aria-label="Menú de secciones">
    <label role="tab" 
           aria-selected="true" 
           aria-controls="sec-sobre" 
           tabindex="0">Sobre el Colegio</label>
    <label role="tab" 
           aria-selected="false" 
           aria-controls="sec-comunicados" 
           tabindex="-1">Comunicados</label>
</aside>

<article id="sec-sobre" 
         role="tabpanel" 
         aria-labelledby="label-sobre">
```

### Atributos Dinámicos

- **`aria-selected`**: Cambia según cuál pestaña está activa
- **`tabindex`**: Se actualiza entre `0` (activo) y `-1` (inactivo) para navegación por teclado
- **`aria-controls`**: Vincula las pestañas con sus paneles correspondientes
- **`hidden`**: Atributo HTML que oculta los paneles inactivos

### Navegación por Teclado

El script `script_tabs_aria.js` implementa:
- **Flechas izquierda/arriba**: Pestaña anterior (circular)
- **Flechas derecha/abajo**: Pestaña siguiente (circular)
- **Home**: Primera pestaña
- **End**: Última pestaña
- **Enter/Space**: Activar pestaña

---

## 4. Carrusel de Imágenes

### Atributos Implementados

```html
<section class="banner-imagen" 
         role="region" 
         aria-label="Carrusel de imágenes destacadas" 
         aria-live="polite">

<label class="flecha izq" 
       aria-label="Diapositiva anterior">❮</label>
```

### Atributos Dinámicos

- **`role="region"`**: Define la sección como una región importante
- **`aria-live="polite"`**: Anuncia cambios de diapositivas sin interrumpir
- **`aria-label`**: Proporciona descripciones detalladas de las controles de navegación

---

## 5. Sección de Comunicados

### Atributos Implementados

```html
<div id="lista-comunicados" 
     class="lista-comunicados" 
     aria-live="polite" 
     aria-busy="true" 
     aria-label="Lista de comunicados">

<div class="comunicado-card" 
     data-id="1" 
     role="article">

<button class="btn-favorito" 
        aria-label="Agregar a favoritos">
```

### Atributos Dinámicos

- **`aria-busy`**: Cambia a `"true"` mientras se cargan los comunicados, `"false"` cuando termina
- **`aria-live="polite"`**: Anuncia cambios en la lista de comunicados
- **`aria-label`**: Proporciona descripciones para botones de favorito
- **`role="article"`**: Define cada comunicado como un artículo independiente

### Anuncios Dinámicos

Se anuncian automáticamente:
- "Agregado a favoritos"
- "Removido de favoritos"
- Estados de carga

---

## 6. Sección de Galería de Actividades

### Atributos Implementados

```html
<select id="meses" 
        aria-label="Seleccionar mes para ver actividades">

<div class="spinner-contenedor" 
     role="status" 
     aria-label="Cargando actividades" 
     aria-hidden="true">

<div class="contenido-mes" 
     aria-live="polite" 
     aria-label="Galería de actividades del mes seleccionado">
```

### Atributos Dinámicos

- **`aria-busy`**: Se actualiza según estado de carga
- **`aria-live="polite"`**: Anuncia cuando se carga el contenido
- **`aria-hidden="true"`**: En spinner mientras carga
- **`role="status"`**: Define spinner como elemento de estado

---

## 7. Formulario de Solicitudes

### Atributos Implementados

```html
<form id="form-solicitud-sala" 
      aria-labelledby="form-solicitud-title">
    <input type="text" 
           aria-required="true" 
           aria-describedby="error-nombre" 
           aria-invalid="false">
    <span class="error" 
          id="error-nombre" 
          aria-live="polite"></span>
</form>

<div id="success-message" 
     role="status" 
     aria-live="polite">
```

### Atributos Dinámicos

- **`aria-invalid`**: Cambia a `"true"` cuando hay errores de validación
- **`aria-live="polite"`**: En campos de error para anunciar errores
- **`role="alert"`**: En campos de error para anunciar validaciones urgentes
- **`aria-live="assertive"`**: Para mensajes de error críticos
- **`role="status"`**: Para mensajes de éxito

### Anuncios Dinámicos

Se anuncian automáticamente:
- Errores de validación (inmediato con `assertive`)
- Mensajes de éxito
- Resumen de errores en el formulario

---

## 8. Navegación Principal

### Atributos Implementados

```html
<nav class="navegacion" 
     id="menu-navegacion" 
     aria-label="Navegación principal">
```

---

## Guía de Implementación para Desarrolladores Futuros

### Patrones Comunes

1. **Para elementos que se abren/cierran**:
   ```javascript
   elemento.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
   ```

2. **Para listas dinámicas**:
   ```javascript
   lista.setAttribute('aria-busy', 'true');
   // Actualizar contenido
   lista.setAttribute('aria-busy', 'false');
   ```

3. **Para anuncios de cambios de estado**:
   ```javascript
   const announcement = document.createElement('div');
   announcement.setAttribute('role', 'status');
   announcement.setAttribute('aria-live', 'polite');
   announcement.style.position = 'absolute';
   announcement.style.left = '-10000px'; // Oculto visualmente
   announcement.textContent = 'Mensaje para usuarios de lectores de pantalla';
   document.body.appendChild(announcement);
   setTimeout(() => announcement.remove(), 1000);
   ```

### Valores Recomendados de `aria-live`

- **`polite`**: Para cambios no urgentes que pueden esperar a que termine de hablar el lector
- **`assertive`**: Para cambios urgentes que deben interrumpir inmediatamente
- **`off`**: Para elementos que no necesitan anuncios (valor por defecto)

### Testeo de Accesibilidad

Para verificar que los atributos ARIA funcionan correctamente:

1. **Con NVDA (gratis)**:
   - Descargar desde https://www.nvaccess.org/
   - Probar navegación con lector de pantalla activado

2. **Con JAWS** (pago):
   - Software profesional de lectura de pantalla

3. **Con navegador**:
   - DevTools > Accesibilidad para ver árbol ARIA

4. **Con validadores**:
   - WebAIM: https://wave.webaim.org/
   - axe DevTools (extensión de Chrome/Firefox)

---

## Archivos Modificados

1. **index.html**: Atributos ARIA en HTML
2. **assets/JS/menu_hamburguesa.js**: Actualización dinámica de `aria-expanded`
3. **assets/JS/menu_accesibilidad.js**: Anuncios de cambios de tema y tamaño de texto
4. **assets/JS/script_seccion_comunicados.js**: `aria-live` y `aria-busy` en listas dinámicas
5. **assets/JS/script_formulario.js**: Validación con `aria-invalid` y anuncios de error
6. **assets/JS/script_tabs_aria.js**: Sistema completo de pestañas con ARIA y navegación por teclado

---

## Referencias y Estándares

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **WAI-ARIA**: https://www.w3.org/WAI/ARIA/apg/
- **Authoring Practices Guide**: https://www.w3.org/WAI/ARIA/apg/patterns/

---

## Compatibilidad

- ✅ NVDA (Windows)
- ✅ JAWS (Windows)
- ✅ VoiceOver (macOS/iOS)
- ✅ TalkBack (Android)
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)

---

**Última actualización**: Mayo 2026
**Versión**: 1.0
