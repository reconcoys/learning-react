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
    };
  }

  getNextPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  getCurrentSquares() {
    const { history } = this.state;
    const currentSquares = history[history.length - 1].squares;
    return currentSquares;
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
            {/* TODO */}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
