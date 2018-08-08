import calculateWinner from './GameHelper';

describe('calculateWinner', () => {
  it('returns expected indexes when top horizonital is completed', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([0, 1, 2]);
  });

  it('returns expected winner when middle horizonital is completed', () => {
    const squares = [null, null, null, 'X', 'X', 'X', null, null, null];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([3, 4, 5]);
  });

  it('returns expected winner when bottom horizonital is completed', () => {
    const squares = [null, null, null, null, null, null, 'X', 'X', 'X'];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([6, 7, 8]);
  });

  it('returns expected winner when left vertical is completed', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([0, 3, 6]);
  });

  it('returns expected winner when middle vertical is completed', () => {
    const squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([1, 4, 7]);
  });

  it('returns expected winner when right vertical is completed', () => {
    const squares = [null, null, 'O', null, null, 'O', null, null, 'O'];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([2, 5, 8]);
  });

  it('returns expected winner when top left to bottom right diagonal is completed', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([0, 4, 8]);
  });

  it('returns expected winner when bottom left to top right diagonal is completed', () => {
    const squares = [null, null, 'O', null, 'O', null, 'O', null, null];

    const winner = calculateWinner(squares);

    expect(winner).toEqual([2, 4, 6]);
  });
});
