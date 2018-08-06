import React from 'react';
import PropTypes from 'prop-types';

const Square = ({ value, onClick }) => (
  <button
    type="button"
    className="square"
    onClick={onClick}
  >
    { value }
  </button>
);

Square.defaultProps = {
  value: null,
};

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Square;
