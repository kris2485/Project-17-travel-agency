import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct link address', () => {
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id='abc' />);

    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(expectedLink);
  });
  it('should render correct src and alt', () => {
    const expectedImage = 'image.jpg';
    const expectedAlt = 'alt';
    const component = shallow(<TripSummary image={expectedImage} name={expectedAlt} />);

    const renderedImage = component.find('img').prop('src');
    const renderedAlt = component.find('img').prop('alt');
    expect(renderedImage).toEqual(expectedImage);
    expect(renderedAlt).toEqual(expectedAlt);
  });
  it('should render correct name, cost and days', () => {
    const expectedName = 'travel';
    const expectedCost = '$500';
    const expectedDays = 14;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} />);

    const renderedName = component.find('.title').text();
    const renderedCost = component.find('.cost').text();
    const renderedDays = component.find('.days').text();
    expect(renderedName).toEqual(expectedName);
    expect(renderedDays).toEqual(`${expectedDays} days`);
    expect(renderedCost).toEqual(`from ${expectedCost}`);
  });

  it('should render tags', () => {
    let expectedTags = ['tag-1', 'tag-2', 'tag-3'];
    const component = shallow(<TripSummary tags={expectedTags} />);

    const renderedFirstTag = component.find('.tag').at(0).text();
    const renderedSecondTag = component.find('.tag').at(1).text();
    const renderedThirdTag = component.find('.tag').at(2).text();

    expect(renderedFirstTag).toEqual(expectedTags[0]);
    expect(renderedSecondTag).toEqual(expectedTags[1]);
    expect(renderedThirdTag).toEqual(expectedTags[2]);
  });
  it('should not render div with class tags if tags is undefined', () => {
    const component = shallow(<TripSummary />);
    expect(component.find('.tags').exists()).toBe(false);
  });
});
