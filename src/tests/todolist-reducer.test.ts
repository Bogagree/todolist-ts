import {
    changeTodoEntityStatusAC,
    setTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "../features/Todolists/todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "React", filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "Redux", filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('todolist should be seted to the state', () => {

    const action = setTodolistAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('todolist entity status should be changed', () => {

    const endState = todolistsReducer(startState, changeTodoEntityStatusAC(todolistId1, 'loading'))

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})