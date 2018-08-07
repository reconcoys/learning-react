import React from 'react';
import Square from '../Square/Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const { squares, xIsNext } = this.state;
    const updatedSquares = squares.slice();
    updatedSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: updatedSquares,
      xIsNext: !xIsNext,
    });
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
    const status = 'Next player: X';

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
