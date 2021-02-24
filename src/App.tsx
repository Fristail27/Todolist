import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    ChangeTodolistFilterAC, changeTodolistTitleTC,
    createTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {
    addTasksTC,
    updateTaskStatusTC, removeTaskTC, updateTaskTitleTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskPriorities} from "./api/todolist-api";
import { RequestStatusType } from './state/app-reducer';
import {ErrorSnackbar} from "./components/errorSnackBar/ErrorSnackBar";

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    entityStatus: RequestStatusType
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type filterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>> (state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType> (state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFiltter = useCallback((filterValue: filterValuesType, todolistID: string) =>{
        const action = ChangeTodolistFilterAC(todolistID, filterValue)
        dispatch(action)}, [dispatch])
    const removeTask = useCallback( (taskID: string, todolistID: string)=> {
        const action = removeTaskTC(taskID, todolistID)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistID: string) =>{
        const action = addTasksTC(todolistID, title)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback ((taskID: string, status: TaskStatuses, todolistID: string)=> {
        const action = updateTaskStatusTC(taskID, todolistID, status)
        dispatch(action);
    }, [dispatch])
    const deleteTodolist = useCallback ((todolistID: string) =>{
        const action = removeTodolistTC(todolistID)
        dispatch(action);
    }, [dispatch])
    const addTodoList =useCallback((title: string) =>{
        const action = createTodolistTC(title)
        dispatch(action)
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) =>{
        const action = updateTaskTitleTC(taskID, todolistID, title)
        dispatch(action);
    }, [dispatch])
    const changeTodolistTitle =useCallback((title: string, todolistID: string)=> {
        const action = changeTodolistTitleTC(todolistID, title)
        dispatch(action);
    }, [dispatch])

    return (
        <div className="App">
            {error && <ErrorSnackbar errorMessage={error}/>}
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
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed={true} >
                <Grid style={{padding:"15px"}} container={true}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todolists.map(tl => {
                            return (
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "15px", borderRadius:"9px"}} elevation={5} >
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasks[tl.id]}
                                            filter={tl.filter}
                                            entityStatus={tl.entityStatus}
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


export default App;

