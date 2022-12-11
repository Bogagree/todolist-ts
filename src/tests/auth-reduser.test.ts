import {authInitialStateType, authReducer, setIsLoggedIn} from '../features/Login/auth-reducer';


let startState: authInitialStateType

beforeEach(() => {

    startState = {
        isLoggedIn: false
    }
})

test('after lionisation isLoggedIn should be true ', () => {

    const endState = authReducer(startState, setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})
