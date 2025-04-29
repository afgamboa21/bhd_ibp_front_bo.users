# Reglas ESLint Personalizadas

Este documento describe las reglas personalizadas de ESLint que hemos creado para este proyecto. Estas reglas ayudan a mantener la coherencia del código y a reforzar principios arquitectónicos específicos.

## Reglas

### 1. `only-page-components-in-routes.js`

- **Propósito:** Asegura que solo los componentes cuyo nombre termine con el sufijo `Page` puedan ser cargados mediante la función `loadComponent` dentro de los archivos de definición de rutas (`*.routes.ts`).
- **Razón:** Refuerza la convención de que las rutas a nivel de página (las que se cargan directamente en el `router-outlet` principal o de un feature) deben ser componentes específicos para esa función, distinguiéndolos de componentes reutilizables más pequeños. Ayuda a identificar rápidamente los puntos de entrada de las vistas principales.
- **Mensaje de error:** `Only components ending in 'Page' should be loaded in loadComponent (found: ...}`

### 2. `clean-application-imports-in-domain.js`

- **Propósito:** Prohíbe importar módulos o archivos desde la capa de `application` (identificada por rutas que incluyen `/application/`) dentro de la capa de `domain` (identificada como archivos dentro de `/models/`).
- **Razón:** Aplica los principios de la Arquitectura Limpia (Clean Architecture) o similar. El dominio (core de negocio, modelos) no debe conocer ni depender de la capa de aplicación (casos de uso, lógica de orquestación). Las dependencias deben fluir hacia adentro (UI -> Application -> Domain).
- **Mensaje de error:** `Importing application modules from domain is not allowed.`

### 3. `clean-infrastructure-imports-in-application.js`

- **Propósito:** Prohíbe importar módulos o archivos desde la capa de `infrastructure` (identificada por rutas que incluyen `/infrastructure/`) dentro de la capa de `application`.
- **Razón:** Siguiendo la Arquitectura Limpia, la capa de aplicación define abstracciones (interfaces, puertos) que la infraestructura implementa. La aplicación no debe depender directamente de detalles de implementación concretos de la infraestructura (ej. una librería HTTP específica, un ORM concreto). Se usan interfaces definidas en la aplicación o el dominio, y la infraestructura las implementa (Inversión de Dependencias).
- **Mensaje de error:** `Importing infrastructure modules from application is not allowed.`

### 4. `clean-infrastructure-imports-in-models.js`

- **Propósito:** Prohíbe importar módulos o archivos desde la capa de `infrastructure` dentro de la capa de `domain` (identificada como archivos dentro de `/models/`).
- **Razón:** Es una restricción aún más fundamental que la anterior. El dominio, que contiene la lógica y reglas de negocio más puras, debe ser completamente independiente de cualquier detalle de infraestructura (bases de datos, APIs externas, frameworks).
- **Mensaje de error:** `Importing infrastructure modules from domain is not allowed.`

---

Estas reglas se definen en la carpeta `eslint-rules/` y se configuran en el archivo `.eslintrc.js` para ser aplicadas durante el proceso de linting.
