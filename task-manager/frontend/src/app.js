// HttpClient para comunicación con la API
class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }

    async get(endpoint) {
        return this.request(endpoint);
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }
}

// Instancia del HttpClient
const apiClient = new HttpClient('http://localhost:3000');

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    
    // Inicializar el componente task-list
    const taskListContainer = document.getElementById('task-list-container');
    taskListComponent = new TaskList(taskListContainer, apiClient);
    
    // Manejar el formulario de agregar tareas
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = taskInput.value.trim();
        
        if (title) {
            try {
                await apiClient.post('/tasks', { title });
                taskInput.value = '';
                taskListComponent.loadTasks(); // Recargar la lista
                showNotification('Tarea agregada exitosamente', 'success');
            } catch (error) {
                console.error('Error adding task:', error);
                showNotification('Error al agregar la tarea', 'error');
            }
        }
    });

    // Cargar tareas iniciales
    taskListComponent.loadTasks();
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}