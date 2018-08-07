import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import calculateWinner from './BoardHelper';
import Square from '../Square/Square';

jest.mock('./BoardHelper');

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    calculateWinner.mockImplementation(() => null);
    wrapper = shallow(<Board />);
  });

  afterEach(() => {
    calculateWinner.mockRestore();
  });

  it('shows expected status when next player is X', () => {
    expect(wrapper.find('.status').text()).toBe('Next player: X');
  });

  it('shows expected status when next player is O', () => {
    wrapper.setState({ xIsNext: false });

    expect(wrapper.find('.status').text()).toBe('Next player: O');
  });

  it('shows expected status when calculateWinner returns a player', () => {
    calculateWinner.mockImplementation(() => 'O');
    wrapper = shallow(<Board />);

    expect(wrapper.find('.status').text()).toBe('Winner: O');
  });

  it('renders Squares', () => {
    expect(wrapper.find(Square)).toHaveLength(9);
  });

  it('passes value to Squares', () => {
    expect(wrapper.find(Square).first().prop('value')).toBe(null);
  });

  it('starts with an X move', () => {
    expect(wrapper.state('xIsNext')).toBe(true);
  });

  it('passes onClick to Squares', () => {
    expect(wrapper.find(Square).first().prop('onClick')).not.toBeUndefined();
  });

  describe('handleClick', () => {
    it('sets the given index in state.squares to X if next player is X', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe('X');
    });

    it('sets the given index in state.squares to O if next player is O', () => {
      wrapper.setState({ xIsNext: false });

      expect(wrapper.state('xIsNext')).toBe(false);
      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe('O');
    });

    it('toggles which player moves next', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('xIsNext')).toBe(false);
    });

    it('does not update square if square already has a value', () => {
      const squares = [null, null, null, null, null, null, null, null, 'O'];
      wrapper.setState({ squares });

      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe('O');
    });

    it('does not update square if a player has won', () => {
      calculateWinner.mockImplementation(() => 'X');
      wrapper = shallow(<Board />);

      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe(null);
    });
  });
});
