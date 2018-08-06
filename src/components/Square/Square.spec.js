import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square';

describe('Square', () => {
  it('shows value on button', () => {
    const wrapper = shallow(<Square value={1} />);

    expect(wrapper.find('.square').text()).toBe('1');
  });
});
