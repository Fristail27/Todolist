import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type filterValuesType = "all" | "active" | "completed"



function App() {

    let [tasks, setTasks] = useState <Array<TaskType>>( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ]);

    const [filter, setFilter] = useState <filterValuesType>("all")

    function changeFiltter(filterValue: filterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    let taskForTodoList = tasks;
    if (filter === "active") {
        taskForTodoList = tasks.filter(task => task.isDone === false)
    }
    if(filter === "completed") {
        taskForTodoList = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={taskForTodoList} removeTask={removeTask} changeFiltter={changeFiltter}/>
        </div>
    );
}

export default App;

