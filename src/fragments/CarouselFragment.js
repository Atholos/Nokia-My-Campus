import {makeStyles} from "@material-ui/core";
import TabFragments from "./TabFragments";
import React, {Fragment, useState} from "react";
import Carousel from "react-material-ui-carousel";
import RestaurantHeatMapView from "../views/restaurantHeatMap";


const useStyle = makeStyles(() => ({
    Carousel: {
        minHeight: "91vh",
    },
    Frag: {
        height:"100%", 

    },
}));

const CarouselFragment = (props) => {
    const classes = useStyle();
    const {TabRestaurantLines, TabRestaurantChart, TabRestaurantDonut, TabRestaurantMenu} = TabFragments();

    const Restaurant = () => {
        const [valueRestaurant] = useState(0);
        const [date, setDate] = useState(new Date());

        const handleDateChange = (data) => {
            setDate(data);
        };
//
        return (
                <Fragment className={classes.Frag}>
                        <Carousel autoPlay={false} navButtonsAlwaysVisible={true}
                                  animation="slide">
                            <TabRestaurantMenu value={valueRestaurant} index={0}/>
                            <TabRestaurantLines value={valueRestaurant} index={0}/>
                            <TabRestaurantChart value={valueRestaurant} index={0} onDateChange={handleDateChange} date={date}/>
                            <RestaurantHeatMapView value={valueRestaurant} index={0}/>
                            <TabRestaurantDonut value={valueRestaurant} index={0} onDateChange={handleDateChange} date={date}/>
                        </Carousel>
                </Fragment>
        );
    };

    return {
        Restaurant: Restaurant,
    };

};
export default CarouselFragment;