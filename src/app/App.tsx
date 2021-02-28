import React, {useEffect} from 'react'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import {NavLink, Redirect, Route, Switch } from 'react-router-dom'
import {Login} from "../features/login/login";
import {initializeAppTC, logoutTC} from '../features/login/auth-reducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch=useDispatch()
    const isInitialized = useSelector<AppRootStateType>(state => state.auth.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    useEffect(()=> {
        dispatch(initializeAppTC())
    },[dispatch])
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    const onClickLogout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {!isLoggedIn && <Button color="inherit"><NavLink style={{width:'100%', height:"100%", color: 'white', textDecoration: 'none'}} to={'/login'}>Log In</NavLink></Button>}
                    {isLoggedIn && <Button onClick={onClickLogout} color="inherit">Log out</Button>}
                </Toolbar>
             { status === 'loading' &&  <LinearProgress /> }
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={"/"} render={()=><TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} render={()=><Login/>}/>
                    <Route path={'/404'} render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    <Redirect from={ '*' } to={'/404'}/>
                </Switch>
            </Container>
        </div>
    )
}

export default App
