import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  title: '.title',
};

describe('Component DaysToSummer', () => {
  it('sholud render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });
  it('should render heading', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.title)).toEqual(true);
  });
});
const trueDate = Date;
const mockDate = (customDate) =>
  class extends Date {
    constructor(...args) {
      if (args.length) {
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now() {
      return new Date(customDate).getTime();
    }
  };
const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}.T00:00:00.135Z`);

    const component = shallow(<DaysToSummer />);
    const renderedDays = component.find(select.title).text();
    expect(renderedDays).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};
describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDate('2021-06-20', '1 day to summer!');
  checkDescriptionAtDate('2021-06-07', '14 days to summer!');
  checkDescriptionAtDate('2021-04-01', '81 days to summer!');
});
