
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
    it('runs increment action from widgets', () => {
        const value = { label: strings.newspage, dataType: 'news' }
        const expectedAction = {
            type: 'INCREMENT',
            value
        }
        expect(actions.increment(value)).toEqual(expectedAction);
    });

    //CLEANSTATE is supposed to empty a list of objects
    //this test will have a fake object list that will be cleaned with CLEANSTATE reducer
    it('runs clean action from widgets', () => {
        const fakeList = [
            { label: strings.newspage, dataType: 'news' },
            { label: strings.newspage, dataType: 'news' },
            { label: strings.newspage, dataType: 'news' }]

        expect(reducer(fakeList, {
            type: 'CLEANSTATE'
        })).toEqual([])
    });


});