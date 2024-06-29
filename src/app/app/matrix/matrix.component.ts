import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatrixUiComponent } from 'src/app/components';
import { Matrix } from 'src/core';
import { expectedMultiplyedMatrix, expectedMultiplyedMatrix2, multiplyMatrix, multiplyMatrix2, multiplyMatrix21, multiplyValue } from './data-set';


@Component({
  selector: 'math-matrix',
  standalone: true,
  imports: [
    CommonModule,
    MatrixUiComponent,
  ],
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent {
  public matrix1 = [
    [1, 3, 5],
    [2, 4, 6],
  ];

  public readonly matrix1expected = [
    [1, 2],
    [3, 4],
    [5, 6]
  ]

  public matrix1Result = new Matrix(this.matrix1).transpose().value;


  public matrix2 = [
    [1, 3, 5],
    [2, 4, 6],
    [2, 4, 6],
  ];

  public matrix21 = [
    [2, 4, 6],
    [1, 3, 5],
    [2, 4, 6],
  ];

  public matrix2expected = [
    [3, 7, 11],
    [3, 7, 11],
    [4, 8, 12],
  ]

  public multiplyByNumberData = {
    init: multiplyMatrix,
    expected: expectedMultiplyedMatrix,
    result: new Matrix(multiplyMatrix).multiply(multiplyValue).value,
  }

  public multiplyByMatrixData = {
    init: multiplyMatrix2,
    init2: multiplyMatrix21,
    expected: expectedMultiplyedMatrix2,
    result: new Matrix(multiplyMatrix21).multiply(multiplyMatrix2).value,
  }

  public matrix2Result = new Matrix(this.matrix21).addition(this.matrix2).value;

  constructor() {
  }
}
