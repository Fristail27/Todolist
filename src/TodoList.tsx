import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, TaskType, TodolistType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: filterValuesType,
    addTask: (title: string, todolistID: string) => void,
    removeTask: (taskID: string, todolistID: string) => void,
    changeFiltter: (filterValue: filterValuesType, todolistID: string) => void,
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void,
    deleteTodolist: (todolistID: string) => void,
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void,
    changeTodolistTitle: (title: string, todolistID: string) => void,
}

export function TodoList(props: PropsType) {
    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    onChange={changeStatus}
                    checked={taskObj.isDone}
                />
                {/*<input*/}
                {/*    onChange={changeStatus}*/}
                {/*    type="checkbox"*/}
                {/*    checked={taskObj.isDone}*/}
                {/*/>*/}
                <EditableSpan getNewTitle={changeTaskTitle} value={taskObj.title}/>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>

            </li>
        )
    });
    const AllOnClickHandler = () => {
        props.changeFiltter("all", props.id)
    };
    const ActiveOnClickHandler = () => {
        props.changeFiltter("active", props.id)
    };
    const CompletedOnClickHandler = () => {
        props.changeFiltter("completed", props.id)
    };
    const deleteTodolistOnClickHandler = () => {
        props.deleteTodolist(props.id);
    };
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (<div>
        <h3 className="Title">
            <EditableSpan value={props.title} getNewTitle={changeTodolistTitle}/>
            {/*<button onClick={deleteTodolistOnClickHandler}>x</button>*/}
            <IconButton onClick={deleteTodolistOnClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle:"none", paddingLeft:"0"}}>
            {tasks}
        </ul>
        <div style={{textAlign:"center"}}>
            <ButtonGroup color="primary" size={"small"}>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={AllOnClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={ActiveOnClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={CompletedOnClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>)
}