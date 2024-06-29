import { retry } from 'rxjs';
import { IMatrix } from './matrix.interface';

// i - row, j - column
// m - row length, n - column length
export class Matrix {
  value: number[][] = [];

  constructor(v: IMatrix) {
    this.value = v;
  }

  getSize() {
    return [this.value.length, this.value[0]?.length || 0];
  }

  getItem(i: number, j: number) {
    return this.value[i][j];
  }

  transpose() {
    this.value = Matrix.transpose(this.value);

    return this;
  }

  set(value: number, i: number, j: number) {
    this.value[i][j] = value;
  }

  get(i: number, j: number) {
    return this.value[i][j];
  }

  forEach(data: IMatrix, f: (data: IMatrix, r: number, c: number) => number): IMatrix {
    for (let row = 0; row < data.length; row++) {
      for (let column = 0; column < data[row].length; column++) {
        data[row][column] = f(data, row, column);
      }
    }

    return data;
  }

  addition(data: IMatrix, index: number = 1) {
    const a = this;
    const b = new Matrix(data);
    const maxLength = Math.max(...a.getSize(), ...b.getSize())
    const zm = Matrix.createZeroMatrix(maxLength, maxLength);

    const res = this.forEach(zm, (d, r, c) => {
      const v1 = a.get(r, c);
      const v2 = b.get(r, c);

      return v1 + (v2 * index);
    });

    return new Matrix(res);
  }

  subtraction(data: IMatrix,) {
    return this.addition(data, -1);
  }

  multiply(data: number | IMatrix) {
    if (typeof data == 'number') {
      this.value = this.forEach(this.value, (d, r, c) => {
        return d[r][c] = d[r][c] * data;
      });
    } else {
      const [m, n] = this.getSize();
      const o = Matrix.createZeroMatrix(m, n);

      this.value = this.forEach(o, (d, r, c) => {
        const row = this.value[r];

        return row.reduce((prev, curr, i) => {
          const b = data[i][c];
          const res = prev + (curr * b);

          return res;
        }, 0);
      })
    }

    return this;
  }

  getDeterminant(data: IMatrix) {
    return Matrix.getDeterminant(data);
  }

  getMinor(data: IMatrix, i: number, j: number) {
    return Matrix.getMinor(data, i, j);
  }

  inverse() {
    this.value = Matrix.inverse(this.value);

    return this;
  }

  static getMinor(data: IMatrix, i: number, j: number): number {
    if (data.length === 2) {
      return this.getMinor2x2(data);
    }

    const res = data
      .filter((row, index) => index !== i)
      .map((row) => row.filter((i, index) => index !== j));

    return this.getDeterminant(res);
  }

  static getMinor2x2(data: IMatrix) {
    return data[0][0] * data[1][1] - data[0][1] * data[1][0];
  }

  static getDeterminant(data: IMatrix): number {
    if (data.length === 2) {
      return this.getMinor2x2(data);
    }

    const line = 0;
    const row = data[line];
    const res = row.reduce((prev, curr, j) => {
      const a = row[j];
      const m = this.getMinor(data, line, j);
      const pow = Math.pow(-1, (line + 1) + j + 1);

      return prev + pow * a * m;
    }, 0);

    return res;
  }

  static createZeroMatrix(m: number, n: number) {
    const res: IMatrix = [];

    for (let i = 0; i < m; i++) {
      res.push([]);
      for (let j = 0; j < n; j++) {
        res[i][j] = 0;
      }

    }

    return res;
  }

  static inverse(data: IMatrix) {
    const m = new Matrix(data);
    const det = m.getDeterminant(m.value);
    const index = 1 / det;

    console.log(det);
    m.transpose();

    const [i, j] = m.getSize();
    const zeroMatrix = new Matrix(Matrix.createZeroMatrix(i, j));

    zeroMatrix.forEach(zeroMatrix.value, (d, i, j) => {
      const pow = Math.pow(-1, (i + 1 + j + 1));
      const aa = Matrix.getMinor(data, i, j);

      return pow *aa;
    })

    return new Matrix(zeroMatrix.value).multiply(index).value;
  }

  static transpose(v: IMatrix): IMatrix {
    const maxLength = Math.max(v.length, v[0].length);
    const res: IMatrix = Matrix.createZeroMatrix(maxLength, maxLength);

    for (let i = 0; i < v.length; i++) {
      const row = v[i];

      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        res[j][i] = element;
      }
    }

    return res;
  }
}
