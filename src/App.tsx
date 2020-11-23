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



function App() {

    let [tasks, setTasks] = useState <Array<TaskType>>( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "NodeJS", isDone: false },
        { id: v1(), title: "Angular", isDone: false },
    ]);


    const [filter, setFilter] = useState <filterValuesType>("all")

    function changeFiltter(filterValue: filterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }

    let taskForTodoList = tasks;
    if (filter === "active") {
        taskForTodoList = tasks.filter(task => !task.isDone)
    }
    if(filter === "completed") {
        taskForTodoList = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={taskForTodoList} addTask={addTask} removeTask={removeTask} changeFiltter={changeFiltter}/>
        </div>
    );
}

export default App;

