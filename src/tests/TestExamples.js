import React from 'react';
import renderer from 'react-test-renderer';

import TopNavigationBar from '../fragments/TopNavigationBarFragment'

test('Does something', () => {
    const navibar = renderer.create(<TopNavigationBar />).toJSON();
    navibbar.toMatchSnapshot()
});