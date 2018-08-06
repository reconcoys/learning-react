import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square';

describe('Square', () => {
  describe('when button is clicked', () => {
    it('sets the text value to X', () => {
      const wrapper = shallow(<Square />);

      wrapper.find('.square').simulate('click');

      expect(wrapper.find('.square').text()).toBe('X');
    });
  });
});
