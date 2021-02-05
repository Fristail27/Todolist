import axios from 'axios'

const settings = {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': "29b8c3f6-3989-47ac-8b51-b97568488b2d"
    }
}

const instance = axios.create({
        ...settings
    }
)

export const tasksAPI = {
    getTasks(todolistId:string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask (todolistId:string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask (todolistId:string, taskId:string, title: string) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask (todolistId:string, taskId:string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}