/*
Made by Xyphnos
This function gets the menu for the current day from Sodexo and the restaurant usage data from Levitezer.
Code maps the usage data and sends the current usage to a redux state, and then fetches the menu data and
adds it to the same redux state. After these a function matches the correct line with the correct usage using
Data.js, and then renders the page
*/

import React, {Fragment, useState} from 'react';
import {Box, Container} from '@material-ui/core';
import API from '../hooks/ApiHooks';
import Data from "../hooks/Data";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ApiUrls from "../hooks/ApiUrls";
import useStyle from "../styles/restaurantStyles";
import {menu} from "../actions/RestaurantActions";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

const MenuFragment = () =>{

    const {menuByDate} = API();
    const {lines, times, colours} = Data();
    const classes = useStyle();
    let date = new Date();

    //this renders the menu
    const renderLines = (queueTimes) => (
        <Box className={classes.MenuContainer}>

            {[...queueTimes.keys()].map(mapKey => (
                <div key={mapKey} >

                    <p className={classes.TopP}>
                        {queueTimes.get(mapKey)[1].category}
                    </p>

                    {queueTimes.get(mapKey) != null &&
                    <Grid container direction="row" className={classes.overStyle}>

                        <Grid item container direction="column" className={classes.menuStyle}>

                            <Grid item>

                                <Grid item className={classes.Card}>
                                    <Grid container direction="row">
                                        <Grid item className={classes.mItem}>
                                            <p>
                                                {queueTimes.get(mapKey)[1].title_fi}
                                            </p>
                                        </Grid>
                                        <Grid item className={classes.mInfo}>
                                            <div>
                                                <p className={classes.properties}>
                                                    {queueTimes.get(mapKey)[1].properties}
                                                </p>
                                                <p>
                                                    {queueTimes.get(mapKey)[1].price}
                                                </p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item className={classes.waitStyle}>
                            <Box className="lineDiv"
                                 borderRadius="5px 5px 5px 5px"
                                 p={1}
                                 m={1}
                                 bgcolor={colours.get(parseInt(queueTimes.get(mapKey)[0].queue_time))}
                                 borderColor="#E9E9E9">
                                <Grid container direction="row"
                                      justify="space-between"
                                      alignItems="center">
                                    <Grid>
                                        <Typography>
                                            {times.get(parseInt(queueTimes.get(mapKey)[0].queue_time))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    }
                </div>
            ))}
        </Box>
    );

    const Menu = (props) => {

        const {getUsageDataNoProps} = API();
        const {restaurantQueueUrl} = ApiUrls();
        const [usedLines, setUsedLines] = useState(new Map([[1, 'FAVORITES']]));
        const [stopper, setStopper] = useState(0);
        //stuff for redux
        const menuState = useSelector(state => state.MenuReducer);
        const dispatch = useDispatch();


        //get the menu for today and set it into dataForRender
        const getQueueTimes = async () => {
            //create a new map to get the data in the state in right format
            let queue = new Map();
            //run 8 times, once for each queue time
                for (let i = 1; i < 9; i++) {
                    getUsageDataNoProps(restaurantQueueUrl + i)
                        .then(result => dispatch(menu(queue.set(i, result))))
                }
        };

        //this checks that the redux state has no data
        if(menuState.length === 0) {
            getQueueTimes().then();
        }
        //checks that the redux state has an entry, which in this case is queue times
        if(menuState.length === 1) {
            menuByDate(date)
                .then(json => dispatch(menu(json.courses)));
        }

        console.log(menuState);
        //checks that redux state has 2 entries
        if(menuState.length === 2) {

            //null case since there is no menu data on weekends
            if(menuState[1] !== null) {

                let check = menuState[1];
                //this gives us the amount of menu entries there are
                let lengthy = Object.keys(check).length + 1;
                //amount of queue times
                let queueLength = menuState[0].size;
                //map for data
                let temp = new Map();

                // Check that queueTimes has all entries, and that this part of the program didnt run already
                if (queueLength === 8 && stopper === 0) {
                    //run for each entry from sodexo
                    for (let i = 1; i < lengthy; i++) {
                        // run for each entry in Data.js
                        for (let l = 1; l < 9; l++) {
                            //check for matching values
                            if (check[i].category === lines.get(l)) {
                                //set the values into the Map
                                temp.set(
                                    l, [menuState[0].get(l), check[i]]
                                );
                            }
                        }
                    }
                    //set the Map as the value for state
                    setUsedLines(temp);
                    //stop this from running again until the page is refreshed
                    setStopper(2);
                }
            }

            //this gives some data for the page in case there is no data from Sodexo, like for example on weekends
            else {
                if(stopper === 0) {
                    let nullCase = new Map();
                    //set some data in the Map
                    nullCase.set(
                        1, [{restaurant: "Midpoint", queue: "1", queueTime: "1", ppl_counter: "0", timestamp: 0},
                            {title_fi: "No data for this date", properties: "", price: "", category: ""}]
                    );
                    //set the data in the state
                    setUsedLines(nullCase);
                    //stop this from running again
                    setStopper(2);
                }
            }
        }

        //render rest of the page and run the render for the menu with given data
        return (
            <Fragment>
                <Container className={classes.MenuContainer}>
                    <h3> Menu for the day</h3>
                    <Grid container direction="row">
                        <Grid item className={classes.leftInfo}>
                            <Typography>Line</Typography>
                        </Grid>
                        <Grid item className={classes.rightInfo}>
                            <Typography>Wait Time</Typography>
                        </Grid>
                    </Grid>
                    {renderLines(usedLines)}
                </Container>
            </Fragment>
        );
    };
    return {
        Menu,
    };
};

export default MenuFragment;
