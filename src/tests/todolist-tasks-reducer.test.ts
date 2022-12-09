import {setTodolistAC, TodolistDomainType} from "../features/Todolists/todolists-reducer";
import {v1} from "uuid";
import {setTasksAC, tasksReducer, TasksStateType} from "../features/Todolists/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]
let tasksStartState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "React", filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: "Redux", filter: 'all', addedDate: '', order: 0}
    ]

    tasksStartState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }

})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistAC(startState)

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys[0]).toBe(todolistId1)
    expect(keys[1]).toBe(todolistId2)
    expect(endState[todolistId1]).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC('todolistId1', tasksStartState['todolistId1'])

    const endTaskState = tasksReducer({
        'todolistId1': [],
        'todolistId2': [],
    }, action)

    expect(endTaskState['todolistId1'].length).toBe(3)
    expect(endTaskState['todolistId2'].length).toBe(0)

})
