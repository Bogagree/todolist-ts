import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handelServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: any) {
            state.isLoggedIn = action.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const setIsLoggedIn = slice.actions.setIsLoggedIn

// redux reducer
// export const authReducer = (state: authInitialStateType = initialState, action: ActionsType): authInitialStateType => {
//     switch (action.type) {
//         case 'AUTH/SET-IS-LOGGED-IN':
//             return {...state, ...action.payload};
//         default:
//             return state;
//     }
// }

// ActionCreators
// export const loginAC = (userData: LoginParamsType) => ({type: 'AUTH/LOGIN', payload: {userData}} as const)
// export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const);

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn)
                dispatch(setAppStatus('succeeded'))
            } else {
                handelServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn)
                dispatch(setAppStatus('succeeded'))
            } else {
                handelServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types

// type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>