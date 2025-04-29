# Guía General y Recomendaciones del Proyecto

## Filosofía general

Buscamos seguir las mejores prácticas recomendadas para aplicaciones Angular, priorizando la modularidad, la separación de responsabilidades y la legibilidad del código. Queremos que sea fácil encontrar dónde está cada cosa y cómo se conectan las diferentes partes de la aplicación.

## Estructura de carpetas principal (`src/`)

Dentro de la carpeta `src/`, encontrarás la siguiente estructura:

- **`app/`**: Aquí vive toda nuestra lógica, componentes, rutas, servicios y utilidades. Su estructura la detallamos a continuación.
- **`theme/` o `styles.css` (o `.scss`)**: Archivos de estilos globales o que definen el tema general de la aplicación. Es importante mantenerlos organizados.
- **`main.ts`**: El punto de entrada de la aplicación. Aquí se arranca (`bootstrapApplication`) el componente raíz (`AppComponent`) y se configuran los providers globales definidos en `app.config.ts`.
- **`index.html`**: El HTML principal de la aplicación.

## Dentro de la carpeta `src/app/`

Esta es la carpeta donde pasaremos la mayor parte del tiempo:

- **`app.component.ts`**: El componente raíz de la aplicación. Suele contener el `<router-outlet>` principal y la estructura básica de la página.
- **`app.config.ts`**: Archivo **fundamental**. Define los providers globales de la aplicación (configuración de rutas, interceptores HTTP, servicios singleton, etc.) que se usan al arrancar la aplicación en `main.ts`. Es el equivalente moderno a la sección `providers` del antiguo `AppModule`.
- **`app.routes.ts`**: Define las rutas principales de la aplicación. Desde aquí se configuran las rutas y se importan (o cargan perezosamente) las rutas de los diferentes features.

- **`core/`**:

  - **Propósito:** Contiene la lógica fundamental y los servicios _singleton_ de la aplicación. Aunque no hay un `CoreModule`, esta carpeta sigue siendo útil para organizar servicios que deben existir una sola vez (ej: logging, manejo de datos globales)..
  - **Contenido Típico:** Servicios singleton (`providedIn: 'root'` o provistos en `app.config.ts`), interceptores HTTP, guards globales, constantes principales.

- **`shared/`**:

  - **Propósito:** Es el hogar de todo aquello que se **reutiliza** en diferentes partes de la aplicación: componentes, directivas, pipes y, muy importante, las **utilidades generales**.
  - **`shared/utils/`**: Sigue siendo el lugar ideal para centralizar funciones auxiliares reutilizables.
    - **Ejemplo: `shared/utils/date.ts`**: Mantenemos la abstracción sobre librerías de terceros. Creamos wrappers para desacoplar el resto de la app de la librería específica (ejemplo: `@formkit/tempo` que es una librería para el manejo de fechas). Si cambiamos de librería, solo tocamos este archivo.
    - **Recomendación:** Cualquier función pura, helper o utilidad que no dependa de un servicio específico y pueda ser usada en varios lugares, debería vivir aquí (`string.utils.ts`, `validation.utils.ts`, etc.).
  - **`shared/components/`**: Componentes standalone reutilizables (presentacionales/dumb).
  - **`shared/pipes/`**: Pipes standalone reutilizables.
  - **`shared/directives/`**: Directivas standalone reutilizables.

- **`features/`**: (O carpetas con nombres de dominio: `auth/`, `users/`, `products/`)
  - **Propósito:** Cada subcarpeta representa una funcionalidad o dominio principal. Agrupan componentes, servicios específicos, páginas (rutas), y **su propio archivo de rutas** (`feature.routes.ts`).
  - **Estructura Interna:** `components/`, `pages/`, `services/`, `models/`, `feature.routes.ts`.
  - **Lazy Loading:** Las rutas definidas en `feature.routes.ts` se cargan típicamente de forma diferida (lazy load) desde `app.routes.ts` usando `loadChildren(() => import('./features/feature/feature.routes').then(m => m.FEATURE_ROUTES))`.

## Consideraciones Adicionales

- **Nomenclatura:** Sigue siendo la misma: `.component.ts`, `.service.ts`, `.pipe.ts`, `.directive.ts`. Añade `.routes.ts` para archivos de rutas.
- **Imports en Componentes:** Los componentes standalone declaran sus dependencias (otros componentes, directivas, pipes) directamente en su metadato `imports: [...]`.
- **Componentes Inteligentes vs. Tontos:** La separación sigue siendo una buena práctica. Los componentes tontos reutilizables van a `shared/components/` (si se reutilizarán únicamente dentro del feature, puede alojarse allí). Los inteligentes (contenedores de página) suelen vivir en `features/nombre-feature/pages/`.
- **Manejo de Estado:** Librerías como NgRx o incluso soluciones más simples como servicios con Signals siguen siendo válidas.
- **Pruebas:** Las pruebas unitarias (`.spec.ts`) siguen siendo esenciales. La configuración para probar componentes standalone puede variar ligeramente respecto a los basados en módulos.
