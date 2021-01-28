/*
	Made by KiskoHorst
	Parking card, used by parking widgets and the parking page
*/

import React from 'react';
import GlobalFunctions from "../hooks/GlobalFunctions";
import API from '../hooks/ApiHooks';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import strings from '../localization';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {PieChart, Pie} from 'recharts';

const ParkingCardFragment = () => {
    const {onItemClickNavigate} = GlobalFunctions();
	const {getParkingAreaName} = API();

	const idToLocalizedString = (id, shortName) => {
		if (shortName) {
			return strings[id + "Short"];
		}
		return getParkingAreaName(id);
	};

	const nameToLocalizedString = (name) => {
		switch (name) {
			case "inside":
				return strings.inside;
			case "roof":
				return strings.rooftop;

			default:
				return name;
		}

	};

	const categoryToLocalizedString = (name) => {
		switch (name) {
			case "parking":
				return strings.parkingCategoryParking;
			case "ev_charging":
				return strings.parkingCategoryEV;

			default:
				return name;
		}
	};

	const areaPie = (count, capacity) => {
		const colors = ["#4caf50", "#ffde18", "#df2929"];
		let color;
		const usage = count/capacity;
		const remaining = 1 - usage;

		if (usage > 0.95) {
			color = colors[2];
		}
		else if (usage > 0.75) {
			color = colors[1];
		}
		else {
			color = colors[0];
		}

		return (
			<Pie dataKey="value" data={[{fill: color, value: usage}, {fill: "#eeeeee", value: remaining}]} startAngle={90} endAngle={-270} innerRadius={10} outerRadius={20} fill="#8884d8"  isAnimationActive={false}/>
		);
	};


	const createZoneItem = (zone, small) => {
		let count;
		let capacity;
		let utilizationString;
		let link;
		let title;

		if (zone.usageData == null) {
			zone.loading = true;
		}
		else {
			zone.loading = false;
			count = zone.usageData.count;
			capacity = zone.usageData.capacity;

			if(count < 0){
				count = count * -1
			}
			if(capacity < 0){
				capacity = capacity * -1
			}
		}

		if (zone.loading) {
			utilizationString = strings.loading;
		}
		else {
			if (small) {
				utilizationString = "" + Math.round(count/capacity * 100) + "%";
			}
			else {

				if (zone.estimate) {
					utilizationString = strings.parkingUtilizationEstimate
				}
				else {
					utilizationString = strings.parkingUtilization
				}
				utilizationString = utilizationString.replace("{0}", (zone.usageData.capacity - zone.usageData.count)).replace("{1}", zone.usageData.capacity);
			}
		}

		if (zone["linkId"] !== undefined) {
			link = zone["linkId"];
		}
		else {
			link = zone["id"];
		}

		//Name is a short description of a zone, like "roof", intended to be seen with other zones from the same area
		//ID based titles can be shown with no context, like "P10 Rooftop Parking"

		if ("name" in zone) {
			title = nameToLocalizedString(zone["name"]);
		}
		else {
			title = idToLocalizedString(zone["id"], small);
		}

		return (
			<ListItem button onClick={() => onItemClickNavigate(link)}>
				<ListItemAvatar>
					<PieChart width={40} height={40}>
						{(zone.loading ? areaPie(0, 1) : areaPie(count, capacity))}
					</PieChart>
				</ListItemAvatar>
				<ListItemText primary={title} secondary={utilizationString} />
			</ListItem>
		);
	};

	const zones = (zoneData, category) => {

		if (category in zoneData) {

			let outPut = (
				<Box height="48px" display="flex" alignItems="center" padding="16px">
					<Typography variant="subtitle2" component="h2" align="left">{categoryToLocalizedString(category)}</Typography>
				</Box>);
			zoneData[category].forEach(area => {
				outPut = [outPut, createZoneItem(area, false)];
			});
			return outPut;
		}
	};

	const zoneList = (zoneData) => {
		let i = 0;
		let outPut;
		const keys = Object.keys(zoneData);

		keys.forEach(key => {
			i++;
			outPut = [outPut, zones(zoneData, key)];
			if (i < keys.length) {
				outPut = [outPut, <Divider/>];
			}
		});
		return outPut;
	};

	const fullCard = (data) => {
		return (
			<Box m={2} mb={0}>
				<Card>
					<Box height="56px" display="flex" alignItems="center" padding="16px">
						<Typography variant="h6" component="h1" align="left">
							{data["name"]}
						</Typography>
					</Box>
					<Divider/>
					{zoneList(data["zones"])}
				</Card>
			</Box>
		);
	};

	return {
		fullCard,
		createZoneItem,
	}
};

export default ParkingCardFragment;
