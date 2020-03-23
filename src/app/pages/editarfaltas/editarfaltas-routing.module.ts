import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarfaltasPage } from './editarfaltas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarfaltasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarfaltasPageRoutingModule {}
