/*
    This file contains everything related to fetching data from the API
    and handling those fetch results in an async manor.
    Also contains the functions of handling the historical data and their charting.
*/

import LocalStorageOperations from './LocalStorageOperations';
import ApiUrls from './ApiUrls'
import GlobalFunctions from './GlobalFunctions';
import strings from '../localization';

const { loginUrl,regUrl,forgotPassUrl,resetPassUrl,confirmUrl,resendVerificationUrl, sodexoDailyUrl, sodexoWeeklyUrl, dailyParkingUrl, parkingStatusUrl } = ApiUrls();
const {convertTime, formattedDate, sodexoDate } = GlobalFunctions();
// Basic Fetch template for post messages
const fetchPostUrl = async (url,data) => {
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json()
};
// Used if the server doesn't return a json response
const fetchPostUrlNoJson = async (url,data) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};
// Basic Fetch template for get requests
const fetchGetUrl = async (url, userKey) => {
    const {read} = LocalStorageOperations();
    const userToken = read(userKey);
    if (userToken) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                authorization: userToken.token,
            },
        });
        if (response) {
            return await response.json()
        } else {
            throw Error("No token, fetchGetUrl")
        }
    } else {
        throw Error("No user, No usertoken. fetchGetUrl")
    }
};

const API = () => {

    // Handles Login.
    const loginAsync = async (loginData,props) =>{
        return fetchPostUrl(loginUrl, loginData)
    };
    // Handles Password reset
    const resetPasswordAsync = async (data)=>{
        return fetchPostUrlNoJson(resetPassUrl,data)
    };
    // Handles account confirmation
    const confirmAccountAsync = async (data)=>{
        return fetchPostUrlNoJson(confirmUrl,data)
    };
    // Handles email resending
    const resendEmailAsync = async (data)=>{
        return fetchPostUrlNoJson(resendVerificationUrl,data)
    };
    // Handles Forgot pass
    const forgotPassAsync = async (data)=>{
        return fetchPostUrlNoJson(forgotPassUrl,data)
    };
    // Handles registering
    const registerAsync = async (registerData)=>{
        return fetchPostUrlNoJson(regUrl,registerData)
    };
    // Handles fetching of usage data from the API
    const getUsageData = (url, props) => {
        return fetchGetUrl(url ,'user').then((json)=>{
            if (json) {
                return json
            } else {
                throw Error("No Token, getUsageData")
            }
        })
    };

    const getUsageDataNoProps = (url) => {
        return fetchGetUrl(url, 'user').then((json) => {
            if (json) {
                return json
            } else {
                throw Error("No Token, getUsageDataNoProps")
            }
        })
    };

    const getChartData = (url, location, date) => {
        return getUsageData(url + location + date).then((json) => {
            if (json) {
                return json
            } else {
                throw Error("No Token, getUsageData")
            }
        })
    };

	const getParkingStatus = (location) => {
		//P10EV has no API endpoint, create data manually based on P10TOP
		if (location === 'P10EV') {
			const url = parkingStatusUrl + 'P10TOP';
			return fetchGetUrl(url, 'user').then((json) => {
				if (json) {
					return {count: Math.min(98, Math.floor(json.count * 2.1)), capacity: 98};
				} else {
					throw Error("No Token, getParkingStatus")
				}
			})
		} else {
			const url = parkingStatusUrl + location;
			return fetchGetUrl(url, 'user').then((json) => {
				if (json) {
					return json
				} else {
					throw Error("No Token, getParkingStatus")
				}
			})
		}
	};

	const getParkingData = (location, date) => {
		const url = dailyParkingUrl;
		//P10EV has no API endpoint, create data manually based on P10TOP
		if (location === 'P10EV') {
			return getUsageData(url + 'P10TOP/' + date).then((json) => {
				if (json) {
					const convertToP10EV = (json) => {
						let p10ev = [];
						json.samples.forEach(sample => {
							const newcount = Math.min(98, Math.floor(sample["count"] * 2.1));
							p10ev.push({count: newcount, date: sample["date"], percent: Math.floor(newcount/98)});
						});
						json["samples"] = p10ev;
						return json;
					};
					return convertToP10EV(json);
				} else {
					throw Error("No Token, getParkingData")
				}
			});
		} else {
			return getUsageData(url + location + '/' + date).then((json) => {
				if (json) {
					return json
				} else {
					throw Error("No Token, getParkingData")
				}
			});
		}
	};

	const getParkingAreaName = (id) => {
		switch(id) {
			case "P5":
				return "P5, "+strings.parkingCategoryParking+' '+strings.inside;
			case "P10":
				return "P10, "+strings.parkingCategoryParking+' '+strings.inside;
			case "P10TOP":
				return "P10, "+strings.parkingCategoryParking+' '+strings.rooftop;
			case "P10EV":
				return "P10, "+strings.parkingCategoryEV+' '+strings.rooftop;
			default:
				return strings.unknownParkingArea;
		}
	}

    const dataToChart = (json) => {
        if (json !== undefined) {
            const chart = [];
            for (let key in json) {
                const timeStamp = convertTime(json[key].date);
                const fromUnixTime = formattedDate(timeStamp);
                let yc = json[key].percent;
                let tempJson = {x: fromUnixTime, y: yc, pv: 100};
                chart.push(tempJson);
                // Set the data to a chart json and return it
            }
            return chart;
        }
    };

    const dataToChartRawCount = (json, maximum) => {
        if (json !== undefined) {
            const chart = [];
            for (let key in json) {
                const timeStamp = convertTime(json[key].date);
                const fromUnixTime = formattedDate(timeStamp);
                let yc = (json[key].count)/maximum*100;
                let tempJson = {x: fromUnixTime, y: yc, pv: 100};
                chart.push(tempJson);
                // Set the data to a chart json and return it
            }
            return chart;
        }
    };

    const dataToChartRestaurant = (json) => {
        if (json !== undefined) {
            const chart = [];
            for (let key in json) {
                const timeStamp = convertTime(json[key].timestamp);
                const fromUnixTime = formattedDate(timeStamp);
                let yc = json[key].fill_percent;
                let tempJson = {x: fromUnixTime, y: yc, pv: 100};
                chart.push(tempJson);
                // Set the data to a chart json and return it
            }
            return chart;
        }
    };

    const dataForDonutChart = (json) => {
        if(json !== undefined){
            const last = json.length -1;
            return json[last].fill_percent
        }
    };

    // If Selected is Electric Places charts the data with the given multiplier to calculate the estimated utilization
    const chartEstData = (json) =>{
        const multiplier = 2.1;
        if (json !== undefined) {
            const chart = [];
            for (let key in json) {
                const timeStamp = convertTime(json[key].date);
                const fromUnixTime = formattedDate(timeStamp);
                let yc = json[key].percent;
                let tempJson = {x: fromUnixTime, y: (yc*multiplier), pv: 100};
                chart.push(tempJson);
                // Set the data to a chart json and return it
            }
            return chart;
        }
    };

    const menuByDate = (date) =>{
         const menu = fetch(sodexoDailyUrl(sodexoDate(date)))
             .then(res => res.json());
         return menu;
    };

    const menuByWeek = () =>{
        const menu = fetch(sodexoWeeklyUrl())
            .then(res => res.json());
        return menu;
    };

    return {
        loginAsync,
        registerAsync,
        getUsageData,
        getUsageDataNoProps,
        getChartData,
		getParkingStatus,
		getParkingData,
		getParkingAreaName,
        dataToChart,
        dataToChartRawCount,
        forgotPassAsync,
        resetPasswordAsync,
        chartEstData,
        dataToChartRestaurant,
        confirmAccountAsync,
        resendEmailAsync,
        menuByDate,
        menuByWeek,
        dataForDonutChart,
    }

};

export default API;
