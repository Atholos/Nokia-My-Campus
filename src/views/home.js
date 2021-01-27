/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/App.css';
import {
  Container, ThemeProvider, makeStyles
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Authentication from '../hooks/Authentication';
import NaviBar from '../fragments/TopNavigationBarFragment';
import AuthLoading from '../views/authLoading';
import MuiThemes from "../styles/muiThemes";
//import strings from "../localization";
import blue from '@material-ui/core/colors/blue';
import Widgets from '../fragments/WidgetFragment';
import EditButton from '../fragments/EditButton';


const Home = (props) => {
  const {HomepageWidget} = Widgets(props);
  const {isLoggedIn} = Authentication();
  const {TopNavigationBar} = NaviBar();
  const {PageTheme} = MuiThemes();
  const {EditIconButton} = EditButton();

  const HomePage = () => {

    const colorB = blue[500];

    const barTheme = makeStyles({
      headLine: {
        marginTop: '10px',
        marginBottom: '10px',
        color: colorB,
      },
    });

    return (
        <ThemeProvider theme={PageTheme}>
          {TopNavigationBar()}
          <Container>
            <Grid container spacing={1}
                  justify="space-between">
              <Grid item xs={10}>
              {EditIconButton()}
                <Grid item xs>
                </Grid>
              </Grid>
              {HomepageWidget()}
            </Grid>
          </Container>
        </ThemeProvider>
    );
  };

  const AuthHome = () => {
    if (isLoggedIn()) {
      return <HomePage/>;
    } else {
      return <AuthLoading/>;
    }
  };

  return (
      <AuthHome/>
  );
};

export default Home;
