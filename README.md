# PP6 Rule Generator

Una sencilla aplicación web para generar "Simba PP6 Rules" basadas en la configuración del usuario. La aplicación permite dos modos de cálculo: por cuotas (Instalments) y por porcentajes.

## Características

- **Dos Modos de Cálculo:**
  - **Instalments:** Calcula las reglas basándose en una tarifa mensual para diferentes rangos.
  - **Porcentajes:** Calcula las reglas basándose en un porcentaje por número de cuotas.
- **Pegado Rápido:** Permite pegar datos directamente desde una hoja de cálculo de Excel para rellenar la tabla de tarifas mensuales.
- **Generación Dinámica:** La tabla de datos y las reglas de Simba se actualizan automáticamente a medida que se introducen los datos.
- **Copiar al Portapapeles:** Un botón para copiar fácilmente las reglas generadas.
- **Interfaz Moderna:** Una interfaz de usuario limpia, moderna y responsiva.

## Cómo Usar

1.  **Abrir la aplicación:** Simplemente abre el archivo `index.html` en tu navegador web preferido.
2.  **Seleccionar Modo:** Elige entre el modo "Instalments" o "Porcentajes %".
3.  **Introducir Datos:**
    - **Modo Instalments:**
        1.  Ajusta el **Límite** si es necesario.
        2.  Pega los datos de la columna de "Fee Mensual" en el área de texto del paso 2.
        3.  Pulsa **"Cargar tabla"** para rellenar la "Tabla de Datos".
        4.  Ajusta los valores en la tabla si es necesario.
    - **Modo Porcentajes %:**
        1.  Selecciona el tipo: "Nacional" o "Internacional".
        2.  Introduce los porcentajes para cada número de cuota en la tabla.
4.  **Obtener Resultados:** Las reglas de Simba se generan automáticamente en el panel de la derecha.
5.  **Copiar Resultados:** Usa el botón **"Copiar al Portapapeles"** para copiar las reglas generadas.

## Tecnologías Utilizadas

- **HTML5**
- **CSS3** (con variables CSS para una fácil personalización)
- **JavaScript** (Vanilla JS, sin frameworks)
