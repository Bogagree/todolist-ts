import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let todolistID1: string
let todolistID2: string
let taskID1: string
let taskID2: string
let startState: TasksStateType

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    taskID1 = v1()
    taskID2 = v1()

    startState = {
        [todolistID1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: taskID2, title: "JS2", isDone: true},
        ]
    }
})

test('correct task should be removed', () => {
    let taskID4 = v1()
    let taskID5 = v1()

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: taskID4, title: "JS2", isDone: true},
            {id: taskID5, title: "ReactJS2", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistID2, taskID5))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(2)
    expect(endState[todolistID2].find(el => el.title === "JS2")).toStrictEqual({
        id: taskID4,
        title: "JS2",
        isDone: true
    })
})

test('new task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistID2, "React"))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2][0].title).toBe("React")
})


test('task status should be changed', () => {
    let taskID1 = v1()
    let taskID2 = v1()

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: taskID2, title: "JS2", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistID2, taskID2, false))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(2)
    expect(endState[todolistID2][1].isDone).toBe(false)
})

test('task title should be changed', () => {
    let taskID1 = v1()
    let taskID2 = v1()

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: taskID1, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: taskID2, title: "JS2", isDone: true},
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistID1, taskID1, "React"))
    const endState2 = tasksReducer(startState, changeTaskTitleAC(todolistID2, taskID2, "Redux"))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState2[todolistID2].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe("React")
    expect(endState2[todolistID2][1].title).toBe("Redux")
})