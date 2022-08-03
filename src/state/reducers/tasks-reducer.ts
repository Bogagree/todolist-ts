import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";

export type TasksReducerAT =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}

type AddTaskAT = {
    type: "ADD-TASK"
    todoListID: string
    title: string
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    todoListID: string
    taskId: string
    isDone: boolean
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todoListID: string
    taskId: string
    newTitle: string
}


export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerAT): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            const endState = {...state}
            delete endState[action.id]
            return endState
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): TasksReducerAT => {
    return {type: "REMOVE-TASK", todolistID, taskID} as const
}

export const addTaskAC = (todoListID: string, title: string): TasksReducerAT => {
    return {type: "ADD-TASK", todoListID, title} as const
}

export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean): TasksReducerAT => ({
    type: "CHANGE-TASK-STATUS", todoListID, taskId, isDone
})

export const changeTaskTitleAC = (todoListID: string, taskId: string, newTitle: string): TasksReducerAT => ({
    type: "CHANGE-TASK-TITLE", todoListID, taskId, newTitle
})

