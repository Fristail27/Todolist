import React, {useCallback} from "react";
import {filterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

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

export const TodoList = React.memo((props: PropsType) =>{
    const {id, changeFiltter, addTask: addTaskT, changeTodolistTitle:changeTodolistTitleT } = props
    let taskForTodoList = props.tasks
    if (props.filter === "active") {
        taskForTodoList = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        taskForTodoList = props.tasks.filter(task => task.isDone)
    }
    const tasks = taskForTodoList.map(taskObj => {
        return (
            <Task key={taskObj.id} id={taskObj.id} todolistID={props.id} title={taskObj.title} isDone={taskObj.isDone} changeStatus={props.changeStatus} changeTaskTitle={props.changeTaskTitle} removeTask={props.removeTask}/>
        )
    })
    const AllOnClickHandler = useCallback (() => {
        changeFiltter("all", id)
    }, [changeFiltter, id])
    const ActiveOnClickHandler = useCallback (() => {
        changeFiltter("active", id)
    }, [changeFiltter, id])
    const CompletedOnClickHandler = useCallback (() => {
        changeFiltter("completed", id)
    }, [changeFiltter, id])
    const deleteTodolistOnClickHandler = () => {
        props.deleteTodolist(id);
    };
    const addTask = useCallback((title: string) => {
        addTaskT(title, id)
    }, [addTaskT, id]);
    const changeTodolistTitle = useCallback ((title: string) => {
        changeTodolistTitleT(title, id)
    }, [changeTodolistTitleT, id])

    return (<div>
        <h3 className="Title">
            <EditableSpan value={props.title} getNewTitle={changeTodolistTitle}/>
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
})