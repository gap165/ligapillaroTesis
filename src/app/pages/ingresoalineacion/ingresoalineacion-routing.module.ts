import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoalineacionPage } from './ingresoalineacion.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoalineacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoalineacionPageRoutingModule {}
