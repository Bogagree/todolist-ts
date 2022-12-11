import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handelServerAppError} from '../../utils/error-utils';

const initialState: authInitialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: authInitialStateType = initialState, action: ActionsType): authInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

// ActionCreators
// export const loginAC = (userData: LoginParamsType) => ({type: 'AUTH/LOGIN', payload: {userData}} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const);

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handelServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(setAppError({error: error.message}))
            dispatch(setAppStatus({status: 'failed'}))
        })
}

//types
export type authInitialStateType = {
    isLoggedIn: boolean
    // userData: LoginParamsType
}

type ActionsType = ReturnType<typeof setIsLoggedIn>
    | SetAppErrorActionType
    | SetAppStatusActionType

type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>

