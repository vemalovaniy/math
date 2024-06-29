import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMatrix } from 'src/core';

@Component({
  selector: 'math-matrix-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matrix-ui.component.html',
  styleUrls: ['./matrix-ui.component.scss'],
})
export class MatrixUiComponent {
  @Input()
  matrix!: IMatrix;
  @Input()
  title: string = '';
}
