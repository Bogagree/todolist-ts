import {TasksType} from "../../App";
import {v1} from "uuid";

export type TasksReducerAT =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT

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

export const tasksReducer = (tasks: TasksType, action: TasksReducerAT): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...tasks, [action.todoListID]: [newTask, ...tasks[action.todoListID]]}
        case "CHANGE-TASK-STATUS":
            return {...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }


        default:
            return tasks
    }
}

export const RemoveTaskAC = (todolistID: string, taskID: string): TasksReducerAT => ({
    type: "REMOVE-TASK",
    todolistID,
    taskID
})

export const AddTaskAC = (todoListID: string, title: string): TasksReducerAT => ({
    type: "ADD-TASK",
    todoListID,
    title
})

export const ChangeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean): TasksReducerAT => ({
    type: "CHANGE-TASK-STATUS",
    todoListID,
    taskId,
    isDone
})

export const ChangeTaskTitleAC = (todoListID: string, taskId: string, newTitle: string): TasksReducerAT => ({
    type: "CHANGE-TASK-TITLE",
    todoListID,
    taskId,
    newTitle
})

