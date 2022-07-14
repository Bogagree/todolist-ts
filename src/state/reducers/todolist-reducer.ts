import {TodoListsType} from "../../App";
import {v1} from "uuid";

type TodoListReducerAT = RemoveTodoListAT | AddTodoListAT

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    newTitle: string
}

export const todoListsReducer =
    (todolists: Array<TodoListsType>, action: TodoListReducerAT): Array<TodoListsType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todolists.filter(tl => tl.id !== action.id)
            case "ADD-TODOLIST":
                let newTodoListID = v1();
                let newTodoList: TodoListsType = {id: newTodoListID, title: action.newTitle, filter: "all"};
                return [newTodoList, ...todolists];
            default:
                return todolists
        }
    }