import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodoListActionCreator,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type filterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: filterValuesType,

}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // const todolistID1 = v1();
    // const todolistID2 = v1();
    // const [todolists, dispatchToTodolists] = useReducer(todoListsReducer,[
    //     {id: todolistID1, title: "What to learn", filter: "all"},
    //     {id: todolistID2, title: "What to buy", filter: "all"},
    // ]);
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "NodeJS", isDone: false},
    //         {id: v1(), title: "Angular", isDone: false},],
    //     [todolistID2]: [
    //         {id: v1(), title: "Vodka1", isDone: true},
    //         {id: v1(), title: "Vodka2", isDone: false},
    //         {id: v1(), title: "Vodka3", isDone: false},
    //     ],
    // });

    const todolists = useSelector<AppRootStateType, Array<TodolistType>> (state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType> (state => state.tasks)

    const dispatch = useDispatch()

    function changeFiltter(filterValue: filterValuesType, todolistID: string) {
        const action = ChangeTodolistFilterAC(todolistID, filterValue)
        const todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = filterValue;
            dispatch(action);
        }

    };
    function removeTask(taskID: string, todolistID: string) {
        const action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    };
    function addTask(title: string, todolistID: string) {
        const action = addTaskAC(title, todolistID)
        dispatch(action)
    };
    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todolistID)
        dispatch(action);
    };
    function deleteTodolist(todolistID: string) {
        const action = RemoveTodoListActionCreator(todolistID)
        dispatch(action);
    };
    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    };
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const action = changeTaskTitleAC(taskID, title, todolistID)
        dispatch(action);
    };
    function changeTodolistTitle(title: string, todolistID: string) {
        const action = ChangeTodolistTitleAC(todolistID, title)
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true} >
                <Grid style={{padding:"15px"}} container={true}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todolists.map(tl => {
                            let taskForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                taskForTodoList = tasks[tl.id].filter(task => !task.isDone)
                            }
                            if (tl.filter === "completed") {
                                taskForTodoList = tasks[tl.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "15px", borderRadius:"9px"}} elevation={5} >
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={taskForTodoList}
                                            filter={tl.filter}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFiltter={changeFiltter}
                                            changeStatus={changeStatus}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

