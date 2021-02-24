import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {setAppErrorAC} from "../../state/app-reducer";
import { useDispatch } from 'react-redux';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

type ErrorSnackbarPropsType = {
    errorMessage: string | null
}

export function ErrorSnackbar(props: ErrorSnackbarPropsType) {
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={!!props.errorMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {props.errorMessage}
            </Alert>
        </Snackbar>
    )
}
