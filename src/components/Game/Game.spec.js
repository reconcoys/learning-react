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
    expect(wrapper.state('history')[0].squares).toEqual(expectedSquares);
  });

  it('initializes next player to X', () => {
    expect(wrapper.state('xIsNext')).toBe(true);
  });

  it('initializes stepNumber to 0', () => {
    expect(wrapper.state('stepNumber')).toBe(0);
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

  it('shows link to go to game start when there is no history', () => {
    expect(wrapper.find('.move').text()).toBe('Go to game start');
  });

  it('shows link to go to move number when there is history', () => {
    const startingState = { squares: [null, null, null, null, null, null, null, null, null] };
    const firstMove = { squares: [null, null, null, null, null, null, null, null, 'X'] };
    const history = [startingState, firstMove];
    wrapper.setState({ history });
    wrapper.update();

    expect(wrapper.find('.move').last().text()).toBe('Go to move #1');
  });

  describe('when a move link is clicked', () => {
    beforeEach(() => {
      const startingState = { squares: [null, null, null, null, null, null, null, null, null] };
      const firstMove = { squares: [null, null, null, null, null, null, null, null, 'X'] };
      const secondMove = { squares: [null, null, null, null, null, null, null, 'O', 'X'] };
      const history = [startingState, firstMove, secondMove];
      wrapper.setState({ stepNumber: 2, xIsNext: true, history });
    });

    it('sets the stepNumber to that move number', () => {
      wrapper.find('.move').at(1).simulate('click');

      expect(wrapper.state('stepNumber')).toBe(1);
    });

    it('sets xIsNext to true if clicked move number is even', () => {
      wrapper.find('.move').at(0).simulate('click');

      expect(wrapper.state('xIsNext')).toBe(true);
    });

    it('sets xIsNext to false if clicked move number is odd', () => {
      wrapper.find('.move').at(1).simulate('click');

      expect(wrapper.state('xIsNext')).toBe(false);
    });
  });

  it('passes squares to Board', () => {
    const squares = ['X', null, 'X', null, 'O', null, 'X', null, 'O'];
    wrapper.setState({ history: [{ squares }] });

    expect(wrapper.find(Board).prop('squares')).toBe(squares);
  });

  it('passes onClick to Board', () => {
    expect(wrapper.find(Board).prop('onClick')).not.toBeUndefined();
  });

  describe('handleClick', () => {
    it('adds a new entry in history', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('history')).toHaveLength(2);
    });

    it('sets the given index in state.squares to X if next player is X', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('history')[1].squares[8]).toBe('X');
    });

    it('sets the given index in state.squares to O if next player is O', () => {
      wrapper.setState({ xIsNext: false });

      wrapper.instance().handleClick(8);
      expect(wrapper.state('history')[1].squares[8]).toBe('O');
    });

    it('toggles which player moves next', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('xIsNext')).toBe(false);
    });

    it('does not update square if square already has a value', () => {
      const squares = [null, null, null, null, null, null, null, null, 'O'];
      wrapper.setState({ history: [{ squares }] });

      wrapper.instance().handleClick(8);

      const currentSquares = wrapper.state('history')[0].squares;
      expect(currentSquares[8]).toBe('O');
    });

    it('does not update square if a player has won', () => {
      calculateWinner.mockImplementation(() => 'X');
      wrapper = shallow(<Game />);

      wrapper.instance().handleClick(8);

      const currentSquares = wrapper.state('history')[0].squares;
      expect(currentSquares[8]).toBe(null);
    });

    it('updates the step number', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('stepNumber')).toBe(1);
    });
  });
});
