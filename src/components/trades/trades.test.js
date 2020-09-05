import React from 'react';
import { shallow } from 'enzyme';
import Trades from './trades';

describe('<Trades />', () => {
  test('renders', () => {
    const wrapper = shallow(<Trades />);
    expect(wrapper).toMatchSnapshot();
  });
});
