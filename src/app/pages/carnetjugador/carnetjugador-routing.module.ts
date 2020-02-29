import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarnetjugadorPage } from './carnetjugador.page';

const routes: Routes = [
  {
    path: '',
    component: CarnetjugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarnetjugadorPageRoutingModule {}
