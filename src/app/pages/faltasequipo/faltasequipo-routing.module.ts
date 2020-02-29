import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaltasequipoPage } from './faltasequipo.page';

const routes: Routes = [
  {
    path: '',
    component: FaltasequipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaltasequipoPageRoutingModule {}
