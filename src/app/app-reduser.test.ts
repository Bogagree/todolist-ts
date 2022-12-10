import {appReducer, InitialStateType, RequestStatusType, setAppError, setAppStatus} from '../app/app-reducer';


let startState: InitialStateType

beforeEach(() => {

    startState = {
        status: 'idle' as RequestStatusType,
        error: null
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError({error: 'test error'}))

    expect(endState.error).toBe('test error')
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})