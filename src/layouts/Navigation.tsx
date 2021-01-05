import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import HotDealIcon from '@material-ui/icons/Whatshot';
import CategoryIcon from '@material-ui/icons/Category';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { useHistory } from "react-router-dom";

import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';

import { ThemeToggleMenuAction, ThemeDarkModeAction } from '../redux/theme/themeActions';
import { useDispatch, useSelector } from 'react-redux';
import AppState from "../redux/appState";

interface INavigation {
    classes: any;
}

const Navigation = (props: INavigation): React.ReactElement => {

    const { classes } = props;

    const history = useHistory();
    const dispatch = useDispatch();
    const menuOpen = useSelector((state: AppState) => state.themeReducers.menuOpen);
    const darkMode = useSelector((state: AppState) => state.themeReducers.darkMode);

    const handleNavigationButton = (link: string) => {
        history.push(`/${link}`);
    }


    return (
        <React.Fragment>
            <AppBar position="absolute" className={clsx(classes.appBar, menuOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => dispatch(ThemeToggleMenuAction())}
                        className={clsx(classes.menuButton, menuOpen && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>


                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={() => dispatch(ThemeDarkModeAction())}
                                name="darkMode"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label={darkMode ? <NightsStayIcon /> : <WbSunnyIcon />}
                    />

                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>


                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !menuOpen && classes.drawerPaperClose),
                }}
                open={menuOpen}
            >

                <div className={classes.toolbarHeader}>
                    <div className={classes.toolbarApp}>
                        <h1 className={classes.toolbarAppText}>Admin Panel</h1>
                    </div>

                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => dispatch(ThemeToggleMenuAction())}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                </div>

                <Divider />
                <List>
                    <ListItem button onClick={() => handleNavigationButton("dashboard")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button onClick={() => handleNavigationButton("users")}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Kullanıcılar" />
                    </ListItem>

                    <ListItem button onClick={() => handleNavigationButton("hotDeals")}>
                        <ListItemIcon>
                            <HotDealIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sıcak Fırsatlar" />
                    </ListItem>

                    <ListItem button onClick={() => handleNavigationButton("categories")}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Kategoriler" />
                    </ListItem>




                </List>
            </Drawer>
        </React.Fragment>
    );
}

export default Navigation;
