# 📋 Gestor de Tareas Básico

Una aplicación web completa para gestionar tareas, desarrollada con NestJS en el backend y Vanilla JavaScript en el frontend, completamente dockerizada.

## 🚀 Características

- ✅ **Crear tareas** - Agrega nuevas tareas con título
- 📋 **Listar tareas** - Visualiza todas tus tareas en tiempo real
- ✔️ **Marcar como completadas** - Marca/desmarca tareas como completadas
- 🗑️ **Eliminar tareas** - Elimina tareas que ya no necesitas
- �� **Estadísticas** - Ve el total de tareas y completadas
- 🎨 **Interfaz moderna** - Diseño responsivo y atractivo
- 🔄 **Tiempo real** - Actualizaciones inmediatas sin recargar

## 🏗️ Arquitectura

### Backend (NestJS)
- **Framework**: NestJS con TypeScript
- **Almacenamiento**: En memoria (no requiere base de datos)
- **API**: RESTful endpoints
- **CORS**: Habilitado para comunicación con frontend
- **Puerto**: 3000

### Frontend (Vanilla JavaScript)
- **Tecnología**: Vanilla JavaScript ES6+
- **Componentes**: TaskList component modular
- **HTTP Client**: Fetch API personalizado
- **Estilos**: CSS moderno con variables y responsive design
- **Puerto**: 8080

## 📁 Estructura del Proyecto

```
task-manager/
├── docker-compose.yml          # Configuración de servicios Docker
├── README.md                   # Este archivo
├── backend/                    # Aplicación NestJS
│   ├── Dockerfile             # Imagen Docker del backend
│   ├── package.json           # Dependencias del backend
│   ├── src/
│   │   ├── main.ts           # Punto de entrada con CORS
│   │   ├── app.module.ts     # Módulo principal
│   │   ├── app.controller.ts # Controlador de salud
│   │   ├── app.service.ts    # Servicio básico
│   │   └── tasks/            # Módulo de tareas
│   │       ├── tasks.controller.ts  # Endpoints CRUD
│   │       ├── tasks.service.ts     # Lógica de negocio
│   │       ├── tasks.module.ts      # Módulo de tareas
│   │       └── dto/
│   │           └── create-task.dto.ts # DTO para crear tareas
└── frontend/                   # Aplicación frontend
    ├── Dockerfile             # Imagen Docker del frontend
    ├── package.json           # Dependencias del frontend
    └── src/
        ├── index.html         # HTML principal
        ├── app.js            # Aplicación principal y HTTP Client
        ├── components/
        │   └── task-list.js  # Componente de lista de tareas
        └── styles/
            └── main.css      # Estilos modernos
```

## 🛠️ Requisitos Previos

- **Docker** y **Docker Compose** instalados
- **Node.js** v18+ (para desarrollo local)
- **Puerto 3000** y **8080** disponibles

## 🚀 Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Almunozr/gestor-tareas-super.git
   cd gestor-tareas-super/task-manager
   ```

2. **Levantar los servicios**
   ```bash
   # Construir y levantar contenedores
   docker-compose up --build 
   #Ocional sin - : docker compose up --build 
   
   # O en segundo plano
   docker-compose up -d --build
   ```

3. **Acceder a la aplicación**
   - 🌐 **Frontend**: http://localhost:8080
   - 🔧 **Backend API**: http://localhost:3000
   - 📋 **Health Check**: http://localhost:3000 (debe mostrar "Task Manager API is running!")

## 🔧 Comandos Útiles

```bash
# Ver logs de los contenedores
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend

# Parar los servicios
docker-compose down

# Reconstruir un servicio específico
docker-compose up --build backend

# Limpiar y reconstruir todo
docker-compose down
docker system prune -f
docker-compose up --build

# Ver estado de contenedores
docker-compose ps
```

## 📊 API Endpoints

El backend expone los siguientes endpoints RESTful:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/tasks` | Obtener todas las tareas |
| `GET` | `/tasks/:id` | Obtener una tarea específica |
| `POST` | `/tasks` | Crear una nueva tarea |
| `PUT` | `/tasks/:id/complete` | Marcar/desmarcar tarea como completada |
| `DELETE` | `/tasks/:id` | Eliminar una tarea |

## 🧪 Testing

### Pruebas Manuales
1. ✅ Abrir http://localhost:8080
2. ✅ Crear una tarea nueva
3. ✅ Verificar que aparece en la lista
4. ✅ Marcar como completada
5. ✅ Verificar cambio visual
6. ✅ Eliminar la tarea
7. ✅ Verificar que desaparece

### Verificar API
```bash
# Test de salud
curl http://localhost:3000

# Test CRUD completo
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "Test"}'
curl http://localhost:3000/tasks
curl -X PUT http://localhost:3000/tasks/1/complete
curl -X DELETE http://localhost:3000/tasks/1
```

## 👨‍💻 Autor

**Alex Orlando Muñoz alexmr.com**  
- GitHub: [@Almunozr](https://github.com/Almunozr)

---

**¡Desarrollado usando NestJS y Vanilla JavaScript!**
