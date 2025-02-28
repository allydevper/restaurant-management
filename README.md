# Gestión de Restaurantes

Este proyecto, **restaurant-management**, está actualmente en la versión **0.0.1**. Fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.1.3.

## Descripción del Proyecto

El proyecto "Gestión de Restaurantes" es una aplicación demo web diseñada para facilitar la administración de restaurantes. Permite gestionar pedidos, menús, y reservas, proporcionando una interfaz amigable para los usuarios y administradores.
![alt text](https://github.com/allydevper/restaurant-management/blob/master/demo.gif)

Esta consume una api que conecta con la bd la cual es https://github.com/allydevper/api-restaurant-management

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- **`ng serve`**: Ejecuta la aplicación en modo desarrollo. Abre [http://localhost:4200](http://localhost:4200) para verla en tu navegador.
- **`ng build`**: Construye la aplicación para producción en la carpeta `dist`.
- **`ng test`**: Lanza el corredor de pruebas en modo interactivo.

## Dependencias Clave

- **Angular Core**: ^18.1.0
- **PrimeNG**: ^18.0.2
- **RxJS**: ~7.8.0

## Módulos del Proyecto

El proyecto está organizado en varios módulos, cada uno con una responsabilidad específica:

- **Dashboard**: Contiene componentes relacionados con el panel de control de la aplicació
- **Menu**: Maneja los platos del restaurante.
- **Ordenes**: Gestiona los pedidos realizados en el restaurante.
- **Mesas**: Administra las mesas del restaurante.
- **Usuarios**: Maneja la información y autenticación de los usuarios.

## Servidor de Desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de Código

Ejecuta `ng generate component nombre-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de Pruebas de Extremo a Extremo

Ejecuta `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, necesitas primero añadir un paquete que implemente capacidades de pruebas de extremo a extremo.

## Más Ayuda

Para obtener más ayuda sobre Angular CLI usa `ng help` o revisa la página de [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
