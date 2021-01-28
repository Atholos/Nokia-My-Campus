import React from 'react';
import reducer from '../reducers/WidgetReducer';
import { createMount,createShallow } from '@material-ui/core/test-utils';
import Home from '../views/home';

//Needed imports for react redux testing
import { Provider } from 'react-redux'
import WidgetReducer from '../reducers/WidgetReducer';
import { createStore, combineReducers } from 'redux';

describe('action tests', () => {
    let mount;
    let shallow;

    //!!!!!!!!!!! TEST STORE FOR NEWS WITH REDUX !!!!!!!!!!!!!!
  const store = createStore(
    combineReducers({
        WidgetReducer,
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