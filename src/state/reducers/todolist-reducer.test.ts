import {v1} from 'uuid'
import {TodoListsType} from "../../App";
import {todoListsReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    //data
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // testing function
    const endState = todoListsReducer(startState, {type: "REMOVE-TODOLIST", id: todolistId1})

    // expectation
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})