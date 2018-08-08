import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ value, onClick, color }) => (
  <button
    type="button"
    className="square"
    style={{ background: color }}
    onClick={onClick}
  >
    { value }
  </button>
);

Square.defaultProps = {
  value: null,
  color: 'white',
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default Square;
