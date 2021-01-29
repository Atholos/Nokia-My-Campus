/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/App.css';
import NaviBar from '../fragments/TopNavigationBarFragment';
import Authentication from '../hooks/Authentication';
import AuthLoading from './authLoading';
import strings from '../localization';
import InfoStyles from "../styles/infoStyles";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";

const Info = (props) => {
  const {TopNavigationBar} = NaviBar();
  const {isLoggedIn} = Authentication();
  const {infoStyle} = InfoStyles;

  const InfoPage = () => {
    return (
        <div className={infoStyle}>
          {TopNavigationBar()}
          <h2>MyCampus</h2>
          <p>{strings.infoPageHeading}</p>
          <p>{strings.infoPageP1}</p>
          <p>{strings.infoPageP2}</p>
        </div>
    );
  };

  const AuthInfo = () => {
    if (isLoggedIn()) {
      return <InfoPage/>;
    } else {
      return <AuthLoading/>;
    }
  };

  return (
      <AuthInfo/>
  )
};

export default Info;
