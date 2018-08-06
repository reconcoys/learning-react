import React from 'react';
import { shallow } from 'enzyme';
import Square from './Square';

describe('Square', () => {
  let props;

  beforeEach(() => {
    const mockOnClick = jest.fn();
    props = { onClick: mockOnClick, value: 'X' };
  });

  describe('when button is clicked', () => {
    it('calls props.onClick', () => {
      const { onClick } = props;
      const wrapper = shallow(<Square {...props} />);

      wrapper.find('.square').simulate('click');

      expect(onClick).toBeCalled();
    });
  });

  it('shows value on button', () => {
    const wrapper = shallow(<Square {...props} />);

    expect(wrapper.find('.square').text()).toBe('X');
  });
});
