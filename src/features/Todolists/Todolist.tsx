import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../components/Additemform/AddItemForm'
import {EditableSpan} from '../../components/Editablespan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from './todolists-reducer'
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./tasks-reducer";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

// export const Todolist = React.memo(function ( TodoListPropsType) {
export const Todolist = React.memo(function ({
                                                 todolist,
                                                 removeTodolist,
                                                 removeTask,
                                                 tasks,
                                                 addTask,
                                                 changeTaskTitle,
                                                 changeTodolistTitle,
                                                 changeTaskStatus,
                                                 changeFilter
                                             }: TodoListPropsType) {

    const dispatch = useDispatch()

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [todolist.id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])


    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist && tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                                                                    removeTask={removeTask}
                                                                    changeTaskTitle={changeTaskTitle}
                                                                    changeTaskStatus={changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


