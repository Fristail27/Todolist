import {filterValuesType, TodolistType} from "../App"
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
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

type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todoListID)
        case "ADD-TODOLIST" :
            const newTodolistID = v1();
            const newTodolist: TodolistType = {
                id: newTodolistID,
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
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListActionCreator = (todoListID:string):RemoveTodoListActionType => {
 return {
     type: "REMOVE-TODOLIST",
     todoListID: todoListID,
 }
}