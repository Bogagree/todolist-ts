import {appReducer, InitialStateType, RequestStatusType, setError, setStatus} from '../app/app-reducer';


let startState: InitialStateType

beforeEach(() => {

    startState = {
        status: 'idle' as RequestStatusType,
        error: null
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setError({error: 'test error'}))

    expect(endState.error).toBe('test error')
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})