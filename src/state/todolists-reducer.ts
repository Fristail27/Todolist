import {filterValuesType, TodolistType} from "../App"
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID:string
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListID: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListID: string
    filter: filterValuesType
}

const initialState:Array<TodolistType> = []

type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todoListID)
        case "ADD-TODOLIST" :
            const newTodolist: TodolistType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE" :
            const todolist = state.find(t => t.id === action.todoListID)
            if (todolist) {
                todolist.title = action.title;
                return [...state];
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(t => t.id === action.todoListID)
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            }
            console.log(state)
            return [...state]
        }
        default:
            return state
    }
}

export const RemoveTodoListActionCreator = (todoListID:string):RemoveTodoListActionType => {
 return {
     type: "REMOVE-TODOLIST",
     todoListID: todoListID,
 }
}
export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todoListID: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: filterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todolistId}
}
