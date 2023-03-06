import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as any,
    isInitialised: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
            state.isInitialised = action.payload.isInitialised
        }
    }
})

export const appReducer = slice.reducer;

export const {setAppStatus, setAppInitialised, setAppError} = slice.actions

// thunks
export const initialiseAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: true}))
            }
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setAppInitialised({isInitialised: true}))
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

