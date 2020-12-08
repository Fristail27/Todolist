import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type filterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string,
    title: string,
    filter: filterValuesType,

}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]);
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "NodeJS", isDone: false},
            {id: v1(), title: "Angular", isDone: false},],
        [todolistID2]: [
            {id: v1(), title: "Vodka1", isDone: true},
            {id: v1(), title: "Vodka2", isDone: false},
            {id: v1(), title: "Vodka3", isDone: false},
        ],
    });

    function changeFiltter(filterValue: filterValuesType, todolistID: string) {
        const todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }
        ;
    };

    function removeTask(taskID: string, todolistID: string) {
        const todolistTasks = tasks[todolistID].filter(t => t.id !== taskID);
        tasks[todolistID] = todolistTasks;
        setTasks({...tasks})
    };

    function addTask(title: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]];
        setTasks({...tasks})
    };

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const task = tasks[todolistID].find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
        ;
    };

    function deleteTodolist (todolistID:string) {
        setTodolists( todolists.filter(el => el.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    };

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        taskForTodoList = tasks[tl.id].filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        taskForTodoList = tasks[tl.id].filter(task => task.isDone)
                    }
                    return(
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
                    />)
                })
            }
        </div>
    );
}

export default App;

