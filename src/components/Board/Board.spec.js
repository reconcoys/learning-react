import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import Square from '../Square/Square';

describe('Board', () => {
  it('passes square index to all Squares', () => {
    const wrapper = shallow(<Board />);

    const passedValues = wrapper.find(Square).map(square => square.prop('value'));
    expect(passedValues).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
