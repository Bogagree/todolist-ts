import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/Login/auth-reducer';

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialised: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case 'APP/SET-ERROR':
        case 'APP/SET-IS-INITIALISED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

// ActionCreators
export const setAppError = (error: string | null) => {
    return {type: 'APP/SET-ERROR', payload: {error: error}} as const
}
export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', payload: {status: status}} as const
}
export const setAppInitialised = (value: boolean) => {
    return {type: 'APP/SET-IS-INITIALISED', payload: {isInitialised: value}} as const
}

// thunks
export const initialiseAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
            dispatch(setAppStatus('succeeded'))
            dispatch(setAppInitialised(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialised: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
export type SetAppInitialisedActionType = ReturnType<typeof setAppInitialised>

type ActionsType = SetAppErrorActionType | SetAppStatusActionType | SetAppInitialisedActionType
