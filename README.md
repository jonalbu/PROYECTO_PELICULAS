# PROYECTO PELICULAS APLICACIÓN WEB

Una API REST completamente funcional construida con Node.js + Express + MongoDB (Mongoose) que implementa los 5 modulos o entidades de la aplicacion para las peliculas y series.

## Estructura del proyecto

```
PROYECTO_PELICULAS/
├── .env                          ← Cadena de conexión a la base de datos y puerto
├── .gitignore
├── package.json                  ← npm start / npm run dev
└── src/
    ├── index.js                  ← Punto de entrada del servidor
    ├── app.js                    ← Express app + route wiring
    ├── database/
    │   └── connection.js         ← Conexión a la base de datos
    ├── models/
    │   ├── Genero.js
    │   ├── Director.js
    │   ├── Productora.js
    │   ├── Tipo.js
    │   └── Media.js
    ├── controllers/
    │   ├── generoController.js
    │   ├── directorController.js
    │   ├── productoraController.js
    │   ├── tipoController.js
    │   └── mediaController.js
    └── routes/
        ├── generoRoutes.js
        ├── directorRoutes.js
        ├── productoraRoutes.js
        ├── tipoRoutes.js
        └── mediaRoutes.js
```

---

## Como ejecutar el proyecto

```bash
# Desarrollo (auto-restart on changes)
npm run dev

# Producción
npm start
```

---

## Endpoints

### Géneros — `/api/generos`

| Method | URL                    | Description  |
| ------ | ---------------------- | ------------ |
| GET    | `/api/generos`         | Listar todos |
| GET    | `/api/generos/activos` | Solo activos |
| GET    | `/api/generos/:id`     | Por ID       |
| POST   | `/api/generos`         | Crear        |
| PUT    | `/api/generos/:id`     | Actualizar   |
| DELETE | `/api/generos/:id`     | Eliminar     |

**Cuerpo de la petición POST:**

```json
{
  "nombre": "Acción",
  "descripcion": "Películas de acción",
  "estado": "Activo"
}
```

---

### Directores — `/api/directores`

| Method | URL                       | Description  |
| ------ | ------------------------- | ------------ |
| GET    | `/api/directores`         | Listar todos |
| GET    | `/api/directores/activos` | Solo activos |
| GET    | `/api/directores/:id`     | Por ID       |
| POST   | `/api/directores`         | Crear        |
| PUT    | `/api/directores/:id`     | Actualizar   |
| DELETE | `/api/directores/:id`     | Eliminar     |

**Cuerpo de la petición POST:**

```json
{
  "nombres": "Christopher Nolan",
  "estado": "Activo"
}
```

---

### Productoras — `/api/productoras`

| Method | URL                        | Description  |
| ------ | -------------------------- | ------------ |
| GET    | `/api/productoras`         | Listar todas |
| GET    | `/api/productoras/activas` | Solo activas |
| GET    | `/api/productoras/:id`     | Por ID       |
| POST   | `/api/productoras`         | Crear        |
| PUT    | `/api/productoras/:id`     | Actualizar   |
| DELETE | `/api/productoras/:id`     | Eliminar     |

**Cuerpo de la petición POST:**

```json
{
  "nombre": "Warner Bros",
  "slogan": "The stuff that dreams are made of",
  "descripcion": "Major American film studio",
  "estado": "Activo"
}
```

---

### Tipos — `/api/tipos`

| Method | URL              | Description  |
| ------ | ---------------- | ------------ |
| GET    | `/api/tipos`     | Listar todos |
| GET    | `/api/tipos/:id` | Por ID       |
| POST   | `/api/tipos`     | Crear        |
| PUT    | `/api/tipos/:id` | Actualizar   |
| DELETE | `/api/tipos/:id` | Eliminar     |

**Cuerpo de la petición POST:**

```json
{
  "nombre": "Película",
  "descripcion": "Largometraje cinematográfico"
}
```

---

### Medias — `/api/medias`

| Method | URL               | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/medias`     | Listar todas (con refs pobladas) |
| GET    | `/api/medias/:id` | Por ID                           |
| POST   | `/api/medias`     | Crear                            |
| PUT    | `/api/medias/:id` | Actualizar                       |
| DELETE | `/api/medias/:id` | Eliminar                         |

**Cuerpo de la petición POST:**

```json
{
  "serial": "PELICULA-001",
  "titulo": "Inception",
  "sinopsis": "Un ladrón que roba secretos...",
  "url": "https://example.com/inception",
  "imagenPortada": "https://example.com/inception.jpg",
  "anioEstreno": 2010,
  "genero": "Acción",
  "director": "Christopher Nolan",
  "productora": "Warner Bros",
  "tipo": "Película"
}
```

> **Validación:** Los campos `genero`, `director`, `productora` y `tipo` se envían como **nombres** (no ObjectIds). El servidor los busca internamente y valida que el Género, Director y Productora estén en estado **Activo**. Si no se encuentran o están _Inactivos_, devuelve `404` o `400 Bad Request` respectivamente.

---

## Pruebas de verificación

| Test                                  | Result                   |
| ------------------------------------- | ------------------------ |
| `GET /` — Root endpoint               | 200 OK                   |
| `POST /api/generos` — Create "Acción" | 201 Created              |
| `GET /api/generos` — List all genres  | 200 OK, data returned    |
| MongoDB connection                    | Connected to `localhost` |

---

## Uso de Postman

1. Importar cada endpoint manualmente o usar la tabla anterior
2. Setear `Content-Type: application/json` header para POST/PUT
3. Orden recomendado:
   - Crear Tipo → Crear Genero → Crear Director → Crear Productora → Crear Media

**Dependencies:**

- `express` – HTTP server & routing
- `mongoose` – MongoDB ORM
- `dotenv` – environment variables
- `cors` – Cross-Origin support

---

<br>
<br>

# Diseño de la base de datos (MongoDB Collections)

```
generos        → Genre
directores     → Director
productoras    → ProductionCompany
tipos          → Type
medias         → Media (references Genre, Director, ProductionCompany, Type)
```

#### Genero Schema

| Field              | Type   | Notes                                          |
| ------------------ | ------ | ---------------------------------------------- |
| nombre             | String | required                                       |
| estado             | String | enum: ['Activo','Inactivo'], default: 'Activo' |
| descripcion        | String |                                                |
| fechaCreacion      | Date   | default: now                                   |
| fechaActualizacion | Date   |                                                |

#### Director Schema

| Field              | Type   | Notes                                          |
| ------------------ | ------ | ---------------------------------------------- |
| nombres            | String | required                                       |
| estado             | String | enum: ['Activo','Inactivo'], default: 'Activo' |
| fechaCreacion      | Date   | default: now                                   |
| fechaActualizacion | Date   |                                                |

#### Productora Schema

| Field              | Type   | Notes                                          |
| ------------------ | ------ | ---------------------------------------------- |
| nombre             | String | required                                       |
| estado             | String | enum: ['Activo','Inactivo'], default: 'Activo' |
| slogan             | String |                                                |
| descripcion        | String |                                                |
| fechaCreacion      | Date   | default: now                                   |
| fechaActualizacion | Date   |                                                |

#### Tipo Schema

| Field              | Type   | Notes                               |
| ------------------ | ------ | ----------------------------------- |
| nombre             | String | required (e.g. 'Película', 'Serie') |
| descripcion        | String |                                     |
| fechaCreacion      | Date   | default: now                        |
| fechaActualizacion | Date   |                                     |

#### Media Schema

| Field              | Type     | Notes                             |
| ------------------ | -------- | --------------------------------- |
| serial             | String   | unique, required                  |
| titulo             | String   | required                          |
| sinopsis           | String   |                                   |
| url                | String   | unique, required                  |
| imagenPortada      | String   |                                   |
| anioEstreno        | Number   |                                   |
| genero             | ObjectId | ref: 'Genero', must be Activo     |
| director           | ObjectId | ref: 'Director', must be Activo   |
| productora         | ObjectId | ref: 'Productora', must be Activo |
| tipo               | ObjectId | ref: 'Tipo'                       |
| fechaCreacion      | Date     | default: now                      |
| fechaActualizacion | Date     |                                   |

---
