import { Matrix } from "../maxrix";

const testMatrix2x2 = [
  [1, 2],
  [3, 4],
]

const testMatrix3x3 = [
  [3, 2, 1],
  [-3, 7, 2],
  [5, 4, 1]
];

const testMatrix4x4 = [
  [3, 2, 1, 2],
  [-3, 7, 2, 1],
  [5, 4, 1, 2],
  [1, 3, 2, 1],
];

fdescribe('Matrix', () => { // TODO: tests fail
  it('func should return minor', () => {
    const m = new Matrix(testMatrix2x2);
    const minor = m.getMinor(m.value, 0, 0);

    expect(minor).toEqual(-2);
  });

  it('func should return determinant', () => {
    const m = new Matrix(testMatrix3x3);
    const minor = m.getDeterminant(m.value);

    expect(minor).toEqual(-24);
  });

  it('func should return determinant', () => {
    const m = new Matrix(testMatrix4x4);
    const minor = m.getDeterminant(m.value);

    expect(minor).toEqual(48);
  });

  it('func should return minor', () => {
    const m = new Matrix(testMatrix2x2);
    m.inverse();

    const minor = m.value;

    console.log(minor);

    expect(minor).toBeTruthy();
  });
});
