/*
	Made by KiskoHorst
	Parking info page
*/

import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import '../styles/p10Style.css';
import 'date-fns';
import NaviBar from '../fragments/TopNavigationBarFragment';
import Authentication from '../hooks/Authentication';
import AuthLoading from './authLoading';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextDataTable from "../fragments/TextDataTableFragment";
import PredictiveChartFragment from "../fragments/PredictiveChartFragment";
import API from '../hooks/ApiHooks';
import strings from '../localization';
import GlobalFunctions from '../hooks/GlobalFunctions';
import { navigate } from "hookrouter";

/*eslint-enable */

const ParkingInfo = () => {
	const {getParkingStatus, getParkingData, getParkingAreaName} = API();
	const {formattedFullDate} = GlobalFunctions();
    const {isLoggedIn} = Authentication();

	const [tableData, setTableData] = useState([[strings.parkingTotalSpaces, ""], [strings.parkingUsedSpaces, ""], [strings.parkingAvailableSpaces, ""]]);
	const [dataToday, setDataToday] = useState(null);
	const [dataWeekAgo, setDataWeekAgo] = useState(null);
	const [capacity, setCapacity] = useState(null);

	const zone = window.location.pathname.split('/').pop();
	const name = getParkingAreaName(zone);

	//Data from one week ago will be used to predict usage for today
	const expectedDataDate = new Date();
	expectedDataDate.setDate(expectedDataDate.getDate() - 7);



	useEffect(()=>{

		getParkingStatus(zone).then( usageData => {
			let count = usageData["count"];
			let capacity = usageData["capacity"];
			if(usageData["count"] < 0){
				count = usageData["count"]*-1
			}
			else if(usageData["capacity"] < 0){
				capacity = usageData["capacity"]*-1
			}
			setTableData([[strings.parkingTotalSpaces, ""+capacity], [strings.parkingUsedSpaces, ""+count], [strings.parkingAvailableSpaces, ""+(capacity-count)]]);
			setCapacity(usageData["capacity"]);
		});

		getParkingData(zone, formattedFullDate(new Date())).then(json => {
			setDataToday(json);
		});

		getParkingData(zone, formattedFullDate(expectedDataDate)).then(json => {
			setDataWeekAgo(json);
		});
	// eslint-disable-next-line	react-hooks/exhaustive-deps
	}, []);

    const ParkingInfoPage = () => {
		const {TopNavigationBar} = NaviBar();
		return (
			<div>
				{TopNavigationBar()}
				<Box p={16} display="flex" alignItems="center" padding="16px">
					<Typography variant="subtitle2" component="h1" align="left">{name}</Typography>
				</Box>
				<Box px={2}>
					<TextDataTable data={tableData}/>
					{PredictiveChartFragment(dataToday, dataWeekAgo, capacity)}
					<Grid container>
						<Button variant="outlined" align="left" onClick={()=>{
									const yesterday = new Date();
									yesterday.setDate((yesterday.getDate() - 1));
									navigate('/parkinghistory', false, {zone: zone});
								}}>
							{strings.history}
						</Button>
					</Grid>
				</Box>
			</div>
		);
    }
	if (isLoggedIn()) {
		return ParkingInfoPage();
	} else {
		return <AuthLoading/>;
	}

};

export default ParkingInfo;
