import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/reducers/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithReducer = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    // const [todolists, setTodolists] = useState<Array<TodoListsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });
    let [todolists, dispatchTodolists] = useReducer(todoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todoListId: string, id: string) {
        let action = removeTaskAC(todoListId, id)
        dispatchTasks(action)
    }

    function addTask(todoListID: string, title: string) {
        dispatchTasks(addTaskAC(todoListID, title))
    }

    function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    }

    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTaskTitleAC(todoListID, taskId, newTitle))
    }

    const addTodoList = (newTitle: string) => {
        dispatchTodolists(addTodoListAC(newTitle))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatchTodolists(changeTodoListFilterAC(todoListID, value))
    }

    const removeTodoList = (todoListID: string) => {
        dispatchTodolists(removeTodoListAC(todoListID))
    }

    const changeTodoListTitle = (todolistID: string, newTitle: string) => {
        dispatchTodolists(changeTodoListTitleAC(todolistID, newTitle))
    }

    return (
        <div className="App">

            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '20px 10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todoListID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        deleteTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>

        </div>
    )
}
