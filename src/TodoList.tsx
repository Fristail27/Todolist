import React from "react";
import {filterValuesType, TaskType} from "./App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void,
    changeFiltter: (filterValue: filterValuesType) => void
}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(taskObj => {
        return (
            <li key={taskObj.id}>
                <input type="checkbox" checked={taskObj.isDone}/>
                <span>{taskObj.title}</span>
                <button onClick={() => { props.removeTask(taskObj.id)}}>x</button>
            </li>
        )
    })
    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={() => { props.changeFiltter("all")}}>All</button>
            <button onClick={() => { props.changeFiltter("active")}}>Active</button>
            <button onClick={() => { props.changeFiltter("completed")}}>Completed</button>
        </div>
    </div>)
}