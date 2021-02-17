import {TaskStateType, TaskType} from "../App"
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {todolistAPI, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK",
    todolistID: string
    taskId: string
    status: TaskStatuses
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK",
    todolistID: string,
    title: string,
    taskID: string,
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

const initialState:TaskStateType = {}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType
    |SetTasksActionType

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    let stateCopy
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy = {...state}
            stateCopy[action.todolistID] = [...stateCopy[action.todolistID].filter(el => el.id !== action.taskID)]
            return stateCopy
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }
        case "CHANGE-STATUS-TASK":
            stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistID];
            let newTasksArray = todolistTasks.map(t=> t.id===action.taskId ? {...t, status:action.status} : t )
            return {...stateCopy, [action.todolistID]:newTasksArray};
        case "CHANGE-TITLE-TASK":{
            let todolistTasks = state[action.todolistID];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskID ? { ...t, title: action.title } : t);

            state[action.todolistID] = newTasksArray;
            return ({...state});
        }
        case "ADD-TODOLIST":
            stateCopy = {
                ...state,
                [action.todolist.id]: []
            }
            return stateCopy
        case "REMOVE-TODOLIST":
            stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistID: todoListID,
        taskID: taskID,
    }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS-TASK', status, todolistID, taskId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TITLE-TASK",
        todolistID: todoListID,
        taskID: taskID,
        title: title
    }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => ({type: 'SET-TASKS', tasks, todolistId})

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const addTasksTC = (todolistId:string, title:string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId,title)
            .then((res)=> {
                let task = res.data.data.item
                let action = {type: 'ADD-TASK', task}
                dispatch(action)
            })
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const removeTaskTC = (taskId:string, todolistID:string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTask(todolistID, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistID)
            dispatch(action)
        })
}

export const updateTaskTitleTC = (taskId:string, todolistID:string, title:string) => (dispatch:Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistID]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        todolistAPI.updateTask(todolistID, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
    })
        .then(() => {
            const action = changeTaskTitleAC(taskId, title, todolistID)
            dispatch(action)
        })
}}








