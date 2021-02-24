import {TaskStateType, TaskType} from "../App"
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistsActionType, changeTodolistEntityStatusAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {todolistAPI, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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
type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>

const initialState:TaskStateType = {}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | ChangeTaskEntityStatusActionType

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
        case 'CHANGE-TASK-ENTIRE-STATUS': {
            let todolistTasks = state[action.todolistID];
            const newEntityStatusTask = todolistTasks.map(t => t.id === action.taskID ? { ...t, entityStatus: action.entireStatus } : t)
            return {
                ...state,
                [action.todolistID]: newEntityStatusTask
            }
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
export const changeTaskEntityStatusAC = (todolistID:string, taskID:string, entireStatus:RequestStatusType) => ({type: 'CHANGE-TASK-ENTIRE-STATUS', taskID, todolistID, entireStatus} as const)



export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items.map(t => ({...t,  entityStatus: "idle" as const}))
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = {...res.data.data.item, entityStatus: 'idle' as const}
                    dispatch(addTaskAC(task))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
            } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err=> {
                handleServerNetworkError(err, dispatch)
            })
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"))
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
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"))
                dispatch(setAppStatusAC('succeeded'))
            })
                .catch( err => {
                    handleServerNetworkError(err, dispatch)
                })
        }
    }
}

export const removeTaskTC = (taskId:string, todolistID:string) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistID, taskId, "loading"))
    todolistAPI.deleteTask(todolistID, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistID)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todolistID, taskId, "succeeded"))
        })
}

export const updateTaskTitleTC = (taskId:string, todolistID:string, title:string) => (dispatch:Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistID, taskId, "loading"))
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
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistID))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTaskEntityStatusAC(todolistID, taskId, "succeeded"))
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
}}








