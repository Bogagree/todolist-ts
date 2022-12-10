import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from './store';


function App() {

    const status = useAppSelector(state => state.app.status)

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/"} element={<TodolistsList/>}/>
                        <Route path={'*'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

