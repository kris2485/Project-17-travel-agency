import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};
const mockProps = {
  title: 'Lorem Ipsum',
  promoDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};

describe('Component HappyHourAd', () => {
  it('sholud render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  it('sholud render corect title and promoDescription', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find('.title').text()).toEqual(mockProps.title);
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

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};
const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});
describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});
describe('Component HappyHourAd with mocked Date and description', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:30:59', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});
describe('Component HappyHourAd with mocked Date and delay and description', () => {
  checkDescriptionAfterTime('11:59:58', 4, mockProps.promoDescription);
  checkDescriptionAfterTime('11:59:58', 15, mockProps.promoDescription);
  checkDescriptionAfterTime('11:59:00', 120, mockProps.promoDescription);
});
