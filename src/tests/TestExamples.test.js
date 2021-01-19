import * as actions from '../actions/EditModeActions';

describe('basic action test', () => {
    it('sould run an action', () => {
        const value = true
        const expectedAction = {
            type: 'EDITMODE',
            value
        }
        expect(actions.editmode(value)).toEqual(expectedAction);
    });
});

