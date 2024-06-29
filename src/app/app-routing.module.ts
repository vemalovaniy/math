import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixComponent } from './app/matrix/matrix.component';

export const routes: Routes = [
  {
    title: 'Matrix',
    path: 'matrix',
    component: MatrixComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
