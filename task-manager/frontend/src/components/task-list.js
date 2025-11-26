// Componente TaskList
class TaskList {
    constructor(container, apiClient) {
        this.container = container;
        this.apiClient = apiClient;
        this.tasks = [];
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="task-list-wrapper">
                <div class="task-stats">
                    <span id="total-tasks">0 tareas</span>
                    <span id="completed-tasks">0 completadas</span>
                </div>
                <ul id="task-list" class="task-list"></ul>
                <div class="empty-state" id="empty-state" style="display: none;">
                    <p>No hay tareas todavía</p>
                    <p>¡Agrega una tarea arriba para comenzar!</p>
                </div>
            </div>
        `;
        
        this.taskListElement = this.container.querySelector('#task-list');
        this.emptyState = this.container.querySelector('#empty-state');
        this.totalTasksElement = this.container.querySelector('#total-tasks');
        this.completedTasksElement = this.container.querySelector('#completed-tasks');
    }

    async loadTasks() {
        try {
            this.tasks = await this.apiClient.get('/tasks');
            this.render();
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Error al cargar las tareas');
        }
    }

    render() {
        this.taskListElement.innerHTML = '';
        
        if (this.tasks.length === 0) {
            this.emptyState.style.display = 'block';
            this.taskListElement.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.taskListElement.style.display = 'block';
            
            this.tasks.forEach(task => {
                const taskItem = this.createTaskElement(task);
                this.taskListElement.appendChild(taskItem);
            });
        }
        
        this.updateStats();
    }

    createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.taskId = task.id;

        taskItem.innerHTML = `
            <div class="task-content">
                <span class="task-title">${this.escapeHtml(task.title)}</span>
                <small class="task-date">Creada: ${new Date(task.createdAt).toLocaleDateString()}</small>
            </div>
            <div class="task-actions">
                <button class="btn btn-complete ${task.completed ? 'completed' : ''}" 
                        onclick="taskListComponent.toggleComplete(${task.id})">
                    ${task.completed ? '↶ Deshacer' : '✓ Completar'}
                </button>
                <button class="btn btn-delete" 
                        onclick="taskListComponent.deleteTask(${task.id})">
                    🗑 Eliminar
                </button>
            </div>
        `;

        return taskItem;
    }

    async toggleComplete(taskId) {
        try {
            await this.apiClient.put(`/tasks/${taskId}/complete`);
            await this.loadTasks(); // Recargar las tareas
            showNotification('Tarea actualizada', 'success');
        } catch (error) {
            console.error('Error toggling task:', error);
            showNotification('Error al actualizar la tarea', 'error');
        }
    }

    async deleteTask(taskId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                await this.apiClient.delete(`/tasks/${taskId}`);
                await this.loadTasks(); // Recargar las tareas
                showNotification('Tarea eliminada', 'success');
            } catch (error) {
                console.error('Error deleting task:', error);
                showNotification('Error al eliminar la tarea', 'error');
            }
        }
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        
        this.totalTasksElement.textContent = `${total} tarea${total !== 1 ? 's' : ''}`;
        this.completedTasksElement.textContent = `${completed} completada${completed !== 1 ? 's' : ''}`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
                <button onclick="taskListComponent.loadTasks()">Reintentar</button>
            </div>
        `;
    }
}

// Variable global para acceder al componente
let taskListComponent;