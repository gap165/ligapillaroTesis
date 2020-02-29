import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarnetsPage } from './carnets.page';

const routes: Routes = [
  {
    path: '',
    component: CarnetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarnetsPageRoutingModule {}
