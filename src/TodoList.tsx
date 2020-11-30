import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, TaskType} from "./App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    filter: filterValuesType,
    addTask: (title: string) => void,
    removeTask: (taskID: string) => void,
    changeFiltter: (filterValue: filterValuesType) => void,
    changeStatus: (taskID :string, isDone :boolean) => void,
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {props.removeTask(taskObj.id)}
        const changeStatus = (e :ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={taskObj.isDone}
                />
                <span>{taskObj.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    });
    const addTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle);
        } else {
            setError ("Title is required!");
        };
        setTitle("")
    };
    const AllOnClickHandler = () => {props.changeFiltter("all")};
    const ActiveOnClickHandler = () => {props.changeFiltter("active")};
    const CompletedOnClickHandler = () => {props.changeFiltter("completed")};
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addTask()};

    return (<div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : "" } onClick={AllOnClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : "" } onClick={ActiveOnClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : "" } onClick={CompletedOnClickHandler}>Completed</button>
        </div>
    </div>)
}