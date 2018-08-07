import React from 'react';
import Square from '../Square/Square';
import calculateWinner from './BoardHelper';

class Board extends React.Component {
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

  renderSquare(i) {
    const { squares } = this.state;
    return (
      <Square
        value={squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const { squares } = this.state;
    const winner = calculateWinner(squares);
    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.getNextPlayer()}`;
    }

    return (
      <div>
        <div className="status">
          {status}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
