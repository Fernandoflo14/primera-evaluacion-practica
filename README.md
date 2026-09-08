# Examen Práctico: API REST con Express para Generar Órdenes usando Northwind en PostgreSQL

## 1. Introducción y Contexto de la Evaluación

En este examen práctico, el estudiante deberá construir una API REST funcional utilizando Express.js y PostgreSQL sobre la base de datos Northwind. La evaluación se centrará exclusivamente en la generación de órdenes de venta, utilizando las entidades relacionadas con clientes, empleados, productos, inventario y detalle de órdenes.

**Enunciado Formal del Examen:** "Desarrollo de una API REST con Express.js para generar órdenes de venta usando Northwind en PostgreSQL".

**Fechas Límite de Entrega Obligatorias:** Sábado 12 de Septiembre de 2026.

## 2. Fundamentos de API REST y Comunicación HTTP

La adherencia estricta a los estándares definidos en el **RFC 7231** no es opcional; es el fundamento de una API profesional. El protocolo HTTP opera bajo una naturaleza *stateless* (sin estado) y *connectionless* (sin conexión), lo que obliga a diseñar servicios donde cada solicitud contenga toda la información necesaria para ser procesada. Ignorar estas características resulta en sistemas frágiles y difícilmente escalables.

### Semántica de Verbos HTTP para la Generación de Órdenes

La API debe exponer únicamente los endpoints necesarios para generar órdenes usando Northwind. Como mínimo, deberá permitir consultar clientes, productos disponibles y datos necesarios para construir una orden, además de crear una orden con sus respectivos detalles. El endpoint principal deberá ser `POST /orders`, encargado de registrar la cabecera de la orden y sus líneas de detalle en las tablas correspondientes. Se evaluará que `GET` y `POST` respeten la semántica REST, retornando códigos de estado apropiados y respuestas JSON consistentes.

### Intercambio de Datos: JSON vs XML

Se exige el uso de **JSON (application/json)** para el intercambio de datos. Todas las respuestas deben mantener una estructura uniforme, incluir mensajes claros y evitar exponer información sensible de la base de datos o del servidor.

## 3. Fase A: Preparación de Northwind en PostgreSQL

El estudiante deberá trabajar sobre una instalación funcional de la base de datos Northwind en PostgreSQL. El foco estará en utilizar las tablas dependientes necesarias para generar órdenes, principalmente `customers`, `employees`, `products`, `orders` y `order_details`. No se requiere administrar todo el modelo Northwind.

**Requisitos de Base de Datos:**

- **Instalación:** Importar correctamente el esquema y datos de Northwind en PostgreSQL.
- **Conexión:** Configurar variables de entorno para host, puerto, usuario, contraseña y nombre de base de datos.
- **Consulta de datos base:** Permitir la consulta de clientes y productos necesarios para armar una orden.
- **Registro transaccional:** Insertar la orden y sus detalles de forma consistente, evitando órdenes incompletas si ocurre un error.
- **Consultas SQL:** Implementar consultas parametrizadas para evitar inyección SQL.

## 4. Fase B: Implementación de la API REST con Express.js

La API debe organizarse de forma modular, separando rutas, controladores, servicios o repositorios de acceso a datos según corresponda. Se valorará que el código sea claro, ejecutable y orientado al caso de uso principal: generar órdenes de venta en Northwind.

**Requisitos de Implementación:**

- **Endpoints mínimos:** Definir rutas como `GET /customers`, `GET /products`, `GET /orders/:id` y `POST /orders`.
- **Generación de órdenes:** Implementar la creación de una orden con cabecera y detalle, recibiendo cliente, empleado, fecha y lista de productos con cantidades.
- **Validación de productos:** Verificar que los productos enviados existan y que las cantidades sean válidas antes de registrar la orden.
- **Códigos HTTP:** Utilizar respuestas como 200, 201, 400, 404 y 500 de forma coherente.
- **Pruebas:** Presentar evidencia de pruebas de creación y consulta de órdenes con Postman, Thunder Client, REST Client o herramienta equivalente.

## 5. Fase C: Validación, Seguridad y Manejo de Errores

El examen práctico deberá demostrar que la API genera órdenes de forma controlada, valida los datos recibidos y evita inconsistencias durante el registro de la cabecera y los detalles de la orden.

**Requisitos mínimos:**

- Validar que el cliente y el empleado existan antes de crear la orden.
- Validar que cada producto exista y que la cantidad sea mayor a cero.
- Usar transacciones para evitar que se registre una cabecera sin sus detalles o detalles sin cabecera.
- Controlar errores de base de datos sin exponer detalles internos al cliente.
- Retornar mensajes JSON claros para solicitudes inválidas o recursos inexistentes.

## 6. Fase D: Prácticas de Ingeniería y Documentación

La entrega debe permitir ejecutar, revisar y probar específicamente el flujo de generación de órdenes. Se evaluará la claridad del repositorio, la documentación del endpoint principal y la evidencia de funcionamiento.

**Requisitos de entrega:**

- **Repositorio:** Código fuente organizado y con historial de commits suficiente.
- **README.md:** Instrucciones para instalar dependencias, configurar variables de entorno, iniciar el servidor y probar la generación de órdenes.
- **Archivo `.env.example`:** Plantilla de configuración sin credenciales reales.
- **Colección de pruebas:** Postman, Thunder Client o archivo equivalente con solicitudes para consultar clientes, consultar productos, crear una orden y consultar una orden creada.
- **Evidencia:** Capturas o documentación breve que muestre una orden creada exitosamente y casos de error controlados.

## 7. Rúbrica Detallada de Evaluación

La evaluación se centrará exclusivamente en la construcción de una API REST con Express.js conectada a Northwind en PostgreSQL para generar órdenes de venta.

**Puntaje total:** 100 puntos. Para aprobar, el estudiante debe demostrar que la API genera órdenes reales en Northwind de forma funcional, validada y consistente.

| Criterio de evaluación | Puntaje | Descripción de la rúbrica |
|---|---|---|
| Configuración del proyecto y conexión a PostgreSQL/Northwind | 10 puntos | Estructura inicial del proyecto Express, instalación de dependencias, uso correcto de variables de entorno, conexión funcional a PostgreSQL y carga correcta de la base de datos Northwind. |
| Diseño REST orientado a generación de órdenes | 15 puntos | Definición clara de endpoints mínimos, uso adecuado de GET y POST, rutas coherentes como `/customers`, `/products`, `/orders` y `/orders/:id`, respuestas JSON uniformes y códigos HTTP correctos. |
| Consulta de datos base para construir órdenes | 10 puntos | Consulta correcta de clientes, empleados y productos disponibles, uso de filtros cuando corresponda y entrega de información suficiente para armar una orden válida. |
| Generación funcional de órdenes | 25 puntos | Implementación completa de `POST /orders`, registro correcto de la cabecera en `orders`, registro de múltiples productos en `order_details`, cálculo o uso correcto de precios, cantidades y descuentos según el modelo Northwind. |
| Validaciones de negocio | 10 puntos | Verificación de existencia de cliente, empleado y productos, validación de cantidades mayores a cero, estructura correcta del cuerpo de la solicitud y rechazo de órdenes incompletas o inconsistentes. |
| Transacciones y consistencia de datos | 10 puntos | Uso de transacciones para asegurar que la cabecera y los detalles de la orden se creen juntos, aplicación de rollback ante errores y prevención de registros parciales. |
| Manejo de errores y seguridad básica | 8 puntos | Middleware centralizado de errores, mensajes JSON claros, protección de información sensible, uso de consultas parametrizadas, configuración de CORS y helmet. |
| Pruebas y evidencia de funcionamiento | 7 puntos | Colección de pruebas en Postman, Thunder Client o equivalente, evidencia de creación exitosa de una orden, consulta de orden creada y casos de error controlados. |
| Documentación y presentación final | 5 puntos | README claro, instrucciones de instalación y ejecución, archivo `.env.example`, explicación breve del flujo de generación de órdenes y presentación ordenada del repositorio. |
| **Total** | **100 puntos** | Evaluación completa de la API REST para generación de órdenes con Express, PostgreSQL y Northwind. |
