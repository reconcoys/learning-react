import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

describe('Game', () => {
  it('exists', () => {
    const wrapper = shallow(<Game />);

    expect(wrapper).not.toBeUndefined();
  });
});
