/*
	Made by KiskoHorst
	Parking widget for home screen
*/

import React, {useState, useEffect} from 'react';
import ParkingCardFragment from "../fragments/ParkingCardFragment";
import API from '../hooks/ApiHooks';
import Button from '@material-ui/core/Button';
import strings from '../localization';
import GlobalFunctions from '../hooks/GlobalFunctions';
import Grid from '@material-ui/core/Grid';

const ParkingWidget = (data) =>  {

	const {onItemClickNavigate} = GlobalFunctions();
	const {getParkingStatus} = API();
	const [parkingStatus, setParkingStatus] = useState({});
	const gridLayout = ("gridLayout" in data && data.gridLayout === true);
	let elements = [];

	//Load data for each zone given to the widget
	useEffect(() => {
		if ("zones" in data) {
			(data.zones).forEach((zone) => {
				getParkingStatus(zone).then( status => {
					parkingStatus[zone] = status;
					setParkingStatus({...parkingStatus});
				});
			});
		}
	}, []); //eslint-disable-line


	//Create a layout element for each zone id given to the widget
	(data.zones).forEach((zone) => {
		const estimated = zone === 'P10EV';
		const loading = parkingStatus[zone] !== undefined;
		elements.push(ParkingCardFragment().createZoneItem({id: zone, usageData: parkingStatus[zone], estimate: estimated, loading: loading}, gridLayout));
	});

	//Place the previously generated layouts in a grid if grid layout is enabled
	if (gridLayout) {
		elements.forEach((element, index, array) => {
			array[index] = (<Grid item xs={6}>{element}</Grid>);
		});
		elements = (<Grid container>{elements}</Grid>);
	}

	if ("showAllButton" in data && data.showAllButton === true) {
		elements.push(<Button onClick={()=>onItemClickNavigate('/parking')}>{strings.parkingViewAll}</Button>);
	}

	return elements;
};

export default ParkingWidget;
