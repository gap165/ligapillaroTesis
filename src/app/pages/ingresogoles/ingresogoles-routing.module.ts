import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresogolesPage } from './ingresogoles.page';

const routes: Routes = [
  {
    path: '',
    component: IngresogolesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresogolesPageRoutingModule {}
