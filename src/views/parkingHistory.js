/*
	Made by KiskoHorst
	Parking history view
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
import PredictiveChartFragment from "../fragments/PredictiveChartFragment";
import API from '../hooks/ApiHooks';
import GlobalFunctions from '../hooks/GlobalFunctions';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useQueryParams} from "hookrouter";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import strings from '../localization';

/*eslint-enable */

const ParkingHistory = () => {
	const { isLoggedIn } = Authentication();
	const {getParkingStatus, getParkingData, getParkingAreaName} = API();
	const {formattedFullDate} = GlobalFunctions();

	const [data, setData] = useState(null);
	const [capacity, setCapacity] = useState(null);
	const [selectedDate, setSelectedDate] = useState(() => {
		let d = new Date();
		d.setDate(d.getDate()-1);
		return d;
	});

	const params = useQueryParams();

	const zone = params[0].zone;

	useEffect(() => {
		getParkingData(zone, formattedFullDate(selectedDate)).then(json => {
			setData(json);
		});
		getParkingStatus(zone).then(json => {
			setCapacity(json.capacity);
		});
	// eslint-disable-next-line	react-hooks/exhaustive-deps
	}, [selectedDate]);


    const ParkingHistoryPage = () => {
		const {TopNavigationBar} = NaviBar();
		//const {onItemClickNavigate} = GlobalFunctions();
		return (
			<div>
				{TopNavigationBar()}
				<Box p={16} display="flex" alignItems="center" padding="16px">
					<Typography variant="subtitle2" component="h1" align="left">{strings.history + ": " + getParkingAreaName(zone)}</Typography>
				</Box>
				<Box px={2}>
					{PredictiveChartFragment(data, null, capacity)}
				</Box>
				<Divider/>
				<Box px={2}>
					<Grid container align="center" justify="space-between">
						<IconButton my={4} align="left" onClick={()=>{
									selectedDate.setDate(selectedDate.getDate()-1);
									setData(null);
									setSelectedDate(new Date(selectedDate));
								}}>
							<NavigateBeforeIcon/>
						</IconButton>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								style={{color: "black"}}
								margin="normal"
								id="dialog date picker"
								format="dd/MM/yyyy"
								value={selectedDate}
								disableFuture={true}
								onChange={setSelectedDate}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
						<IconButton align="right" onClick={()=>{
									selectedDate.setDate(selectedDate.getDate()+1);
									setData(null);
									setSelectedDate(new Date(selectedDate));
								}}>
							<NavigateNextIcon/>
						</IconButton>
					</Grid>
				</Box>
			</div>
		);
    };
	if (isLoggedIn()) {
		return ParkingHistoryPage();
	} else {
		return <AuthLoading/>;
	}

};

export default ParkingHistory;
