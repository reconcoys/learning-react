import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import Square from '../Square/Square';

describe('Board', () => {

  it('renders Squares', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Square)).toHaveLength(9);
  });

  it('passes onClick to Squares', () => {
    const wrapper = shallow(<Board />);

    expect(wrapper.find(Square).first().prop('onClick')).not.toBeUndefined();
  });

  it('passes value to Squares', () => {
    const squares = [{ value: 'X' }, {}, {}, {}, {}, {}, {}, {}, {}];
    const wrapper = shallow(<Board squares={squares} />);

    expect(wrapper.find(Square).first().prop('value')).toBe('X');
  });

  it('passes color to Squares', () => {
    const squares = [{ color: 'green' }, {}, {}, {}, {}, {}, {}, {}, {}];
    const wrapper = shallow(<Board squares={squares} />);

    expect(wrapper.find(Square).first().prop('color')).toBe('green');
  });
});
