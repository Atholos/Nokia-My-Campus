import React from 'react';
import * as actions from '../actions/WidgetActions';
import reducer from '../reducers/WidgetReducer';
import { createMount,createShallow } from '@material-ui/core/test-utils';
import Home from '../views/home';

//Needed imports for react redux testing
import { Provider } from 'react-redux'
import UpdateReducer from '../reducers/UpdateReducer'
import WidgetReducer from '../reducers/WidgetReducer';
import WMenuReducer from "../reducers/WMenuReducer";
import MenuReducer from "../reducers/MenuReducer";
import EditModeRecuder from "../reducers/EditModeReducer";
import NewsReducer from "../reducers/NewsReducer";
import { createStore, combineReducers } from 'redux';

describe('action tests', () => {
    let mount;
    let shallow;

    //!!!!!!!!!!! TEST STORE FOR NEWS WITH REDUX !!!!!!!!!!!!!!
  const store = createStore(
    combineReducers({
        UpdateReducer,
        WidgetReducer,
        WMenuReducer,
        MenuReducer,
        EditModeRecuder,
        NewsReducer,
    })
  );

     beforeAll(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterAll(() => {
        mount.cleanUp();
        shallow.cleanUp();
    });

    //Increment has only value set so it can be anything, an object, int, string etc.
    //this test will check if the incremement action will add the value and create a object, same kind as expectedActions
    it('runs increment action from widgets', () => {
        const value = 1
        const expectedAction = {
            type: 'INCREMENT',
            value
        }
        expect(actions.increment(value)).toEqual(expectedAction);
    });

    //When reducer gets some random value, it will return the default value which is []
    it('returns reducers default state', () => {
        expect(reducer(undefined, '')).toEqual([]);
    });

    //reducer needs a (state, value) in this case we give it an empty state (default value) and a object that is a value
    //redux is supposed to get a list of objects with the value which is why we have brackets [] around value
    it('Integration test for widget action and reducer', () => {
        const value = {
            element: 'widget'
        }
        const expectedAction = {
            type: 'INCREMENT',
            value
        }
        expect(reducer([], expectedAction)).toEqual([value]);
    });

    it('End-to-End (E2E) action test', () => {
        const wrapper = mount(<Provider store={store}><Home/></Provider>)
        expect(wrapper).toMatchSnapshot();
    });

    it('Mounting widget', () => {
        
      });
});