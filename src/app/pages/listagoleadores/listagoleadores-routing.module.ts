import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagoleadoresPage } from './listagoleadores.page';

const routes: Routes = [
  {
    path: '',
    component: ListagoleadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagoleadoresPageRoutingModule {}
