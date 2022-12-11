import React, {useCallback, useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {Route, Routes} from 'react-router-dom';
import {Box, CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from './store';
import {Login} from '../features/Login/Login';
import {useDispatch} from 'react-redux';
import {initialiseAppTC} from './app-reducer';
import {logoutTC} from '../features/Login/auth-reducer';


function App() {

    const status = useAppSelector(state => state.app.status)
    const isInitialised = useAppSelector(state => state.app.isInitialised)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialiseAppTC())
    }, [dispatch])

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch]);

    if (!isInitialised) {
        return <div style={{position: 'absolute', top: '30%', right: '50%'}}><CircularProgress/></div>

    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Box>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </Box>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'*'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;

