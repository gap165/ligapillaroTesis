import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebacalePage } from './pruebacale.page';

const routes: Routes = [
  {
    path: '',
    component: PruebacalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebacalePageRoutingModule {}
