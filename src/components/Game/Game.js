import React from 'react';
import _ from 'lodash';
import Board from '../Board/Board';
import calculateWinner from './GameHelper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array.apply(null, Array(9)).map(() => ({ value: null, color: 'white' })),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  static getSquareValues(squares) {
    return squares.map(square => square.value);
  }

  getNextPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  getCurrentSquares() {
    const { history, stepNumber } = this.state;
    const currentSquares = history[stepNumber].squares;
    return currentSquares;
  }

  getMoves() {
    const { history } = this.state;
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button
            type="button"
            className="move"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    return moves;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const { history, xIsNext, stepNumber } = this.state;
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = newHistory[newHistory.length - 1].squares.slice();
    const currentValues = Game.getSquareValues(currentSquares);
    const winnerFound = calculateWinner(currentValues);

    if (currentSquares[i].value == null && !winnerFound) {
      const newSquares = _.map(currentSquares, _.clone);
      newSquares[i].value = this.getNextPlayer();

      const newValues = Game.getSquareValues(newSquares);
      const winningLine = calculateWinner(newValues);
      if (winningLine) {
        _.each(winningLine, (winningIndex) => { newSquares[winningIndex].color = 'green'; });
      }

      this.setState({
        history: newHistory.concat([{
          squares: newSquares,
        }]),
        xIsNext: !xIsNext,
        stepNumber: newHistory.length,
      });
    }
  }

  calculateStatus() {
    const { history, stepNumber, xIsNext } = this.state;
    const currentSquares = history[stepNumber].squares;
    const currentValues = Game.getSquareValues(currentSquares);
    const winningLine = calculateWinner(currentValues);

    let status;

    if (winningLine) {
      const winner = xIsNext ? 'O' : 'X';
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.getNextPlayer()}`;
    }
    return status;
  }

  render() {
    const { history, stepNumber } = this.state;
    const currentSquares = history[stepNumber].squares;
    const status = this.calculateStatus();
    const moves = this.getMoves();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">
            {status}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
