import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    function removeTask(todoListId: string, id: string) {
        let action = removeTaskAC(todoListId, id)
        dispatch(action)
    }

    function addTask(todoListID: string, title: string) {
        dispatch(addTaskAC(todoListID, title))
    }

    function changeTaskStatus(todoListID: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todoListID, taskId, isDone))
    }

    const changeTaskTitle = (todoListID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskId, newTitle))
    }

    const addTodoList = (newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }

    const changeTodoListTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todolistID, newTitle))
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

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
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
