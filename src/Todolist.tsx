import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    deleteTodoList: (todoListID: string) => void
    changeTaskTitle: (todoListID: string, taskId: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all")
    ;
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active")
    ;
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

    const deleteHandler = () => props.deleteTodoList(props.todoListID)

    const onChangeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)

    }

    return <div>


        <EditableSpan title={props.title} onChange={onChangeTodoListTitleHandler}/>

        <IconButton onClick={deleteHandler} aria-label="delete">
            <Delete/>
        </IconButton>

        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListID, t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.todoListID, t.id, newValue);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeStatusHandler}*/}
                        {/*       checked={t.isDone}/>*/}

                        <Checkbox onChange={onChangeStatusHandler}
                                  checked={t.isDone}/>

                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }

        </ul>
        <div>

            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary" size={'small'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="success" size={'small'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="error" size={'small'}
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}
