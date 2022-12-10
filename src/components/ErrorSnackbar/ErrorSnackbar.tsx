import {forwardRef, SyntheticEvent} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
import {useDispatch} from 'react-redux';
import {setError} from '../../app/app-reducer';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    // const [open, setOpen] = useState(true);

    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()

    const isOpen = error !== null

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError({error: null}))
        // setOpen(false);
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}