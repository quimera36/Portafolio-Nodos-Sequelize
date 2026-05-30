# Portfolio Micelial con Sequelize

Proyecto experimental de visualización de conocimiento inspirado en estructuras miceliales. Desarrollado con HTML, CSS, JavaScript, Node.js, Express, Sequelize, PostgreSQL y Vis Network.

## 1. Crear base de datos en PostgreSQL

Crear una base de datos llamada:

```txt
portfolio_micelial
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar conexión

Editar:

```txt
config/database.js
```

y actualizar las credenciales de PostgreSQL según tu entorno local.

## 4. Crear tablas y datos iniciales

```bash
npm run seed
```

Este comando genera las tablas necesarias e inserta los datos iniciales de la red.

## 5. Iniciar servidor

```bash
npm run dev
```

Abrir en el navegador:

```txt
http://localhost:3000
```

---

# Navegación

La red representa proyectos, conocimientos, experiencias y áreas de trabajo conectadas entre sí.

Al hacer clic sobre un nodo se despliega información relacionada:

* Nombre
* Categoría
* Nivel
* Energía
* Descripción
* Enlace asociado

---

# Modo administrador

El proyecto incorpora un sistema de administración visual para modificar la red directamente desde la interfaz.

## Activación

1. Abrir la aplicación:

```txt
http://localhost:3000
```

2. Abrir las herramientas de desarrollador:

```txt
F12
```

3. Ejecutar:

```js
activarModoAdmin()
```

4. Aparecerá el botón de administración.

## Funcionalidades

### Gestión de nodos

* Crear nodos.
* Editar nodos existentes.
* Modificar nombre.
* Modificar categoría.
* Modificar nivel.
* Modificar energía.
* Modificar descripción.
* Modificar enlaces.
* Modificar favicon.
* Eliminar nodos.

### Gestión de conexiones

* Crear conexiones entre nodos.
* Asignar etiquetas a las conexiones.
* Visualizar conexiones asociadas a un nodo.
* Eliminar conexiones existentes.

## Persistencia

Todos los cambios realizados desde el modo administrador se almacenan en PostgreSQL mediante Sequelize.

Los datos permanecen disponibles después de reiniciar el servidor o recargar la página.

---

# Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* Express
* Sequelize
* PostgreSQL
* Vis Network

---

# Estructura del proyecto

```txt
portfolio-micelial-sequelize/
├─ config/
│  └─ database.js
├─ models/
│  ├─ index.js
│  ├─ Nodo.js
│  └─ Conexion.js
├─ routes/
│  ├─ red.routes.js
│  ├─ nodos.routes.js
│  └─ conexiones.routes.js
├─ seeders/
│  └─ seed.js
├─ public/
│  ├─ index.html
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ background.js
│  │  ├─ graph.js
│  │  ├─ public.js
│  │  └─ admin-mode.js
│  └─ assets/
├─ server.js
├─ package.json
├─ package-lock.json
├─ .gitignore
└─ README.md
```

---

# Autor

**Magdiel Sánchez Correa**

Proyecto desarrollado como exploración visual de conocimiento, trayectoria profesional y ecosistema creativo personal.
