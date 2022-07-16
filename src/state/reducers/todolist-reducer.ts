import {FilterValuesType, TodoListsType} from "../../App";
import {v1} from "uuid";

export type TodoListReducerAT =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
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

export const todoListsReducer =
    (todolists: Array<TodoListsType>, action: TodoListReducerAT): Array<TodoListsType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todolists.filter(tl => tl.id !== action.id)
            case "ADD-TODOLIST":
                let newTodoList: TodoListsType = {id: v1(), title: action.title, filter: "all"};
                return [newTodoList, ...todolists];
            case "CHANGE-TODOLIST-TITLE":
                return todolists.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            default:
                return todolists
        }
    }

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id: id
})

export const AddTodoListAC = (title: string): AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title: title,

})

export const ChangeTodoListTitleAC = (newId: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: newId,
    newTitle: title
})

export const ChangeTodoListFilterAC = (newId: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: newId,
    filter: filter
})