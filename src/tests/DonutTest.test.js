import React from 'react';
import {createMount, createShallow} from '@material-ui/core/test-utils'
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from "enzyme-to-json";
import Restaurant from "../views/restaurant";
import CarouselFragment from "../fragments/CarouselFragment";

Enzyme.configure({ adapter: new Adapter() });

describe('Restaurant', () =>{
    let mount;
    let shallow;

    beforeAll( () =>{
        mount = createMount();
        shallow = createShallow();
    });

    afterAll( () =>{
       mount.cleanUp();
       shallow.cleanUp();
    });

    it('renders', () =>{
        const wrapper = mount(<Restaurant/>);
        expect(wrapper).toMatchSnapshot();
    });
/*
    it('Finds a specific div', () =>{
        const wrapper = shallow(<Restaurant><CarouselFragment/></Restaurant>);
        const fragment = wrapper.instance().render();
        console.log(wrapper.debug());
        expect(shallowToJson(fragment).getElement()).toMatchSnapshot();
    });
    */
});