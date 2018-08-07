import calculateWinner from './BoardHelper';

describe('calculateWinner', () => {
  it('returns expected winner when top horizonital is completed', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];

    const winner = calculateWinner(squares);

    expect(winner).toBe('X');
  });

  it('returns expected winner when middle horizonital is completed', () => {
    const squares = [null, null, null, 'X', 'X', 'X', null, null, null];

    const winner = calculateWinner(squares);

    expect(winner).toBe('X');
  });

  it('returns expected winner when bottom horizonital is completed', () => {
    const squares = [null, null, null, null, null, null, 'X', 'X', 'X'];

    const winner = calculateWinner(squares);

    expect(winner).toBe('X');
  });

  it('returns expected winner when left vertical is completed', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null];

    const winner = calculateWinner(squares);

    expect(winner).toBe('O');
  });

  it('returns expected winner when middle vertical is completed', () => {
    const squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    const winner = calculateWinner(squares);

    expect(winner).toBe('O');
  });

  it('returns expected winner when right vertical is completed', () => {
    const squares = [null, null, 'O', null, null, 'O', null, null, 'O'];

    const winner = calculateWinner(squares);

    expect(winner).toBe('O');
  });

  it('returns expected winner when top left to bottom right diagonal is completed', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    const winner = calculateWinner(squares);

    expect(winner).toBe('X');
  });

  it('returns expected winner when bottom left to top right diagonal is completed', () => {
    const squares = [null, null, 'O', null, 'O', null, 'O', null, null];

    const winner = calculateWinner(squares);

    expect(winner).toBe('O');
  });
});
