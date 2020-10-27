import React from 'react';
import * as ReactDOM from 'react-dom';
import Restaurant from '../views/restaurant';
import NaviBar from "../fragments/TopNavigationBarFragment";
import BottomBarTabFragment from "../fragments/BottomBarFragment";
import Home from '../views/home';
import Login from '../views/login';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import API from '../hooks/ApiHooks';


let container;
let userToken;
let login;
const {loginAsync} = API();

configure({ adapter: new Adapter() });


const email = 'team4.metropolia@nokia.com';
const pw = '!t4Mycampus2020';

//This test should ALWAYS go through, it's proof that testing works.
test('Test rendering a h1 to a empty div', () => {
  ReactDOM.render(<h1 />, container);
});

describe(('Login tests'), () => {
  beforeEach(() => {
    container = mount(<Login />);
    document.body.appendChild(container);
  });
  
  test('Login to myCampus', () => {
  
  });
  
  test('saving user token', () => {
  });

});



describe(('Restaurant Tests'), () => {

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  });

  test('Rendering restaurant top navigation bar', () => {
    ReactDOM.render(<Restaurant />, container);
    console.log("Checking if NaviBar Exists in restaurant");
    const nbtrue = expect.objectContaining(NaviBar);
    if(nbtrue){
      console.log("Navibar exists");
    } else {
      console.log("Navibar does not exist");
    };
  });
  
  test('Restaurant bottom navigation bar', () => {
    ReactDOM.render(<Restaurant />, container);
    console.log("Checking if bottombar Exists in restaurant");
    const bbtrue = expect.objectContaining(BottomBarTabFragment);
    if(bbtrue){
      console.log("bottombar exists");
    } else {
      console.log("bottombar does not exist");
    };
  });
});

describe(('Homepage tests'), () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  });

  test('Navigation from homepage to all different pages', () => {
    const wrapper = (<Home />);
    ReactDOM.render(wrapper, container);
    const nbtrue = expect.objectContaining(NaviBar);
    if(nbtrue){
      console.log('Navibar exists');
    } else {
      console.log('there is no navibar');
    };
  });
});
