import React from 'react';
import Board from '../Board/Board';
import calculateWinner from './GameHelper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
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
          >
            {desc}
          </button>
        </li>
      );
    });
    return moves;
  }

  handleClick(i) {
    const { history, xIsNext } = this.state;
    const currentSquares = this.getCurrentSquares();
    const winner = calculateWinner(currentSquares);
    if (currentSquares[i] == null && !winner) {
      const updatedSquares = currentSquares.slice();
      updatedSquares[i] = this.getNextPlayer();
      this.setState({
        history: history.concat([{
          squares: updatedSquares,
        }]),
        xIsNext: !xIsNext,
        stepNumber: history.length
      });
    }
  }

  calculateStatus() {
    const currentSquares = this.getCurrentSquares();
    const winner = calculateWinner(currentSquares);

    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.getNextPlayer()}`;
    }
    return status;
  }

  render() {
    const currentSquares = this.getCurrentSquares();
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
