import React from 'react';
import { shallow } from 'enzyme';
import OrderBook from './orderBook';

describe('<OrderBook />', () => {
  test('renders', () => {
    const wrapper = shallow(<OrderBook />);
    expect(wrapper).toMatchSnapshot();
  });
});
