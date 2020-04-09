import React, {Fragment, useState} from 'react';
import {AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Paper } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GlobalFunctions from "../hooks/GlobalFunctions";
import Logout from "../hooks/Logout";
import strings from "../localization";



//Styles for the Top Navigation Bar
const useStyle = makeStyles((theme) => ({
    frag: {
        flexGrow: 1,
    },
    toolBar: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        flexGrow: 1
    },
    appBar: {
        position: "static",
        backgroundColor: "#108EE9",
    },
    iconButton: {
        color: "white",
    },
    logo: {
        flexGrow: 1,
        marginRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        maxWidth: 160
    },
    menu: {
        color:"inherit",
        edge: "end"
    },
    rightToolbar: {
        marginLeft: 'auto',
    },
}));

const NaviBar = () => {

    const TopNavigationBar = () => {
        const classes = useStyle();

        const [anchorEl, setAnchorEl] = useState(null);
        const {onItemClickNavigate} = GlobalFunctions();
        const {removeToken} = Logout;

        const logoutOnClick = () => {
            removeToken();
            console.log("user has been removed");
            window.location.href = '/login';
        };

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        //returns an reusable fragment
        return (
            <Fragment>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <img src={require('../assets/logo_mycampus.png')}
                             alt={strings.logoAlt} className={classes.logo}
                             onClick={() => onItemClickNavigate('home')}
                        />

                         <section className={classes.rightToolbar}>

                            <IconButton className={classes.menu}
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleClick}>
                                <MenuIcon/>
                            </IconButton>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    elevation={3}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >

                                    <MenuItem onClick={() => onItemClickNavigate('home')}>Home</MenuItem>
                                    <MenuItem onClick={() => onItemClickNavigate('restaurant')}>Restaurant</MenuItem>
                                    <MenuItem onClick={() => onItemClickNavigate('p5')}>Parking 5</MenuItem>
                                    <MenuItem onClick={() => onItemClickNavigate('p10')}>Parking 10</MenuItem>
                                    <MenuItem onClick={() => logoutOnClick()}>Logout</MenuItem>
                                </Menu>
                         </section>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    };
    return {
        TopNavigationBar: TopNavigationBar
    };
};
export default NaviBar;
