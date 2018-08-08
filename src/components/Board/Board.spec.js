import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import Square from '../Square/Square';

describe('Board', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Board />);
  });

  it('renders Squares', () => {
    expect(wrapper.find(Square)).toHaveLength(9);
  });

  it('passes value to Squares', () => {
    expect(wrapper.find(Square).first().prop('value')).toBe(null);
  });

  it('passes onClick to Squares', () => {
    expect(wrapper.find(Square).first().prop('onClick')).not.toBeUndefined();
  });
});
