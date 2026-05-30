# Portfolio Micelial con Sequelize

Proyecto ordenado para practicar HTML, CSS, JavaScript, Node.js, Express, Sequelize y PostgreSQL.

## 1. Crear base de datos en pgAdmin

Crear una base de datos llamada:

```txt
portfolio_micelial
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar conexión

Editar `config/database.js` y cambiar `password` por tu clave de PostgreSQL.

## 4. Crear tablas y datos iniciales

```bash
npm run seed
```

## 5. Iniciar servidor

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
http://localhost:3000/admin.html
```

## Estructura

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
│  ├─ admin.html
│  ├─ css/
│  │  └─ styles.css
│  └─ js/
│     ├─ background.js
│     ├─ graph.js
│     ├─ public.js
│     └─ admin.js
├─ server.js
├─ package.json
└─ README.md
```
