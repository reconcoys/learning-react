import React from 'react';
import { shallow } from 'enzyme';
import Square, { SquareButton } from './Square';

describe('Square', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const mockOnClick = jest.fn();
    props = { onClick: mockOnClick, value: 'X' };
    wrapper = shallow(<Square {...props} />);
  });

  describe('when button is clicked', () => {
    it('calls props.onClick', () => {
      const { onClick } = props;

      wrapper.find(SquareButton).simulate('click');

      expect(onClick).toBeCalled();
    });
  });

  it('shows value on button', () => {
    expect(wrapper.find(SquareButton).children().text()).toBe('X');
  });

  it('sets background color to color prop', () => {
    expect(wrapper.find(SquareButton).props().style).toEqual({ background: 'white' });
  });
});
