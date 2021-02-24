import React, {useCallback, useEffect} from "react";
import {filterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "./api/todolist-api";
import {Task} from "./Task";
import { fetchTasksTC } from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "./state/app-reducer";

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    filter: filterValuesType,
    entityStatus: RequestStatusType
    addTask: (title: string, todolistID: string) => void,
    removeTask: (taskID: string, todolistID: string) => void,
    changeFiltter: (filterValue: filterValuesType, todolistID: string) => void,
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    deleteTodolist: (todolistID: string) => void,
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void,
    changeTodolistTitle: (title: string, todolistID: string) => void,
}

export const TodoList = React.memo((props: PropsType) =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])
    console.log(props.tasks)
    const {id, changeFiltter, addTask: addTaskT, changeTodolistTitle:changeTodolistTitleT } = props
    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const tasks = tasksForTodolist.map(t => {
        return (
            <Task key={t.id} task={t} todolistId={props.id}
                  removeTask={props.removeTask}
                  changeTaskTitle={props.changeTaskTitle}
                  changeTaskStatus={props.changeStatus}
                  disabled={t.entityStatus === 'loading'}
            />
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
            <IconButton disabled={props.entityStatus === "loading"} onClick={deleteTodolistOnClickHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === "loading"}/>
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