const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
}

// ActionCreators
export const setError = (error: { error: string | null }) => {
    return {type: 'APP/SET-ERROR', payload: error} as const
}

export const setStatus = (status: { status: RequestStatusType }) => {
    return {type: 'APP/SET-STATUS', payload: status} as const
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

export type SetErrorActionType = ReturnType<typeof setError>
export type SetStatusActionType = ReturnType<typeof setStatus>

type ActionsType = SetErrorActionType | SetStatusActionType
