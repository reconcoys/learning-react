import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import Square from '../Square/Square';

describe('Board', () => {
  it('renders Squares', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Square)).toHaveLength(9);
  });

  it('passes value to Squares', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Square).first().prop('value')).toBe(null);
  });

  it('starts with an X move', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.state('xIsNext')).toBe(true);
  });

  it('passes onClick to Squares', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Square).first().prop('onClick')).not.toBeUndefined();
  });

  describe('handleClick', () => {
    it('sets the given index in state.squares to X if next player is X', () => {
      const wrapper = shallow(<Board />);

      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe('X');
    });

    it('sets the given index in state.squares to O if next player is O', () => {
      const wrapper = shallow(<Board />);
      wrapper.setState({ xIsNext: false });

      expect(wrapper.state('xIsNext')).toBe(false);
      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe('O');
    });

    it('toggles which player moves next', () => {
      const wrapper = shallow(<Board />);

      wrapper.instance().handleClick(8);

      expect(wrapper.state('xIsNext')).toBe(false);
    });
  });
});
