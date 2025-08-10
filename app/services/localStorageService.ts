import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../type/task';

const STORAGE_KEY = 'todo_tasks';

const isClient = typeof window !== 'undefined';
// hàm lấy tất cả task từ localStorage
export const getTasks = (): Task[] => {
    if (!isClient) return [];

    try {
        const tasksJson = localStorage.getItem(STORAGE_KEY);
        if (tasksJson) {
            return JSON.parse(tasksJson);
        }
        return [];
    } catch (error) {
        console.error('Error getting tasks :', error);
        return [];
    }
};

// hàm thêm task mới
export const addTask = (title: string): Task | null => {
    if (!isClient) return null;

    try {
        const tasks = getTasks();
        const newTask: Task = {
            id: Date.now().toString(), // tạo ID duy nhất
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

        return newTask;
    } catch (error) {
        console.error('Error adding task :', error);
        return null;
    }
};

// hàm update status task
export const updateTask = (id: string, updates: UpdateTaskRequest): Task | null => {
    if (!isClient) return null;

    try {
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return null;
        }

        const updatedTask = { ...tasks[taskIndex], ...updates };
        tasks[taskIndex] = updatedTask;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

        return updatedTask;
    } catch (error) {
        console.error('Error updating task :', error);
        return null;
    }
};

// hàm xóa task
export const deleteTask = (id: string): boolean => {
    if (!isClient) return false;

    try {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));

        return true;
    } catch (error) {
        console.error('Error deleting task :', error);
        return false;
    }
};
