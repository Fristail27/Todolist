import React, {useEffect, useState} from 'react'
import { tasksAPI } from '../api/tasks-api';

export default {
    title: 'TaskAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8036fb24-c9e9-4733-8baa-041cfda02aa7"
        const promise = tasksAPI.getTasks(todolistId)
        promise
            .then((res)=>{
                setState(res.data.items)
                return res.data.items
            })
    }, [])


    return <div> {state && state.map((el:any)=> <p key={el.id}>{JSON.stringify(el)}</p>)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8036fb24-c9e9-4733-8baa-041cfda02aa7"
        const title = "12345"
        const promise = tasksAPI.createTask(todolistId, title)
        promise.then((res)=>{setState(res.data)})
    }, [])
    const st = JSON.stringify(state)
    console.log(state)

    return <div> {st}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8036fb24-c9e9-4733-8baa-041cfda02aa7"
        const taskId = "c6a49ba4-7f43-4864-b7aa-228a7d8d4e86"
        const promise = tasksAPI.deleteTask(todolistId, taskId)
        promise.then((res)=>{setState(res.data)})
    }, [])
    const st = JSON.stringify(state)

    return <div> {st}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8036fb24-c9e9-4733-8baa-041cfda02aa7"
        const taskId = "859db1cd-1483-46c9-a3e5-54674a514a42"
        const title = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        const promise = tasksAPI.updateTask(todolistId, taskId, title)
        promise.then((res)=>{setState(res.data)})
    }, [])
    const st = JSON.stringify(state)

    return <div> {st}</div>
}