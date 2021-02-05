import axios from 'axios'

const settings = {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': "29b8c3f6-3989-47ac-8b51-b97568488b2d"
    }
}

const instance = axios.create({
    ...settings
    }
)

type BaseResponseType<D = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}

type TodolistType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTodolist () {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    deleteTodolist (todolistId:string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist (title:string) {
        return instance.post<BaseResponseType<{item: TodolistType}>>(`todo-lists/`, {title})
    }
}
