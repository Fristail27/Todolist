import {filterValuesType, TodolistType} from "../App";
import { Dispatch } from "redux";
import {todolistAPI} from "../api/todolist-api";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    todolist: {
        "id": string,
        "title": string,
        "addedDate": string,
        "order": number
    }
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
export type TodolistDomainType = TodolistType & {
    filter: filterValuesType
}

const initialState:Array<TodolistDomainType> = []

type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistsActionType

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todoListID)
        case 'ADD-TODOLIST': {
            return [action.todolist, ...state]
        }
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
        case 'SET-TODOLISTS': {
            console.log(action.todolists)
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
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
export const AddTodolistAC = (todolist: any): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', todolist}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: filterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todolistId}
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => ({type: 'SET-TODOLISTS', todolists})

export const fetchTodolistsThunkCreator = () => (dispatch: Dispatch<SetTodolistsActionType>) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId:string) => (dispatch:Dispatch)=> {
    todolistAPI.deleteTodolist(todolistId)
        .then (res => {
            dispatch(RemoveTodoListActionCreator(todolistId))
        })
}
export const createTodolistTC = (title:string) => (dispatch:Dispatch)=> {
    todolistAPI.createTodolist(title)
        .then (res => {
            dispatch(AddTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId:string, title:string) => (dispatch:Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then (res => {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
        })
}

