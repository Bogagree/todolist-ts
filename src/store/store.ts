import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/reducers/tasks-reducer";
import {todoListsReducer} from "../state/reducers/todolist-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store

