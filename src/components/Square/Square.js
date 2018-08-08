import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SquareButton = styled.button`
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;

  &:focus {
    outline: none;
  }
`;

const Square = ({ value, onClick, color }) => (
  <SquareButton
    type="button"
    className="square"
    style={{ background: color }}
    onClick={onClick}
  >
    { value }
  </SquareButton>
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
