import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    console.log(error.message)
    dispatch(setAppError({error: error ? error.message : 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))

}