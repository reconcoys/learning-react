import React from 'react';
import Board from '../Board/Board';
import calculateWinner from '../Board/BoardHelper';

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

  render() {
    const { squares } = this.state;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            {/* status */}
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
