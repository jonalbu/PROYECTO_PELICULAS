# PROYECTO PELICULAS APLICACIÓN WEB


## Estructura del proyecto 
```
PRUEBA/
├── .env                          ← DB connection string + port
├── .gitignore
├── package.json                  ← npm start / npm run dev
└── src/
    ├── index.js                  ← Server entry point
    ├── app.js                    ← Express app + route wiring
    ├── database/
    │   └── connection.js         ← Mongoose connection
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


## All Endpoints

### Géneros — `/api/generos`
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/generos` | Listar todos |
| GET | `/api/generos/activos` | Solo activos |
| GET | `/api/generos/:id` | Por ID |
| POST | `/api/generos` | Crear |
| PUT | `/api/generos/:id` | Actualizar |
| DELETE | `/api/generos/:id` | Eliminar |

**POST body:**
```json
{
  "nombre": "Acción",
  "descripcion": "Películas de acción",
  "estado": "Activo"
}
```

