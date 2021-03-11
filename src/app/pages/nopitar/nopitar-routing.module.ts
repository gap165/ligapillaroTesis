import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NopitarPage } from './nopitar.page';

const routes: Routes = [
  {
    path: '',
    component: NopitarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NopitarPageRoutingModule {}
