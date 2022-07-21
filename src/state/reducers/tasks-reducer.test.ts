import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be removed', () => {
    //data
    let todolistID1 = v1()
    let todolistID2 = v1()

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

    // testing function
    const endState = tasksReducer(startState, RemoveTaskAC(todolistID2, taskID5))

    // expectation
    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(2)
    expect(endState[todolistID2].find(el => el.title === "JS2")).toStrictEqual({
        id: taskID4,
        title: "JS2",
        isDone: true
    })
})

test('new task should be added', () => {
    //data
    let todolistID1 = v1()
    let todolistID2 = v1()

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

    // testing function
    const endState = tasksReducer(startState, AddTaskAC(todolistID2, "React"))

    // expectation
    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2][0].title).toBe("React")
})


test('task status should be changed', () => {
    //data
    let todolistID1 = v1()
    let todolistID2 = v1()

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

    // testing function
    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistID2, taskID2, false))

    // expectation
    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(2)
    expect(endState[todolistID2][1].isDone).toBe(false)
})

test('task title should be changed', () => {
    //data
    let todolistID1 = v1()
    let todolistID2 = v1()

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

    // testing function
    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistID1, taskID1, "React"))
    const endState2 = tasksReducer(startState, ChangeTaskTitleAC(todolistID2, taskID2, "Redux"))

    // expectation
    expect(endState[todolistID1].length).toBe(2)
    expect(endState2[todolistID2].length).toBe(2)
    expect(endState[todolistID1][0].title).toBe("React")
    expect(endState2[todolistID2][1].title).toBe("Redux")
})