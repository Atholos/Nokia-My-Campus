//import Authentication from '../../hooks/Authentication';
import LocalStorageOperations from '../../hooks/LocalStorageOperations';

describe('authentication unit tests', () => {
    const { read, create } = LocalStorageOperations()
    let json = {username: 'username', token: 'token'};
    create(JSON.stringify(json), 'user')

    it('read the stored username', () => {
        const expectedResult = {
            username: 'username',
            token: 'token'
        };
        expect(read('user')).toEqual(expectedResult);
    });

    
});  