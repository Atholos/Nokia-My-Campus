/*
  This file contains the routes of the app. If the app needs more navigation
  the routes would be added here so that hookrouter can take advantage of them.
  This export is used in App.js
*/

import React from 'react';
import Home from '../views/home';
import Login from '../views/login';
import Info from '../views/info';
import News from '../views/news';
import P5 from '../views/p5';
import P10 from '../views/p10';
import Parking from '../views/parking';
import ParkingInfo from '../views/parkingInfo';
import ParkingHistory from '../views/parkingHistory';
import Restaurant from '../views/restaurant';
import ForgotPassword from '../views/forgotPass'
import Register from "../views/register";
import AuthLoading from "../views/authLoading";
import P5MapView from "../views/p5MapView";
import P10MapView from "../views/p10MapView";
import ResetPassword from "../views/resetPassword";
import AccountVerification from "../views/accountVerification";
import ArticlePage from "../views/newsarticle";

// Navigation hookrouter, navigation url and the corresponding component
// Used in App.js, routeResult
const routes = {
  '/': ()=> <Home/>,
  '/info': ()=> <Info/>,
  '/home': () => <Home/>,
  '/login': () => <Login/>,
  '/p5': () => <P5/>,
  '/p10': () => <P10/>,
  '/parking': () => <Parking/>,
  '/P5': () => <ParkingInfo/>,
  '/P10': () => <ParkingInfo/>,
  '/P10TOP': () => <ParkingInfo/>,
  '/P10EV': () => <ParkingInfo/>,
  '/parkinghistory': (zone) => <ParkingHistory zone={zone}/>,
  '/restaurant': () => <Restaurant/>,
  '/register': () => <Register/>,
  '/forgot_password': () => <ForgotPassword/>,
  '/auth':()=> <AuthLoading/>,
  '/p5map': ()=> <P5MapView/>,
  '/p10map': () => <P10MapView/>,
  '/news': () => <News/>,
  '/news_article': (article) => <ArticlePage/>,
  '/reset_password': (email) => <ResetPassword email={email}/>,
  '/verify_account': (email)=> <AccountVerification email={email}/>
};


export default routes;
