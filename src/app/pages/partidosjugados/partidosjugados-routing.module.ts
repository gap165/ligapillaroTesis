import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidosjugadosPage } from './partidosjugados.page';

const routes: Routes = [
  {
    path: '',
    component: PartidosjugadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidosjugadosPageRoutingModule {}
