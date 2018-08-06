import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    const { value } = this.state;

    return (
      <button
        type="button"
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        { value }
      </button>
    );
  }
}
