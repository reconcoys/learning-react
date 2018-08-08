import React from 'react';
import Board from '../Board/Board';
import calculateWinner from './GameHelper';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  getNextPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    const { squares, xIsNext } = this.state;
    const winner = calculateWinner(squares);
    if (squares[i] == null && !winner) {
      const updatedSquares = squares.slice();
      updatedSquares[i] = this.getNextPlayer();
      this.setState({
        squares: updatedSquares,
        xIsNext: !xIsNext,
      });
    }
  }

  calculateStatus() {
    const { squares } = this.state;
    const winner = calculateWinner(squares);

    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.getNextPlayer()}`;
    }
    return status;
  }

  render() {
    const { squares } = this.state;
    const status = this.calculateStatus();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
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
