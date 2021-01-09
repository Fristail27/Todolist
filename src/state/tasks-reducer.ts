import {filterValuesType, TaskStateType, TaskType, TodolistType} from "../App"
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    todolistID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS-TASK",
    todolistID: string,
    taskID: string,
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK",
    todolistID: string,
    title: string,
    taskID: string,
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    let stateCopy, task
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy = {...state}
            stateCopy[action.todolistID] = [...stateCopy[action.todolistID].filter(el => el.id !== action.taskID)]
            return stateCopy
        case "ADD-TASK" :
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            stateCopy = {...state}
            stateCopy[action.todolistID] = [newTask, ...stateCopy[action.todolistID]]
            return stateCopy
        case "CHANGE-STATUS-TASK":
            stateCopy = {...state}
            task = stateCopy[action.todolistID].find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        case "CHANGE-TITLE-TASK":
            stateCopy = {...state}
            task = stateCopy[action.todolistID].find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            ;
            return stateCopy
        case "ADD-TODOLIST":
            stateCopy = {
                ...state,
                [action.todoListID]: []
            }
            return stateCopy
        case "REMOVE-TODOLIST":
            stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistID: todoListID,
        taskID: taskID,
    }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        todolistID: todoListID,
        title: title,
    }
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-STATUS-TASK",
        todolistID: todoListID,
        taskID: taskID,
        isDone: isDone
    }
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TITLE-TASK",
        todolistID: todoListID,
        taskID: taskID,
        title: title
    }
}