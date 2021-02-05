import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const api_key = "29b8c3f6-3989-47ac-8b51-b97568488b2d"

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodolist()
        promise
            .then((res)=>{setState(res.data)})
    }, [])

    return (
        <div>
            {state && state.map((el:any)=> <p key={el.id}>{JSON.stringify(el)}</p>)}
        </div>)
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "2423342"
        todolistAPI.createTodolist(title)
            .then(res => {
            setState(res.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "e4206f1c-a978-4698-9b67-6462655878ef";
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "211bd4b8-4e01-4599-b458-13c6f1e72f44";
        const title = "react 124234"
        todolistAPI.updateTodolist(todolistId, title)
            .then( (res) => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

