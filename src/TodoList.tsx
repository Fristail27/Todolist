import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, TaskType} from "./App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    removeTask: (taskID: string) => void,
    changeFiltter: (filterValue: filterValuesType) => void,
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("");
    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {props.removeTask(taskObj.id)}
        return (
            <li key={taskObj.id}>
                <input type="checkbox" checked={taskObj.isDone}/>
                <span>{taskObj.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    });
    const addTask = () => {
        props.addTask(title);
        setTitle("")
    };
    const AllOnClickHandler = () => {props.changeFiltter("all")};
    const ActiveOnClickHandler = () => {props.changeFiltter("active")};
    const CompletedOnClickHandler = () => {props.changeFiltter("completed")};
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addTask()};

    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={AllOnClickHandler}>All</button>
            <button onClick={ActiveOnClickHandler}>Active</button>
            <button onClick={CompletedOnClickHandler}>Completed</button>
        </div>
    </div>)
}