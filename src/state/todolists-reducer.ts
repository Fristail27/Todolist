import {filterValuesType, TodolistType} from "../App";
import { Dispatch } from "redux";
import {todolistAPI} from "../api/todolist-api";
import {
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
    SetAppStatusActionType,
    setErrorActionType
} from "./app-reducer";

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
    filter: filterValuesType,
    entityStatus: RequestStatusType,
}
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

const initialState:Array<TodolistDomainType> = []

type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodolistsActionType
    | setErrorActionType
    | SetAppStatusActionType
    | ChangeTodolistEntityStatusActionType

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
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle"
            }))
        }
        case 'CHANGE-TODOLIST-ENTIRE-STATUS':
            return state.map(tl=> tl.id === action.id ? {...tl, entityStatus: action.entireStatus} : tl)
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
export const changeTodolistEntityStatusAC = (id:string, entireStatus:RequestStatusType) => ({type: 'CHANGE-TODOLIST-ENTIRE-STATUS', id, entireStatus} as const)

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => ({type: 'SET-TODOLISTS', todolists})

export const fetchTodolistsTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistID, "loading"))
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodoListActionCreator(todolistID))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTodolistEntityStatusAC(todolistID, "succeeded"))

                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                }
                dispatch(setAppStatusAC('failed'))

            })
    }
}
export const createTodolistTC = (title:string) => (dispatch:Dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then (res => {
            dispatch(AddTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistId:string, title:string) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then (res => {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

