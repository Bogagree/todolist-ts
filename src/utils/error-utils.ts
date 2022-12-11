import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { error: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    console.log(error)
    dispatch(setAppError(error.error.length ? error : {error: 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
    // dispatch(setAppError({error: error.message}))
    // dispatch(setAppStatus({status: 'failed'}))
}