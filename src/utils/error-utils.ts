import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    console.log(error.message)
    dispatch(setAppError(error ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
    // dispatch(setAppError({error: error.message}))
    // dispatch(setAppStatus({status: 'failed'}))
}