import React from 'react';
import { shallow } from 'enzyme';
import calculateWinner from './GameHelper';
import Game from './Game';
import Board from '../Board/Board';

jest.mock('./GameHelper');

describe('Game', () => {
  let wrapper;

  beforeEach(() => {
    calculateWinner.mockImplementation(() => null);
    wrapper = shallow(<Game />);
  });

  afterEach(() => {
    calculateWinner.mockRestore();
  });

  it('initializes squares to nulls', () => {
    const expectedSquares = [null, null, null, null, null, null, null, null, null];
    expect(wrapper.state('squares')).toEqual(expectedSquares);
  });

  it('initializes next player to X', () => {
    expect(wrapper.state('xIsNext')).toBe(true);
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
    wrapper = shallow(<Game />);

    expect(wrapper.find('.status').text()).toBe('Winner: O');
  });

  it('passes squares to Board', () => {
    const squares = ['X', null, 'X', null, 'O', null, 'X', null, 'O'];
    wrapper.setState({ squares });

    expect(wrapper.find(Board).prop('squares')).toBe(squares);
  });

  it('passes onClick to Board', () => {
    expect(wrapper.find(Board).prop('onClick')).not.toBeUndefined();
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
      wrapper = shallow(<Game />);

      wrapper.instance().handleClick(8);

      expect(wrapper.state('squares')[8]).toBe(null);
    });
  });
});
