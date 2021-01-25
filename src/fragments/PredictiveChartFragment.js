/*
	Made by KiskoHorst
	Predictive chart, used by parking info and history but designed to be usable elsewhere too
*/

import React from 'react';
import {AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer} from 'recharts';


const PredictiveChartFragment = (data, expectedData, maximum) => {

    const dataToChart = (raw, maximum) => {
        if (raw !== undefined) {
            const out = [];
            for (let key in raw) {
				//Use percentage from API if maximum capacity is not known, otherwise calculate a more accurate value
				let d = new Date(raw[key].date);
                out.push({x: raw[key].date, timeString: d.getHours()+':'+('00'+d.getMinutes()).slice(-2), y: (maximum === null ? raw[key].percent : raw[key].count/maximum*100)});
            }
            return out;
        }
    };

	const formatData = (rawData) => {
		if (rawData == null) {
			return [];
		}
		return dataToChart(rawData.samples, maximum);
	};

	const createPrediction = (formattedData, formattedExpectedData) => {
		let newData = [];
		let maxLength = Math.max(formattedData.length, formattedExpectedData.length);
		let predictionScalePoint = formattedData.length-1;
		let predictionScaleFactor = 1;
		if (data != null && formattedData.length > 0) {
			//Calculate prediction scale factor and scale the prediction
			if (formattedData.length < formattedExpectedData.length
			&& formattedData[predictionScalePoint].y > 1
			&& formattedExpectedData[predictionScalePoint].y > 1) {
				predictionScaleFactor = formattedData[predictionScalePoint].y / formattedExpectedData[predictionScalePoint].y;
				formattedExpectedData.forEach((item, index, array) => {
					item.y = Math.min(100, item.y*predictionScaleFactor);
					array[index] = item;
				});
			}
		}

		for (let i = 0; i < maxLength; i++) {
			let point = {};
			if (i < formattedData.length) {
				point.x = formattedData[i].x;
				point.timeString = formattedData[i].timeString;
				point.y = formattedData[i].y;
				maxY = Math.max(formattedData[i].y, maxY);
				if (i === formattedData.length-1 && i < formattedExpectedData.length) {
					point.py = formattedData[i].y;
				}
			}
			else if (i < formattedExpectedData.length) {
				point.py = formattedExpectedData[i].y;
				point.x = formattedExpectedData[i].x;
				point.timeString = formattedExpectedData[i].timeString;
				maxY = Math.max(formattedExpectedData[i].y, maxY);
			}
			newData.push(point);
		}
		maxY = Math.floor(Math.min(maxY*1.25+3, 100));
		return newData;
	};

	const finalizeDataForRender = (data) => {
		let out = [];
		let nextHour = 6;
		data.forEach(point => {
			const timeString = ('0'+point.timeString).slice(-5);
			if (timeString < "05:00" || timeString > "19:00") {
				return;
			}
			if (timeString > ('0'+nextHour).slice(-2)) {
				point.timeString = ''+nextHour+':00';
				nextHour++;
			}
			out.push(point);
		});
		return out;
	};


	let maxY = 0;
	let formattedData = formatData(data);
	let formattedExpectedData = formatData(expectedData);

	let dataWithPrediction = finalizeDataForRender(createPrediction(formattedData, formattedExpectedData));
	let ticks = ["6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

	return (
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={dataWithPrediction} margin={{left: -20, top: 20}}>
				<CartesianGrid strokeDasharray="3 3" />
				<Area dataKey="py" stroke="#000" strokeOpacity={0.25} strokeWidth={2} fillOpacity={0}/>
				<Area dataKey="y" stroke="#124191" fill="#124191" strokeOpacity={1} strokeWidth={2} fillOpacity={0.5}/>
				<XAxis dataKey="timeString" ticks={ticks} interval={0} />
				<YAxis fill="#8884d8" type="number" domain={[0, maxY]} unit={"%"} allowDataOverflow={true}/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default PredictiveChartFragment;
