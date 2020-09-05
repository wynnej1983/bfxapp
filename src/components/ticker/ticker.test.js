import React from 'react';
import { shallow } from 'enzyme';
import Ticker from './ticker';

describe('<Ticker />', () => {
  test('renders', () => {
    const wrapper = shallow(<Ticker />);
    expect(wrapper).toMatchSnapshot();
  });
});
