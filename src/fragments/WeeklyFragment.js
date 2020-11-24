import React, {Fragment, useEffect, useState} from 'react';
import {Box, Container,Dialog} from '@material-ui/core';
import API from '../hooks/ApiHooks';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import useStyle from "../styles/restaurantStyles";

const WeeklyFragment = () => {

    const {menuByWeek} = API();
    const classes = useStyle();

    //This creates the dialog that you see when you click an item in the weekly menu
    const DialogF = (props) => {

        //selected value has the menu and date data for the element which was clicked
        const {selectedValue, onClose, open} = props;

        const handleClose = () => {
            onClose();
        };

        return (
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClick={handleClose}>
                <Box className={classes.DialogContainer}>

                    <h3>
                        {selectedValue.date}
                    </h3>

                    {(Object.keys(selectedValue.courses) || []).map(key => (

                        <div key={key} >
                            <p className={classes.TopP}>
                                {selectedValue.courses[key].category}
                            </p>
                                <Grid container direction="row" className={classes.overStyle}>

                                    <Grid item container direction="column" className={classes.overStyle}>

                                        <Grid item>

                                            <Grid item className={classes.Card}>
                                                <Grid container direction="row">
                                                    <Grid item className={classes.mItem}>
                                                        <p>
                                                            {selectedValue.courses[key].title_fi}
                                                        </p>
                                                    </Grid>
                                                    <Grid item className={classes.mInfo}>
                                                        <p className={classes.mProperties}>
                                                            <p className={classes.properties}>
                                                                {selectedValue.courses[key].properties}
                                                            </p>
                                                            <p>
                                                                {selectedValue.courses[key].price}
                                                            </p>
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                    ))}
                </Box>
            </Dialog>
        );
    };

        DialogF.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };

    const Week = (props) => {

        const [open, setOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState({
            date: "",
            courses: {
                1:{
                    title_fi: "",
                    title_en: "",
                    category: "",
                    price: "",
                    properties: "",
                },
            },
        });

        const [dataForRender, setDataForRender] = useState({
            timeperiod: "",
            mealdates: [
                {
                date: "",
                courses: {
                    1:{
                        title_fi: "",
                        title_en: "",
                        category: "",
                        price: "",
                        properties: "",
                    },
                },
            },
            ]
        });

        //open clicked item
        const handleClickOpen = (value) => {
            setOpen(true);
            setSelectedValue(value)
        };

        //close item
        const handleClickClose = () => {
            setOpen(false);
        };

        //get weekly menu and st json to temp
        useEffect(() => {
            menuByWeek()
                .then(json => setDataForRender(json));
        }, [props]);

        //The data for the menu of the day is stored in the created element, and sent to the dialog function by clicking the element
        return (
            <Fragment>
                <Container className={classes.MenuContainer}>
                    <h3>
                        Weekly menu
                    </h3>
                    <Box className={classes.MenuContainer}>

                        {dataForRender.mealdates.map(key => (
                            <div key={key} onClick={() => handleClickOpen(key)}>

                                <Grid item container direction="column" className={classes.WeeklyContainer}>

                                    <Grid item>

                                        <Grid item className={classes.Card}>

                                            <Grid container direction="row">

                                                <Grid item className={classes.mItem}>

                                                    <p className={classes.TopP}>
                                                        {key.date}
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </Box>
                </Container>
                <DialogF selectedValue={selectedValue} open={open}
                         onClose={handleClickClose}/>
            </Fragment>
        );
    };
    return {
        Week: Week,
    };
};

export default WeeklyFragment;