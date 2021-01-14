/*
Made by Xyphnos
This fragment creates a carousel view for the restaurant from the other fragments that are imported from tabfragments
 */

import TabFragments from "./TabFragments";
import React, {Fragment, useState} from "react";
import Carousel from "react-material-ui-carousel";
import RestaurantHeatMapView from "../views/restaurantHeatMap";
import useStyle from "../styles/restaurantStyles";

const CarouselFragment = (props) => {
    const classes = useStyle();
    const {TabRestaurantChart, TabRestaurantDonut, TabRestaurantMenu, TabRestaurantWeek} = TabFragments();

    const Restaurant = () => {
        const [date, setDate] = useState(new Date());

        const handleDateChange = (data) => {
            setDate(data);
        };
//
        return (
                <Fragment>
                        <Carousel autoPlay={false} navButtonsAlwaysVisible={false}
                                  animation="slide" noWrap={true}>
                            <TabRestaurantMenu value={0} className={classes.Frag} index={0}/>
                            <TabRestaurantWeek value={0} className={classes.Frag} index={0}/>
                            <TabRestaurantChart value={0} className={classes.Frag} index={0} onDateChange={handleDateChange} date={date}/>
                            <div className={classes.Frag}>
                            <RestaurantHeatMapView/>
                            <TabRestaurantDonut onDateChange={handleDateChange} date={date}/>
                            </div>
                        </Carousel>
                </Fragment>
        );
    };

    return {
        Restaurant
    };

};
export default CarouselFragment;