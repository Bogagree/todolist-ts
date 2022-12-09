import {Dispatch} from 'redux';

const initialState: any = {}

export const tasksReducer = (state: any = initialState, action: ActionsType): any => {
    switch (action.type) {

        default:
            return state;
    }
}

// ActionCreators
// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
//     return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
// }

// thunks
export const updateTasksTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    alert()
}

//types
type ActionsType = any

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
type ThunkDispatch = Dispatch<ActionsType>

