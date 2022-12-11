import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppError,
    SetAppErrorActionType,
    setAppStatus,
    SetAppStatusActionType
} from '../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newtodolist: TodolistDomainType = {...action.todolist, entityStatus: 'idle', filter: 'all'}
            return [newtodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, entityStatus: 'idle', filter: 'all'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state;
    }
}

// action creators
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const createTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const changeTodoEntityStatusAC = (id: string, entityStatus: RequestStatusType): ChangeTodolistEntityStatusActionType => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus}
}

//thunks
export const fetchTodolists = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
            .catch(error => {
                console.log(error)
                dispatch(setAppError({error: error.message}))
                dispatch(setAppStatus({status: 'failed'}))
            })
    }
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodoEntityStatusAC(id, 'loading'))
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            dispatch(removeTodolistAC(id))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(createTodolistAC(res.data.data.item))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id: string
    entityStatus: RequestStatusType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | ReturnType<typeof setTodolistAC>
    | ChangeTodolistEntityStatusActionType

type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>