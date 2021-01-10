import React from 'react';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import AppState from "../../redux/appState";

const useStyles = makeStyles(() => ({
    loadingWrapper: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#232323',
        zIndex: 99999,
        left: 0,
        top: 0
    },
    loading: {
        position: 'fixed',
        left: '48%',
        top: '46%'
    }
}));


const Loading: React.FC = () => {
    
    const classes = useStyles();
    const loading = useSelector((state: AppState) => state.themeReducers.loading);

    return (
        <Fade in={loading} >
            <div className={classes.loadingWrapper}>
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            </div>
        </Fade>
    )
}

export default Loading;