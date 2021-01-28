/*
Made by Xyphnos
This widget creates a carousel of menu items from Sodexo with only the correct wait line and the menu item.
 */

import React, {Fragment, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import useStyle from "../styles/restaurantStyles";
import API from "../hooks/ApiHooks";
import strings from "../localization";
import Carousel from "react-material-ui-carousel";

//this function is used to create a menu widget
const RWidget = () =>{

    const classes = useStyle();
    const {menuByDate} = API();
    const date = new Date();

    //This state has dummy data so that the program has something to render while the fetch is still going
    const [menuData, setMenuData] = useState({
        courses: {
            1:{
                title_fi: "Ei dataa saatavilla",
                title_en: "No data available",
                category: "Restaurant",
                price: "",
                properties: "",
            },
        }
    });

    //this useEffect gets the menu data and replaces the dummy data with actual data

    /*eslint-enable */
    useEffect(()=> {
        menuByDate(date).then(result => {
            if(result.courses != null){
                setMenuData(result);
            }
        });
    },[]); //eslint-disable-line

    //this renders the widget by mapping the different menu items and lines into carousel items
    //I tried adding a donut chart here as an carousel item but that causes the map to create a scrollable list instead of carousel items
    const RestaurantFeed = (items) =>{

        const item = items.data.courses;

        return (
            <Fragment>
                <Box className={classes.Widget}>

                    <Carousel autoPlay={false} navButtonsAlwaysVisible={false}
                              animation="slide" noWrap={true}>

                        {(Object.keys(item) || []).map(mapKey => (
                            <div key={mapKey} className={classes.wFrag}>

                                <Grid item container direction="column" className={classes.wMenuStyle}>

                                    <Grid item className={classes.Card}>
                                        <Grid container direction="row">
                                            <Grid item className={classes.TopC}>
                                                <p>
                                                    {item[mapKey].category}
                                                </p>
                                            </Grid>
                                            <Grid item className={classes.wItem}>
                                                <p>
                                                    {item[mapKey].title_fi}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </Carousel>
                </Box>
            </Fragment>
        );
    };

    return RestaurantFeed(
        {label: strings.topBarMenuItemRestaurant, data: menuData})

};

export default RWidget
