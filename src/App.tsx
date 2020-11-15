import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const tasks1: Array<TaskType>  = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },

    ]
    const tasks2: Array<TaskType> = [
        { id: 1, title: "milk", isDone: true },
        { id: 2, title: "beer", isDone: true },
        { id: 3, title: "fish", isDone: false },

    ]
    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1} />
            <TodoList title={"What to buy"} tasks={tasks2} />
        </div>
    );
}

export default App;

