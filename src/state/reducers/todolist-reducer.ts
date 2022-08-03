import {FilterValuesType, TodoListsType} from "../../App";
import {v1} from "uuid";
import {todolistID1, todolistID2} from "./tasks-reducer";

export type TodoListReducerAT =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    newTitle: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

const initialState: Array<TodoListsType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todoListsReducer =
    (state: Array<TodoListsType> = initialState, action: TodoListReducerAT): Array<TodoListsType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return state.filter(tl => tl.id !== action.id)
            case "ADD-TODOLIST":
                let newTodoList: TodoListsType = {id: action.todolistId, title: action.title, filter: "all"};
                return [newTodoList, ...state];
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            default:
                return state
        }
    }

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id: id
})

export const addTodoListAC = (title: string): AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
})

export const changeTodoListTitleAC = (newId: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: newId,
    newTitle: title
})

export const changeTodoListFilterAC = (newId: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: newId,
    filter: filter
})