import {tasksReducer} from '../features/Todolists/tasks-reducer';
import {todolistsReducer} from '../features/Todolists/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import {appReducer} from './app-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware()
//             .prepend(
//                 // correctly typed middlewares can just be used
//                 additionalMiddleware,
//                 // you can also type middlewares manually
//                 untypedMiddleware as Middleware<
//                     (action: Action<'specialAction'>) => number,
//                     RootState
//                     >
//             )
//             // prepend and concat calls can be chained
//             .concat(logger),
// })
// })

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;


