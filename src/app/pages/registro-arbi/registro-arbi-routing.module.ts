import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroArbiPage } from './registro-arbi.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroArbiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroArbiPageRoutingModule {}
