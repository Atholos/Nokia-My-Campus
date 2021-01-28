/*
Made by Atholos
This file has only unit tests for Widget actions and reducers.
The point for unit tests are that you onlt test if a function works as intended,
NOT multiple functions working together.
*/
import * as actions from '../../actions/WidgetActions';
import reducer from '../../reducers/WidgetReducer';
import strings from '../../localization';


describe('Redux unit tests', () => {
    
    //When reducer gets some random value, it will return the default value which is []
    it('returns Widget reducers default state', () => {
        expect(reducer(undefined, '')).toEqual([]);
    });

    //Increment has only value set so it can be anything, an object, int, string etc.
    //this test will check if the incremement action will add a object
    it('runs increment action for widgets', () => {
        const value = { label: strings.newspage, dataType: 'news' }
        const expectedAction = {
            type: 'INCREMENT',
            value: { label: strings.newspage, dataType: 'news' }
        }
        expect(actions.increment(value)).toEqual(expectedAction);
    });

    //running Cleastate, the same idea applies to this one as the incremention test
    it('runs cleanstate action for widgets', () => {
        const expectedAction = {
            type: 'CLEANSTATE'
        }
        expect(actions.cleanState()).toEqual(expectedAction)
    });

    //CLEANSTATE is supposed to empty a list of objects
    //this test will have a fake object list that will be cleaned with CLEANSTATE reducer
    it('runs cleanstate reducer for widgets', () => {
        const fakeList = [
            { label: strings.newspage, dataType: 'news' },
            { label: strings.newspage, dataType: 'news' },
            { label: strings.newspage, dataType: 'news' }]

        expect(reducer(fakeList, {
            type: 'CLEANSTATE'
        })).toEqual([])
    });

    //INCREMENT is supposed to add a object to a list
    //this test will have a object that will be added to redux state
    it('runs increment reducer for widgets', () => {
        const expectedReducer = {
            label: strings.newspage, 
            dataType: 'news'
        }
        const fakeState = [];

        expect(reducer(fakeState,
            {
                type: 'INCREMENT',
                value: expectedReducer})).toEqual([expectedReducer])
    });

});