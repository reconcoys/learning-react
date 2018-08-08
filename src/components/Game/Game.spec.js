import React from 'react';
import { shallow } from 'enzyme';
import calculateWinner from './GameHelper';
import Game from './Game';
import Board from '../Board/Board';

jest.mock('./GameHelper');

const createEmptySquares = () => {
  const squares = [
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
    { value: null, color: 'white' },
  ];
  return squares;
};

describe('Game', () => {
  let wrapper;

  beforeEach(() => {
    calculateWinner.mockImplementation(() => null);
    wrapper = shallow(<Game />);
  });

  afterEach(() => {
    calculateWinner.mockReset();
  });

  it('initializes squares to nulls', () => {
    const expectedSquares = createEmptySquares();
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

  it('shows expected status when calculateWinner returns a line', () => {
    calculateWinner.mockImplementation(() => [0, 1, 2]);
    wrapper = shallow(<Game />);

    expect(wrapper.find('.status').text()).toBe('Winner: O');
  });

  it('calls calculateWinner with currentSquare values', () => {
    const squares = createEmptySquares();
    squares[8].value = 'O';
    wrapper.setState({ history: [{ squares }] });

    expect(calculateWinner).toBeCalledWith([null, null, null, null, null, null, null, null, 'O']);
  });

  it('shows link to go to game start when there is no history', () => {
    expect(wrapper.find('.move').text()).toBe('Go to game start');
  });

  it('shows link to go to move number when there is history', () => {
    const startingState = { squares: createEmptySquares() };
    const firstMove = { squares: createEmptySquares() };
    firstMove.squares[8].value = 'X';
    const history = [startingState, firstMove];
    wrapper.setState({ history });
    wrapper.update();

    expect(wrapper.find('.move').last().text()).toBe('Go to move #1');
  });

  describe('when a move link is clicked', () => {
    beforeEach(() => {
      const startingState = { squares: createEmptySquares() };
      const firstMove = { squares: createEmptySquares() };
      firstMove.squares[8].value = 'X';
      const secondMove = { squares: createEmptySquares() };
      secondMove.squares[8].value = 'X';
      secondMove.squares[7].value = 'O';
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
    const squares = createEmptySquares();
    squares[5].value = 'X';
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

    it('sets the given index value in state.squares to X if next player is X', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('history')[1].squares[8].value).toBe('X');
    });

    it('sets the given index value in state.squares to O if next player is O', () => {
      wrapper.setState({ xIsNext: false });

      wrapper.instance().handleClick(8);
      expect(wrapper.state('history')[1].squares[8].value).toBe('O');
    });

    it('toggles which player moves next', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('xIsNext')).toBe(false);
    });

    it('does not update square if square already has a value', () => {
      const squares = createEmptySquares();
      squares[8].value = 'O';
      wrapper.setState({ history: [{ squares }] });

      wrapper.instance().handleClick(8);

      const currentSquares = wrapper.state('history')[0].squares;
      expect(currentSquares[8].value).toBe('O');
    });

    it('does not update square if a player has won', () => {
      calculateWinner.mockImplementation(() => [0, 1, 2]);
      wrapper = shallow(<Game />);

      wrapper.instance().handleClick(8);

      const currentSquares = wrapper.state('history')[0].squares;
      expect(currentSquares[8].value).toBe(null);
    });

    it('sets the winning line to green if move won', () => {
      calculateWinner
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => [0, 1, 2]);
      wrapper = shallow(<Game />);

      wrapper.instance().handleClick(8);

      const currentSquares = wrapper.state('history')[1].squares;
      expect(currentSquares[0].color).toBe('green');
      expect(currentSquares[1].color).toBe('green');
      expect(currentSquares[2].color).toBe('green');
    });

    it('calls calculateWinner with currentSquare values', () => {
      const squares = createEmptySquares();
      squares[8].value = 'O';
      wrapper.setState({ history: [{ squares }] });

      wrapper.instance().handleClick(8);

      expect(calculateWinner).toBeCalledWith([null, null, null, null, null, null, null, null, 'O']);
    });

    it('updates the step number', () => {
      wrapper.instance().handleClick(8);

      expect(wrapper.state('stepNumber')).toBe(1);
    });

    it('should remove future moves if a past move is replayed', () => {
      const startingState = { squares: createEmptySquares() };
      const firstMove = { squares: createEmptySquares() };
      firstMove.squares[8].value = 'X';
      const secondMove = { squares: createEmptySquares() };
      secondMove.squares[8].value = 'X';
      secondMove.squares[7].value = 'O';
      const history = [startingState, firstMove, secondMove];
      wrapper.setState({ stepNumber: 0, xIsNext: true, history });

      wrapper.instance().handleClick(2);

      expect(wrapper.state('history')).toHaveLength(2);
    });
  });
});
