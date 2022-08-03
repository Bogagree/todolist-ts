import {tasksReducer2} from "../../arhive/tasks-reducer-09";
import {TasksStateType, TodoListsType} from "../../App";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListsType> = [];
    const action = addTodoListAC("new todolist");
    const endTasksState = tasksReducer2(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC("todolistId2");
    const endState = tasksReducer2(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('use task reducer to add newTodoList', () => {

    const action = addTodoListAC('What to drink')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")

    if (!newKey) {
        throw new Error('new key should be added')
    }

    const idTodolist_N1 = keys[0]
    const taskTitle = endState[keys[1]][0].title

    expect(keys.length).toBe(3)
    expect(idTodolist_N1).toBe("todolistId1")
    expect(taskTitle).toBe("bread")
    expect(endState[newKey]).toEqual([])

})
