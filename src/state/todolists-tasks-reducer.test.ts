import {todoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {filterValuesType, TodolistType} from '../App';

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: filterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: "CHANGE-TODOLIST-FILTER" as const,
        todoListID: todolistId2,
        filter: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



