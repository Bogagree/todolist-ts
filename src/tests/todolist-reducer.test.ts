import {setTodolistAC, TodolistDomainType, todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";

let todolistId1:string
let todolistId2:string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "React", filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: "Redux", filter: 'all', addedDate: '', order: 0}
    ]
})

test ('todolist should be seted to the state', () => {

    const action = setTodolistAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})