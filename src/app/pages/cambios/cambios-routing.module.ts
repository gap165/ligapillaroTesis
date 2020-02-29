import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiosPage } from './cambios.page';

const routes: Routes = [
  {
    path: '',
    component: CambiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiosPageRoutingModule {}
