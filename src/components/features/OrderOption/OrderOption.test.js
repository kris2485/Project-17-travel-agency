import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='Lorem ipsum' name='Lorem lorem' />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('sholud render correct title', () => {
    const expectedTitle = 'Car Rental';

    const component = shallow(<OrderOption name={expectedTitle} type={'text'} />);
    expect(component.find('.title').text()).toEqual(expectedTitle);
  });
});
