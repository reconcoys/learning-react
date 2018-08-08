import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSquare(i) {
    const { squares, onClick } = this.props;
    return (
      <Square
        value={squares[i]}
        color="white"
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  squares: [],
  onClick: () => {},
};

export default Board;
