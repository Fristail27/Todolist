import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, TaskType} from "./App";

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: filterValuesType,
    addTask: (title: string, todolistID:string) => void,
    removeTask: (taskID: string, todolistID:string) => void,
    changeFiltter: (filterValue: filterValuesType, todolistID:string) => void,
    changeStatus: (taskID :string, isDone :boolean, todolistID:string) => void,
    deleteTodolist:(todolistID:string) => void
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {props.removeTask(taskObj.id, props.id)}
        const changeStatus = (e :ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
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
            props.addTask(trimmedTitle, props.id);
        } else {
            setError ("Title is required!");
        };
        setTitle("")
    };
    const AllOnClickHandler = () => {props.changeFiltter("all", props.id)};
    const ActiveOnClickHandler = () => {props.changeFiltter("active", props.id)};
    const CompletedOnClickHandler = () => {props.changeFiltter("completed", props.id)};
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addTask()};
    const deleteTodolistOnClickHandler = () => {
        props.deleteTodolist(props.id);
    }

    return (<div>
        <div className="HeaderTodolist">
            <h3 className="Title">{props.title}</h3>
            <button onClick={deleteTodolistOnClickHandler}>x</button>
        </div>
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