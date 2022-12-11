import {
    appReducer,
    AppInitialStateType,
    RequestStatusType,
    setAppError,
    setAppStatus,
    setAppInitialised
} from './app-reducer';


let startState: AppInitialStateType

beforeEach(() => {

    startState = {
        status: 'idle' as RequestStatusType,
        error: null,
        isInitialised: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppError('test error'))

    expect(endState.error).toBe('test error')
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})

test('App should be initialised', () => {

    const endState = appReducer(startState, setAppInitialised(true))

    expect(endState.isInitialised).toBe(true)
})